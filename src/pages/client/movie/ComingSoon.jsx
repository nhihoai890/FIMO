import React, { useContext, useEffect, useState } from 'react';
import { MoviesContext } from '../../../contexts/MovieProvider';
import { MovieScreeningContext } from '../../../contexts/MovieScreeningProvider';
import { getMoviesWithShowtimesAfter7Days } from '../../../utils/functionContants';
import { FaPlay } from 'react-icons/fa';

function ComingSoon(props) {
    const movies = useContext(MoviesContext);
    const movieScreens = useContext(MovieScreeningContext);
    const [comingSoon, setComingSoon] = useState([]);
    const [selectTrailer, setSelectTraiLer] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        setComingSoon(getMoviesWithShowtimesAfter7Days(movies, movieScreens))
    }, [movies, movieScreens])

    return (
        <div className='pt-28 px-6 md:px-16 min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white'>
            <h1 className='text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-10 text-center'>
                🎬 Phim Sắp Chiếu
            </h1>

            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8'>
                {comingSoon.map(movie => {

                    return (
                        <div key={movie.id} className="relative group rounded-2xl overflow-hidden shadow-2xl bg-gray-900 hover:shadow-cyan-500/40 transition duration-500 cursor-pointer">
                            {/* Poster */}
                            <div className="w-full relative" style={{ paddingTop: '140%' }}>
                                <img
                                    src={movie.imgUrl}
                                    alt={movie.name}
                                    className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>

                            {/* Overlay Hover */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/30 flex flex-col justify-end items-center text-center p-4 opacity-0 group-hover:opacity-100 transition duration-500">
                                <h4 className="text-white font-bold text-base md:text-lg line-clamp-2">{movie.name}</h4>
                                <p className="text-gray-300 text-sm mt-1">{movie.duration} min | {movie.ageLimit}+</p>
                                <button onClick={() => {
                                    setSelectTraiLer(movie.urlTrailer);
                                    setIsOpen(true);
                                }} className="mt-4 cursor-pointer px-5 py-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center gap-2 text-white font-semibold text-sm hover:scale-105 transition-transform shadow-lg shadow-red-500/50">
                                    <FaPlay /> Trailer
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
            {isOpen && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
                    <div className="relative w-11/12 md:w-3/4 lg:w-1/2">
                        <iframe
                            className="w-full aspect-video rounded-xl shadow-xl"
                            src={selectTrailer}
                            title="Trailer"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />

                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute -top-4 -right-4 bg-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:bg-red-700 transition"
                        >
                            ✖
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
}

export default ComingSoon;