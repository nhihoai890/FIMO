import React, { useContext, useEffect, useMemo, useState } from "react";
import { CitiesContext } from "../../../contexts/CitiesProvider";
import { CinemaLocationsContext } from "../../../contexts/CinemaLocationProvider";
import { MoviesContext } from "../../../contexts/MovieProvider";
import { MovieScreeningContext } from "../../../contexts/MovieScreeningProvider";
import { Link } from "react-router-dom";

function Schedule() {
  const cities = useContext(CitiesContext);
  const cinemaLocations = useContext(CinemaLocationsContext);
  const movies = useContext(MoviesContext);
  const movieScreens = useContext(MovieScreeningContext);

  const [activeCityId, setActiveCityId] = useState(null);
  const [activeCinemaLocationId, setActiveCinemaLocationId] = useState(null);
  const [activeDate, setActiveDate] = useState(null);


  useEffect(() => {
    if (!activeCityId) return;

    const cinemas = cinemaLocations.filter(
      (c) => c.idCity === activeCityId
    );

    setActiveCinemaLocationId(cinemas[0]?.id || null);
    setActiveDate(null);
  }, [activeCityId, cinemaLocations]);

  useEffect(() => {
    if (!activeCinemaLocationId) return;

    const screens = movieScreens.filter(
      (s) => s.idCinemaLocation === activeCinemaLocationId
    );

    setActiveDate(screens[0]?.release_date || null);
  }, [activeCinemaLocationId, movieScreens]);

  const cinemas = useMemo(() => {
    return cinemaLocations.filter(
      (c) => c.idCity === activeCityId
    );
  }, [cinemaLocations, activeCityId]);

  const dates = useMemo(() => {
    const list = movieScreens
      .filter((s) => s.idCinemaLocation === activeCinemaLocationId)
      .map((s) => s.release_date);

    return [...new Set(list)].sort((a, b) => new Date(a) - new Date(b));
  }, [movieScreens, activeCinemaLocationId]);

  const screens = useMemo(() => {
    return movieScreens.filter(
      (s) =>
        s.idCinemaLocation === activeCinemaLocationId &&
        s.release_date === activeDate
    );
  }, [movieScreens, activeCinemaLocationId, activeDate]);

  const scheduleMovies = useMemo(() => {
    const map = {};

    screens.forEach((screen) => {
      if (!map[screen.idMovie]) {
        const movie = movies.find((m) => m.id === screen.idMovie);
        if (!movie) return;

        map[screen.idMovie] = {
          id: movie.id,
          title: movie.name,
          duration: movie.duration,
          ageLimit: movie.ageLimit,
          imgUrl: movie.imgUrl,
          times: [],
        };
      }
      const showtimes = (screen.list_showtime || []).map((time) => ({
         time,
         movieScreenId : screen.id
      }))

      map[screen.idMovie].times.push(...showtimes);
    });

    return Object.values(map);
  }, [screens, movies]);

  return (
    <div className="min-h-screen bg-[#0B0F14] text-gray-200 px-6 py-10">
      <h1 className="text-2xl font-bold text-center mb-8">
        Lịch Chiếu Phim
      </h1>

      <div className="grid grid-cols-12 gap-6">
        {/* CITY */}
        <div className="col-span-2 bg-[#111827] rounded-xl p-4">
          <h2 className="font-semibold mb-4">Khu vực</h2>
          {cities.map((city) => (
            <button
              key={city.id}
              onClick={() => setActiveCityId(city.id)}
              className={`w-full text-left px-3 py-2 rounded-lg mb-2
                ${activeCityId === city.id
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-700"
                }`}
            >
              {city.name}
            </button>
          ))}
        </div>

        {/* CINEMA */}
        <div className="col-span-3 bg-[#111827] rounded-xl p-4">
          <h2 className="font-semibold mb-4">Rạp</h2>
          {cinemas.map((cinema) => (
            <button
              key={cinema.id}
              onClick={() => {
                setActiveCinemaLocationId(cinema.id);
                setActiveDate(null);
              }}
              className={`w-full text-left px-3 py-2 rounded-lg mb-2
                ${activeCinemaLocationId === cinema.id
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-700"
                }`}
            >
              {cinema.name}
            </button>
          ))}
        </div>

        {/* SCHEDULE */}
        <div className="col-span-7">
          {/* DATE */}
          <div className="flex gap-3 mb-6">
            {dates.map((date) => (
              <button
                key={date}
                onClick={() => setActiveDate(date)}
                className={`px-4 py-2 rounded-lg border
                  ${activeDate === date
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "border-gray-600 hover:bg-gray-700"
                  }`}
              >
                {date}
              </button>
            ))}
          </div>

          {/* MOVIES */}
          <div className="space-y-6">
            {scheduleMovies.map((movie) => (
              <div
                key={movie.id}
                className="bg-[#111827] rounded-xl flex gap-5 p-5"
              >
                <img src={movie?.imgUrl} alt="" className="w-24 h-36 object-cover rounded-lg flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1">
                    {movie.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-4">
                    {movie.duration} phút • {movie.ageLimit}
                  </p>

                  <div className="flex flex-wrap gap-3">
                    {movie.times.map((t, idx) => (
                      <Link
                        key={idx}
                        to={`/booking/${t.movieScreenId}/${t.time}`}
                      >
                        <button
                          className="px-4 py-2 rounded-lg border cursor-pointer border-blue-500
                text-blue-400 hover:bg-blue-500 hover:text-white transition"
                        >
                          {t.time}
                        </button>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {!scheduleMovies.length && (
              <p className="text-gray-400 text-center">
                Không có suất chiếu
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Schedule;
