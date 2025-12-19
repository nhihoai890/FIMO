import React, { useEffect, useState, useContext, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MoviesContext } from '../../../contexts/MovieProvider';
import { getNext7Days, getOjectById, getShowDatesOfMovieWithin7Days } from '../../../utils/functionContants';
import { CategoriesContext } from '../../../contexts/CategoryProvider';
import { ActorsContext } from '../../../contexts/ActorProvider';
import { MovieScreeningContext } from '../../../contexts/MovieScreeningProvider';
import { TiMinus } from "react-icons/ti";
import { FaPlus } from "react-icons/fa";
import { CitiesContext } from '../../../contexts/CitiesProvider';
import { CinemaLocationsContext } from '../../../contexts/CinemaLocationProvider';
import { BookingContext } from '../../../contexts/BookingProvider';

function Details() {
    const { id } = useParams();
    const navigate = useNavigate();
    const movieScreen = useContext(MovieScreeningContext);
    const cities = useContext(CitiesContext);
    const {booking, setBooking} = useContext(BookingContext);
    const cinemaLocations = useContext(CinemaLocationsContext)
    const [movieShow, setMovieShow] = useState([]);
    const movies = useContext(MoviesContext);
    const [showDate, setShowDate] = useState([]);
    const [today, setToDay] = useState(new Intl.DateTimeFormat('sv-SE').format(new Date()));
    const categories = useContext(CategoriesContext);
    const actors = useContext(ActorsContext);
    const [open, setOpen] = useState(null);
    useEffect(() => {
        setMovieShow(getOjectById(movies, id))
    }, [movies, id]);

    useEffect(() => {
        setShowDate(getShowDatesOfMovieWithin7Days(id, movieScreen));
    }, [id, movieScreen]);

    const handleSelectDate = (date) => {
        setToDay(date);
    }

   
    const handleSelectTime = (sm,showtime) => {
        navigate(`/booking/${sm.id}/${showtime}`);
    }
    const showScreen = useMemo(() => {
        return movieScreen.filter(e => e.release_date == today && id == e.idMovie)
    }, [id, movieScreen, today])

    const isPastShowTime = (dateString, timeString) => {
        const now = new Date();
        const fullDateTime = new Date(`${dateString}T${timeString}:00`)
        return fullDateTime < now;
    }
    const showtimes = useMemo(() => {
        return showScreen.map(screen => ({
            ...screen,
            list_showtime: screen.list_showtime.map(t => ({
                time: t,
                isPast: isPastShowTime(screen.release_date, t)
            }))
        }))
    }, [showScreen, today])

    return (
        <div className="mt-20 max-w-6xl mx-auto p-6 space-y-10 
        bg-[#0d0d0d] text-gray-100 min-h-screen">

            {/* ==== THÔNG TIN PHIM ==== */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 p-6 
            bg-gradient-to-br from-[#1e1e1e] to-[#2a2a2a]
            rounded-3xl shadow-2xl border border-white/10
            backdrop-blur-xl">

                <div>
                    <img
                        src={movieShow?.imgUrl}
                        className="w-full h-auto rounded-2xl shadow-xl object-cover 
                ring-2 ring-white/10"
                    />
                </div>

                <div className="col-span-2 space-y-4 text-gray-200">
                    <h1 className="text-4xl font-extrabold bg-gradient-to-r 
                from-red-500 to-pink-500 bg-clip-text text-transparent">
                        {movieShow?.name}
                    </h1>

                    <p className="text-gray-300">
                        <span className="font-semibold text-white">Thể loại:</span>{" "}
                        {movieShow.listCate?.map(id => getOjectById(categories, id)?.name).join(', ')}
                    </p>

                    <p className="text-gray-300">
                        <span className="font-semibold text-white">Diễn viên:</span>{" "}
                        {movieShow.listActor?.map(id => getOjectById(actors, id)?.name).join(', ')}
                    </p>

                    <p><span className="font-semibold">Thời lượng:</span> {movieShow?.duration} phút</p>
                    <p><span className="font-semibold">Độ tuổi:</span> {movieShow?.ageLimit}</p>

                    <a
                        href={movieShow?.urlTrailer}
                        className="inline-block mt-3 px-6 py-3 
                    bg-gradient-to-r from-red-600 to-pink-600 
                    text-white rounded-xl shadow-lg hover:scale-105 
                    transition-transform">
                        Xem Trailer
                    </a>
                </div>
            </div>

            {/* ==== MÔ TẢ ==== */}
            <p className="text-gray-400 leading-relaxed bg-[#1a1a1a] p-5 rounded-2xl shadow-md border border-white/10">
                {movieShow?.description}
            </p>

            {/* ==== CHỌN NGÀY ==== */}
            <div>
                <h2 className="text-2xl font-semibold mb-4 text-white">📅 Chọn ngày chiếu</h2>

                <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar">
                    {getNext7Days().map(d => (
                        <button
                            key={d.date}
                            onClick={() => handleSelectDate(d.date)}
                            className={`flex cursor-pointer flex-col items-center px-4 py-3 rounded-2xl font-semibold shadow-md transition min-w-[90px]
                        ${today === d.date
                                    ? "bg-gradient-to-br from-red-600 to-pink-600 text-white"
                                    : "bg-gradient-to-br from-[#222] to-[#333] text-gray-200 hover:bg-[#444]"}
                    `}
                        >
                            <h1 className="text-lg">{d.date}</h1>
                            <p className="text-sm opacity-75">{d.day}</p>
                        </button>
                    ))}
                </div>
            </div>

            {/* ==== LỊCH CHIẾU THEO RẠP ==== */}
            <div>
                <h2 className="text-2xl font-semibold mb-6 text-white">Lịch chiếu</h2>

                <div className="space-y-5">
                    {showScreen.map(sm => (
                        <div className="p-5 
                    bg-gradient-to-br from-[#202020] to-[#2b2b2b]
                    rounded-2xl shadow-xl border border-white/10">

                            <div className='flex justify-between items-center'>
                                <div>
                                    <h6 className="font-semibold text-white text-lg">
                                        {getOjectById(cinemaLocations, sm.idCinemaLocation)?.name} -
                                        {getOjectById(cities, sm.idCity)?.name}
                                    </h6>
                                    <div className='text-gray-400 text-sm'>
                                        {getOjectById(cinemaLocations, sm.idCinemaLocation)?.address}
                                    </div>
                                </div>

                                <button
                                    onClick={() => setOpen(sm.id == open ? null : sm.id)}
                                    className='w-10 h-10 flex items-center justify-center rounded-full
                                bg-white/10 backdrop-blur-md border border-white/20 shadow 
                                hover:bg-white/20 transition'>
                                    {open == sm.id ? (
                                        <TiMinus className="text-white text-xl" />
                                    ) : (
                                        <FaPlus className="text-white text-xl" />
                                    )}
                                </button>
                            </div>

                            {/* SHOWTIME */}

                            {open == sm.id && (
                                <div className="flex flex-wrap gap-3 mt-4">
                                    {showtimes
                                        .find(st => st.id === sm.id)
                                        ?.list_showtime.map(t => (
                                            <button
                                                key={t.time}
                                                disabled={t.isPast}
                                                onClick={() => handleSelectTime(sm, t.time)}
                                                className={`
                        px-5 py-2 rounded-full shadow-lg font-semibold transition
                        ${t.isPast
                                                        ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                                                        : "bg-gradient-to-r from-orange-400 to-pink-500 text-white hover:scale-105"}
                    `}
                                            >
                                                {t.time}
                                            </button>
                                        ))}
                                </div>
                            )}

                        </div>
                    ))}
                </div>
            </div>

        </div>

    );
}

export default Details;
