import React, { useContext, useState, useMemo, useEffect } from "react";
import { CitiesContext } from "../../../contexts/CitiesProvider";
import { CinemaLocationsContext } from "../../../contexts/CinemaLocationProvider";
import { MoviesContext } from "../../../contexts/MovieProvider";
import { MovieScreeningContext } from "../../../contexts/MovieScreeningProvider";

function Schedule() {
    const cities = useContext(CitiesContext);
    const cinemaLocations = useContext(CinemaLocationsContext);
    const movies = useContext(MoviesContext);
    const movieScreens = useContext(MovieScreeningContext);

    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedCinema, setSelectedCinema] = useState(null);

    // City mặc định




    useEffect(() => {
        if (cities.length > 0 && !selectedCity) {
            setSelectedCity(cities[0].idCity);
        }
        console.log("Selected city:", selectedCity);
    }, [cities, selectedCity]);

    const filteredCinemas = useMemo(() => {
        if (!selectedCity) return [];
        return cinemaLocations.filter(c => c.idCity === selectedCity);
    }, [cinemaLocations, selectedCity]);

    useEffect(() => {
        if (filteredCinemas.length > 0) {
            setSelectedCinema(filteredCinemas[0].idCinema);
        } else {
            setSelectedCinema("");
        }
    }, [filteredCinemas]);


    const moviesWithTimes = useMemo(() => {
        if (!selectedCinema) return [];

        // Lấy screening theo cinema
        const screeningByCinema = movieScreens.filter(
            s =>
                s.idCinemaLocation === selectedCinema &&
                s.idCity === selectedCity
        );
        // Gom theo movie
        return movies
            .map(movie => {
                const times = screeningByCinema
                    .filter(s => s.idMovie === movie.idMovie)
                    .flatMap(s => s.list_showtime);

                if (times.length === 0) return null;

                return {
                    ...movie,
                    showtimes: times
                };
            })
            .filter(Boolean);
    }, [movies, movieScreens, selectedCinema]);



    return (
        <div className="mt-24 max-w-6xl mx-auto p-6 flex gap-6 bg-[#0f0f12] text-gray-200">

            {/* CỘT TRÁI – CITY */}
            <div className="w-1/4 bg-[#1a1a1f] rounded-2xl border border-[#24242a]">
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-3 text-white font-semibold">Khu vực</div>

                <ul className="p-3 space-y-2">
                    {cities.map(city => (
                        <button
                            key={city?.id}
                            onClick={() => setSelectedCity(city.id)}
                            className={`w-full flex justify-between items-center px-3 py-2 rounded-xl transition 
                                ${selectedCity === city.idCity
                                    ? "bg-blue-600 text-white"
                                    : "hover:bg-[#2a2a32] text-gray-300"}`}
                        >
                            <span>{city?.name}</span>
                        </button>
                    ))}
                </ul>
            </div>

            {/* CỘT GIỮA – CINEMA */}
            <div className="w-1/4 bg-[#1a1a1f] rounded-2xl border border-[#24242a]">
                <div className="bg-gradient-to-r from-pink-600 to-purple-600 p-3 text-white font-semibold">Rạp</div>

                <ul className="p-3 space-y-2">
                    {filteredCinemas.map(c => (
                        <button
                            key={c.idCity}
                            onClick={() => setSelectedCinema(c.idCity)}
                            className={`w-full text-left px-3 py-2 rounded-xl transition 
                                ${selectedCinema === c.idCinema
                                    ? "bg-pink-600 text-white"
                                    : "hover:bg-[#2a2a32] text-gray-300"}`}
                        >
                            {c.name}
                        </button>
                    ))}
                </ul>
            </div>

            {/* CỘT PHẢI – MOVIE */}
            <div className="w-1/2 space-y-4">
                <h2 className="text-xl font-semibold text-white">
                    Phim chiếu tại:{" "}
                    <span className="text-blue-400">
                        {filteredCinemas.find(c => c.idCinemaLocation === selectedCinema)?.name}
                    </span>
                </h2>

                {moviesWithTimes.length === 0 && (
                    <div className="text-gray-400">Không có suất chiếu.</div>
                )}

                {moviesWithTimes.map(movie => (
                    <div key={movie.idMovie}
                        className="bg-[#1c1c22] border border-[#2a2a32] rounded-2xl p-4 flex gap-4 hover:shadow-2xl transition">

                        <img
                            src={movie.imgUrl}
                            className="w-24 h-36 object-cover rounded-xl"
                            alt={movie.name}
                        />

                        <div className="flex-1">
                            <div className="text-lg text-white font-semibold">{movie.name}</div>
                            <div className="text-gray-400 text-sm">
                                {movie.ageLimit} • {movie.duration} phút
                            </div>

                            <div className="flex flex-wrap gap-2 mt-3">
                                {movie.showtimes.map(t => (
                                    <button
                                        key={t}
                                        className="px-3 py-1.5 border border-blue-500 text-blue-400 rounded-xl hover:bg-blue-600 hover:text-white transition"
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default Schedule;
