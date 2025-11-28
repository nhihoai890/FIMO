import React, { useContext } from 'react';
import { MoviesContext } from '../../../contexts/MovieProvider';
import { MovieScreeningContext } from '../../../contexts/MovieScreeningProvider';
import { FaTicketAlt, FaPlay } from 'react-icons/fa';

function NowShowing() {
    const movies = useContext(MoviesContext);
    const movieScreens = useContext(MovieScreeningContext);
    const today = new Date();

    const nowShowingScreen = movieScreens.filter(ms => {
        const rd = ms.release_date?.seconds
            ? new Date(ms.release_date.seconds * 1000)
            : new Date(ms.release_date);
        return rd && rd <= today;
    });

    return (
        <div className='pt-28 px-6 md:px-16 min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white'>
            <h1 className='text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-10 text-center'>
                🎬 Phim Đang Chiếu
            </h1>

            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8'>
                {nowShowingScreen.map(ms => {
                    const movie = movies.find(mv => mv.id === ms.idMovie);
                    if (!movie) return null;

                    return (
                        <div key={ms.id || ms.idMovie} className="relative group rounded-2xl overflow-hidden shadow-2xl bg-gray-900 hover:shadow-cyan-500/40 transition duration-500 cursor-pointer">
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
                                <button className="mt-4 px-5 py-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center gap-2 text-white font-semibold text-sm hover:scale-105 transition-transform shadow-lg shadow-red-500/50">
                                    <FaTicketAlt /> Mua vé
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default NowShowing;
