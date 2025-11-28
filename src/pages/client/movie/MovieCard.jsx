import React from 'react';
import { FaPlay, FaTicketAlt } from 'react-icons/fa';

// MovieCard.jsx
function MovieCard({ movieScreen, movie }) {
  const today = new Date();
  const releaseDate = movieScreen.release_date
    ? new Date(movieScreen.release_date.seconds ? movieScreen.release_date.seconds * 1000 : movieScreen.release_date)
    : null;

  const status = releaseDate
    ? releaseDate <= today
      ? { text: 'Now Showing', colorBg: 'bg-green-500', buttonType: 'ticket' }
      : { text: 'Upcoming', colorBg: 'bg-yellow-500', buttonType: 'trailer' }
    : { text: 'Unknown', colorBg: 'bg-gray-500', buttonType: 'trailer' };

  return (
    <div className="relative w-full rounded-xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transform hover:scale-[1.03] transition duration-300">
      <div className="w-full aspect-[2/3]">
        <img src={movie.imgUrl} alt={movie.name} className="w-full h-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center p-3 opacity-0 group-hover:opacity-100 transition duration-300">
        <h4 className="text-white font-bold text-base md:text-lg line-clamp-2">{movie.name}</h4>
        <p className="text-gray-300 text-sm mt-1">{movie.duration} min | {movie.ageLimit}+</p>
        {status.buttonType === 'ticket' ? (
          <button className="mt-3 px-4 py-2 bg-red-500 rounded-full flex items-center gap-2 text-white text-sm font-semibold hover:bg-red-400 transition duration-200 shadow-lg">
            <FaTicketAlt /> Mua vé
          </button>
        ) : (
          <button className="mt-3 px-4 py-2 bg-cyan-500 rounded-full flex items-center gap-2 text-white text-sm font-semibold hover:bg-cyan-400 transition duration-200 shadow-lg">
            <FaPlay /> Trailer
          </button>
        )}
      </div>
      <span className={`absolute top-2 left-2 px-2 py-1 rounded-md text-xs font-bold text-white ${status.colorBg} shadow-lg`}>
        {status.text}
      </span>
    </div>
  );
}

export default MovieCard;
