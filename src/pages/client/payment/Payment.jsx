import React, { useContext, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BookingContext } from '../../../contexts/BookingProvider';
import { MovieScreeningContext } from '../../../contexts/MovieScreeningProvider';
import { MoviesContext } from '../../../contexts/MovieProvider';
import { CinemaLocationsContext } from '../../../contexts/CinemaLocationProvider';
import { RoomsContext } from '../../../contexts/RoomProvider';
import { AuthContext } from '../../../contexts/AuthsProvider';
import { ItemFoodsContext } from '../../../contexts/ItemFoodsProvider';
import { getOjectById } from '../../../utils/functionContants';
import { TypeChairsContext } from '../../../contexts/TypeChairProvider';
import { FoodsContext } from '../../../contexts/FoodProvider';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { initialOptions, YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, YOUR_USER_ID } from '../../../utils/Contants';
import { addDocument, deleteDocument } from '../../../services/firebaseService';
import emailjs from 'emailjs-com';

function Payment(props) {

    const { id } = useParams();
    const { isLogin } = useContext(AuthContext);
    const bookings = useContext(BookingContext);
    const movies = useContext(MoviesContext);
    const typeChairs = useContext(TypeChairsContext);
    const cinemaLocations = useContext(CinemaLocationsContext);
    const movieScreens = useContext(MovieScreeningContext);
    const rooms = useContext(RoomsContext);
    const foods = useContext(FoodsContext);
    const navigate = useNavigate()
    const itemFoods = useContext(ItemFoodsContext);
    const booking = bookings.find(b => b.id === id);
    const selectFoods = itemFoods.filter(i => i.idBooking === id)
    const movieScreening = movieScreens?.find(ms => ms.id === booking?.idMovieScreening);
    const movie = movies.find(m => m.id === movieScreening?.idMovie);
    const cinemaShow = cinemaLocations.find(cl => cl.id === movieScreening?.idCinemaLocation);
    const showRoom = rooms.find(r => r.id === movieScreening?.idRoom);
    const totalChair = useMemo(() => {
        if (!booking || !movieScreening) return 0;

        return booking.listChair.reduce((total, chair) => {
            const typeChair = getOjectById(typeChairs, chair.idChair);
            const price = typeChair?.price || 0;
            const ratio = movieScreening?.ratio || 1;
            return total + price * ratio;
        }, 0);
    }, [booking, typeChairs, movieScreening]);
    console.log(isLogin);
    
    const totalFood = useMemo(() => {
        if (!selectFoods.length) return 0;
        return selectFoods.reduce((total, item) => {
            const food = getOjectById(foods, item.idFood);
            const price = food?.price;
            return total + price * item.quantity
        }, 0)
    }, [selectFoods, foods])

    const totalPrice = useMemo(() => {
        return totalChair + totalFood;
    }, [totalChair, totalFood]);

    const createSubscription = async (transactionId) => {
        const newOrder = {
            idMovieScreening: booking?.idMovieScreening,
            idAccount: booking?.idAccount,
            timeMovieScreen: booking?.time,
            listchair: booking?.listChair,
            total: totalPrice,
            totalChair: totalChair,
            totalFood: totalFood,
            timePayment: new Date(),
            method: "paypal",
            transactionId: transactionId,
        }

        const order = await addDocument("orders", newOrder);
        const newFoods = selectFoods.map(({ id, ...rest }) => ({
            ...rest,
            id_order: order.id,
        }));
        const newEmail = {
            nameCustomer: isLogin.name || "",
            movieName: movie?.name,
            timeMovieScreen: movieScreening?.release_date,
            address: cinemaShow?.address,
            seats: booking?.listChair.map(e => e.seatCode).join(","),
            toEmail: isLogin.email
        }
        emailjs.send(YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, newEmail, YOUR_USER_ID)
                .then((response) => {
                    console.log(`Email sent successfully to ${fav.userId}!`);
                }, (error) => {
                    console.error(`Failed to send email to ${fav.userId}:`, error);
                });
        await Promise.all(newFoods.map((item) => addDocument("OrderDetails", item)));
        await Promise.all(selectFoods.map((item) => deleteDocument("itemFoods", item)));
        navigate("/history")

    }


    return (
        <div className="mt-16 min-h-screen bg-[#0d0d0d] py-10">
            <div className="max-w-6xl mx-auto bg-[#1a1a1a] shadow-lg rounded-lg p-6">
                <h2 className='text-center font-semibold text-xl mb-6 text-white'>Hình Thức Thanh Toán</h2>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    {/* left */}
                    <div className='md:col-span-2 space-y-6'>
                        <div className="flex gap-4">
                            <img
                                src={movie?.imgUrl}
                                alt="movie"
                                className="rounded w-24"
                            />
                            <div>
                                <h3 className="font-semibold text-lg text-white">
                                    {movie?.name}
                                </h3>
                                <p className="text-sm text-gray-400">
                                    {cinemaShow?.name} - {cinemaShow?.address}
                                </p>
                                <p className="text-sm text-gray-400">
                                    Rạp: <span>{showRoom?.name}</span>
                                </p>
                                <p className="text-sm text-gray-400">
                                    Suất chiếu: <span> {movieScreening?.release_date} - {booking?.time}</span>
                                </p>
                            </div>
                        </div>
                        <section>
                            <h4 className="bg-gray-700 text-white px-3 py-2 font-medium">
                                THÔNG TIN NGƯỜI MUA
                            </h4>
                            <div className="p-4 space-y-1 text-sm">
                                <p><strong>Họ tên: </strong>{isLogin?.name}</p>
                                <p><strong>Email:</strong> {isLogin?.email}</p>
                            </div>
                        </section>

                        <section>
                            <h4 className='bg-gray-700 text-white px-3 py-2 font-medium'>THÔNG TIN VÉ</h4>
                            <div className="p-4 text-sm flex justify-between">
                                <div className='flex gap-3'>
                                    {booking?.listChair.map((seat, index) => (
                                        <span key={index} className="border  border-red-500 text-red-500 px-2 py-1 rounded">
                                            {seat?.seatCode}
                                        </span>
                                    ))}
                                </div>

                                <span>{totalChair.toLocaleString()}đ</span>
                            </div>
                        </section>
                        <section>

                            <h4 className="bg-gray-700 text-white px-3 py-2 font-medium">
                                THÔNG TIN BẮP NƯỚC
                            </h4>
                            {
                                selectFoods.map((food, index) => (
                                    <div key={index} className='p-4 text-sm flex justify-between'>
                                        <span>{getOjectById(foods, food.idFood)?.name}</span>
                                        <span>{food?.quantity} - {(getOjectById(foods, food.idFood)?.price * food?.quantity).toLocaleString()}đ</span>
                                    </div>
                                ))
                            }

                        </section>
                    </div>
                    {/* RIGHT */}
                    <div className='border border-gray-700 rounded-lg p-4 h-fit bg-[#141414]'>
                        <h4 className="bg-gray-700 text-white px-3 py-2 font-medium mb-4">
                            THÔNG TIN THANH TOÁN
                        </h4>
                        <div className='space-y-2 text-sm '>
                            <div className='flex justify-between'>
                                <span>Vé</span>
                                <span>{totalChair.toLocaleString()}đ</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Combo</span>
                                <span>{totalFood.toLocaleString()} đ</span>
                            </div>
                            <hr className="border-gray-700" />
                            <div className="flex justify-between font-semibold text-white">
                                <span>TỔNG</span>
                                <span className="text-red-500">{totalPrice.toLocaleString()} đ</span>
                            </div>

                            <PayPalScriptProvider options={initialOptions}>
                                <PayPalButtons
                                    style={{ layout: "vertical" }}
                                    createOrder={(data, actions) => {
                                        const totalPayPal = totalPrice / 25000
                                        return actions.order.create({
                                            purchase_units: [{
                                                amount: {
                                                    value: totalPayPal.toFixed(2)
                                                }
                                            }]
                                        });
                                    }}
                                    onApprove={(data, actions) => {
                                        return actions.order.capture().then((details) => {
                                            const transactionId = details.id; // Lấy ID giao dịch từ PayPal
                                            createSubscription(transactionId);
                                        });
                                    }}
                                    onError={(err) => {
                                        console.error("PayPal error:", err);
                                    }}
                                />
                            </PayPalScriptProvider>



                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Payment;