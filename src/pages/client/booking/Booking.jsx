import React, { useContext, useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MoviesContext } from '../../../contexts/MovieProvider';
import { RoomsContext } from '../../../contexts/RoomProvider';
import { MovieScreeningContext } from '../../../contexts/MovieScreeningProvider';
import { AuthContext } from '../../../contexts/AuthsProvider';
import { addDocument, updateDocument } from '../../../services/firebaseService';
import ShowRoomBooking from './ShowRoomBooking';
import { getOjectById } from '../../../utils/functionContants';
import screen from "../../../assets/screen.png";
import standard from "../../../assets/seatStandard.png"
import couple from "../../../assets/seatSW.png"
import vip from "../../../assets/seatVip.png"
import selected from "../../../assets/seatSelected.png";
import seat from "../../../assets/seat.png"
import { BookingContext } from '../../../contexts/BookingProvider';
import { TypeChairsContext } from '../../../contexts/TypeChairProvider';
import { CinemaLocationsContext } from '../../../contexts/CinemaLocationProvider';
import { OrdersContenxt } from '../../../contexts/OrdersProvider';

function Booking() {
    const { id, showtime } = useParams();
    const { isLogin } = useContext(AuthContext);
    const movies = useContext(MoviesContext);
    const rooms = useContext(RoomsContext);
    const typeChairs = useContext(TypeChairsContext);
    const orders = useContext(OrdersContenxt);
    // bookings
    const bookings = useContext(BookingContext);
    const movieScreens = useContext(MovieScreeningContext);
    const cinemaLocations = useContext(CinemaLocationsContext)
    const showRoom = useMemo(() => getOjectById(movieScreens, id), [id, movieScreens]);
    const dataRoom = useMemo(() => getOjectById(rooms, showRoom.idRoom), [id, rooms]);
    const movieShow = useMemo(() => getOjectById(movies, showRoom.idMovie), [showRoom, id]);
    const cinemaShow = useMemo(() => getOjectById(cinemaLocations, showRoom.idCinemaLocation), [showRoom, id])

    const handleBooking = async (value) => {
        if (!isLogin) {
            alert("vui long dang nhap");
            return;
        }
        // xem da tung booking xuat chieu nay chua 
        const oldBooking = bookings.find(e => e.idMovieScreening == id && e.idAccount == isLogin.id && e.time == showtime);
        if (oldBooking) {
            const check = oldBooking.listChair.findIndex(c => c.row == value.row && c.col == value.col && c.idChair == value.idChair);
            if (check != -1) {
                oldBooking.listChair = oldBooking.listChair.filter((_, index) => index != check);
                await updateDocument("bookings", oldBooking);
            } else {
                oldBooking.listChair.push(value);
                await updateDocument("bookings", oldBooking);
            }
        } else {
            const newBooking = { idMovieScreening: id, idAccount: isLogin?.id, time: showtime, listChair: [value] };
            console.log(newBooking);

            await addDocument("bookings", newBooking);
        }

    }

    const showImgUrl = (value) => {
        const checkOrder = orders.some(e => e.idMovieScreening == id && e.timeMovieScreen == showtime && e.listchair.some(c => c.row == value.row && c.col == value.col && c.idChair == value.idChair))
        const check = bookings.some(e => e.idMovieScreening == id && e.idAccount == isLogin?.id && e.time == showtime
            && e.listChair.some(c => c.row == value.row && c.col == value.col && c.idChair == value.idChair));
        return checkOrder ? seat : check ? selected : getOjectById(typeChairs, value.idChair)?.imgUrl;
    }

    const selectBooking = useMemo(() => {
        return bookings.find(b =>
            b.idMovieScreening == id &&
            b.idAccount == isLogin?.id &&
            b.time == showtime
        );
    }, [bookings, id, isLogin, showtime]);


    const handleClearBooking = async () => {
        if (!selectBooking) return;

        await updateDocument("bookings", {
            ...selectBooking,
            listChair: []
        });
    };

    const totalPrice = useMemo(() => {
        if (!selectBooking) return 0;

        return selectBooking.listChair.reduce((total, chair) => {
            const typeChair = getOjectById(typeChairs, chair.idChair);
            return total + Number(typeChair?.price || 0);
        }, 0);
    }, [selectBooking, typeChairs]);




    return (
        <div className="min-h-screen bg-[#0d0d0d] text-white p-6 md:p-10 flex flex-col lg:flex-row gap-10">

            {/* Left Panel: Room + Screen */}
            <div className="mt-16 flex-1 space-y-8">
                <div className="bg-[#1a1a1a] rounded-2xl p-6 shadow-xl border border-white/5 flex flex-col items-center">
                    <div className="text-gray-300 mb-4 text-3xl font-bold">Màn hình</div>
                    <img src={screen} alt="screen" className="mb-6 w-full max-w-xl" />
                    <ShowRoomBooking data={dataRoom} handleBooking={handleBooking} showImgUrl={showImgUrl} />
                </div>

                {/* Seat Legend */}
                <div className="flex flex-wrap gap-4 justify-center mt-4 text-sm">
                    <div className="flex items-center gap-2">
                        <img src={standard} alt="Ghế thường" className="w-5 h-5" />
                        <span>Ghế thường</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <img src={couple} alt="Ghế thường" className="w-5 h-5" />
                        <span>Ghế đôi</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <img src={vip} alt="Ghế thường" className="w-5 h-5" />
                        <span>Ghế Vip</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <img src={seat} alt="Ghế thường" className="w-5 h-5" />
                        <span>Ghế đã bán</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <img src={selected} alt="Ghế thường" className="w-5 h-5" />
                        <span>Ghế đang chọn</span>
                    </div>
                </div>
            </div>

            {/* Right Panel: Movie Info */}
            <div className="mt-16 w-full lg:w-[350px] bg-[#1a1a1a] rounded-2xl p-6 shadow-xl border border-white/10 space-y-6 flex-shrink-0">
                <img src={movieShow?.imgUrl} alt={movieShow?.name} className="w-full rounded-xl shadow-lg" />

                <div className="space-y-2">
                    <h2 className="text-2xl font-bold">Phim: {movieShow?.name}</h2>
                    <p>Giới hạn: {movieShow?.ageLimit} tuổi</p>
                </div>

                <div className="border-t border-white/10 pt-4 space-y-1">
                    <p><span className="font-semibold">{dataRoom?.name}</span></p>
                    <p>Rạp: <span className='font-semibold'>{cinemaShow?.name}</span></p>
                    <p>Suất: <span className="font-semibold">{showtime}</span> - {showRoom?.release_date}</p>
                    <p>Ghế: <span className="font-semibold">{selectBooking?.listChair.map(e => e.seatCode).toString()}</span></p>
                </div>

                <div className="border-t border-white/10 pt-4">
                    <div className="flex justify-between text-lg font-semibold">
                        <span>Tổng cộng</span>
                        <span className="text-orange-400">{totalPrice.toLocaleString()} đ</span>
                    </div>
                </div>

                <div className="flex justify-between pt-4 gap-2">
                    <button onClick={handleClearBooking} className="flex-1 px-4 py-3 rounded-xl bg-gray-700 hover:bg-gray-600 transition">Quay lại</button>
                    <Link to={`/order/${selectBooking?.id}/${cinemaShow?.id}`}>
                        <button className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 hover:scale-105 transition text-white font-semibold">Tiếp tục</button>
                    </Link>

                </div>
            </div>
        </div>
    );
}




export default Booking;