import React, { useMemo } from "react";
import { useContext } from "react";
import { OrdersContenxt } from "../../../contexts/OrdersProvider";
import { AuthContext } from "../../../contexts/AuthsProvider";
import { useParams } from "react-router-dom";
import { MoviesContext } from "../../../contexts/MovieProvider";
import { TypeChairsContext } from "../../../contexts/TypeChairProvider";
import { CinemaLocationsContext } from "../../../contexts/CinemaLocationProvider";
import { MovieScreeningContext } from "../../../contexts/MovieScreeningProvider";
import { RoomsContext } from "../../../contexts/RoomProvider";
import { FoodsContext } from "../../../contexts/FoodProvider";
import { ItemFoodsContext } from "../../../contexts/ItemFoodsProvider";
import { getOjectById } from "../../../utils/functionContants";
import { orderDetailsContext } from "../../../contexts/OrderDetailsProvider";


function ViewBooking() {
    const { id } = useParams();
    const orders = useContext(OrdersContenxt);
    const { isLogin } = useContext(AuthContext);
    const movies = useContext(MoviesContext);
    const typeChairs = useContext(TypeChairsContext);
    const cinemaLocations = useContext(CinemaLocationsContext);
    const movieScreens = useContext(MovieScreeningContext);
    const rooms = useContext(RoomsContext);
    const foods = useContext(FoodsContext);
    const itemFoods = useContext(ItemFoodsContext);
    const orderDetails = useContext(orderDetailsContext);
    const foodOrder = orderDetails.filter(it => it.id_order === id)
    const orderView = useMemo(() => {
        if (!id) return null;
        return orders.find(o => o.id === id)
    }, [id, orders])
    const movieScreening = movieScreens?.find(ms => ms.id === orderView?.idMovieScreening);
    const movie = movies.find(m => m.id === movieScreening?.idMovie);
    const cinemaShow = cinemaLocations.find(cl => cl.id === movieScreening?.idCinemaLocation);
    const showRoom = rooms.find(r => r.id === movieScreening?.idRoom);
    
    const selectFoods = useMemo(() => {
        return orderDetails.filter(e => e.id_order === id)
    },[orderDetails, id])
    
    const totalFoodOrder = useMemo(() => {
        if (!foodOrder.length) return 0;
        return foodOrder.reduce((total, item) => {
            const food = getOjectById(foods, item.idFood)
            const price = food?.price;
            return total + price * item.quantity
        }, 0)
    }, [foodOrder, foods])

    const totalChair = useMemo(() => {
        if (!movieScreening || !orderView.listchair) return 0;

        return orderView.listchair.reduce((sum, seat) => {
            const typeChair = typeChairs.find(
                t => t.id === seat.idChair
            );

            const price = typeChair?.price || 0;
            const ratio = movieScreening.ratio || 1;

            return sum + price * ratio;
        }, 0);
    }, [orderView, typeChairs, movieScreening]);



    return (
        <div className="mt-16 min-h-screen bg-[#0d0d0d] py-10 px-4">
            <div className="max-w-6xl mx-auto bg-[#1a1a1a] shadow-2xl rounded-xl p-6 text-gray-300">

                {/* HEADER */}
                <h2 className="text-center font-semibold text-2xl mb-8 bg-gradient-to-r from-sky-400 to-purple-400 bg-clip-text text-transparent">
                    Thông tin vé đã đặt
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* LEFT */}
                    <div className="md:col-span-2 space-y-6">

                        {/* MOVIE INFO */}
                        <div className="flex gap-5">
                            <div className="w-24 h-36 bg-gray-700 rounded flex items-center justify-center text-sm text-gray-400">
                                <img src={movie?.imgUrl} alt={movie?.name} className="rounded" />
                            </div>

                            <div className="space-y-1">
                                <h3 className="font-semibold text-lg text-white">
                                    Phim: {movie?.name}
                                </h3>
                                <p className="text-sm text-gray-400">
                                    Rạp: {cinemaShow?.name}
                                </p>
                                <p className="text-sm text-gray-400">
                                    Phòng: {showRoom?.name}
                                </p>
                                <p className="text-sm text-gray-400">
                                    Suất chiếu: {orderView?.timeMovieScreen}
                                </p>
                            </div>
                        </div>

                        {/* BUYER INFO */}
                        <section className="rounded overflow-hidden border border-gray-700">
                            <h4 className="bg-gray-700 text-white px-4 py-2 font-medium">
                                THÔNG TIN NGƯỜI MUA
                            </h4>
                            <div className="p-4 space-y-1 text-sm">
                                <p><strong>Họ tên:</strong> {isLogin?.name}</p>
                                <p><strong>Email: </strong>{isLogin?.email}</p>
                            </div>
                        </section>

                        {/* TICKET INFO */}
                        <section className="rounded overflow-hidden border border-gray-700">
                            <h4 className="bg-gray-700 text-white px-4 py-2 font-medium">
                                THÔNG TIN VÉ
                            </h4>
                            <div className="p-4 flex justify-between items-center text-sm">
                                <div className="flex gap-2 flex-wrap">
                                    {orderView?.listchair.map(seat => (
                                        <span
                                            key={seat.seatCode}
                                            className="border border-red-500 text-red-500 px-2 py-1 rounded text-xs"
                                        >
                                            {seat.seatCode}
                                        </span>
                                    ))}
                                </div>
                                <span className="font-semibold text-white">
                                    {totalChair.toLocaleString()}đ
                                </span>
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

                    {/* RIGHT - PAYMENT */}
                    <div className="border border-gray-700 rounded-xl p-4 h-fit bg-[#141414]">
                        <h4 className="bg-gray-700 text-white px-4 py-2 font-medium mb-4 rounded">
                            THÔNG TIN ĐÃ THANH TOÁN
                        </h4>

                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span>Vé</span>
                                <span>{totalChair.toLocaleString()}đ</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Combo</span>
                                <span>{totalFoodOrder.toLocaleString()}đ</span>
                            </div>

                            <hr className="border-gray-700" />

                            <div className="flex justify-between font-semibold text-lg text-white">
                                <span>TỔNG</span>

                                <span className="text-red-500">{orderView?.total.toLocaleString()}d</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default ViewBooking;
