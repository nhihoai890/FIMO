// Main.jsx
import React, { useContext, useEffect, useState } from "react";
import SlideBanner from "../slides/SlideBanner";
import MovieSlider from "../movie/MovieSlider";
import { MovieScreeningContext } from "../../../contexts/MovieScreeningProvider";
import PageSearch from "../../../components/client/PageSearch";
import { getMoviesWithShowtimesAfter7Days, getMoviesWithUpcomingShowtimes } from "../../../utils/functionContants";
import { MoviesContext } from "../../../contexts/MovieProvider";

function Main() {
   const [movieShow, setMovieShow] = useState([]);
   const [upComing, setUpcoming] = useState([]);
   const movies = useContext(MoviesContext);
   const movieScreen = useContext(MovieScreeningContext);
   useEffect(() => {
      setMovieShow(getMoviesWithUpcomingShowtimes(movies, movieScreen));
       setUpcoming(getMoviesWithShowtimesAfter7Days(movies, movieScreen));
   }, [movies, movieScreen]);

   return (
      <div className="bg-gradient-to-b from-gray-900 via-gray-950 to-black min-h-screen text-white">
         <div className="shadow-2xl pt-16 relative">
            <SlideBanner />
            <PageSearch />
         </div>

         <section className="mt-14 px-4 md:px-12">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
               Phim Đang Chiếu
            </h2>
            <div className="rounded-2xl bg-gray-800/40 backdrop-blur-md p-5 shadow-xl border border-gray-700/40">
               <MovieSlider movieShow={movieShow} status={true} />
            </div>
         </section>

         <section className="mt-16 px-4 md:px-12 pb-16">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
               Phim Sắp Chiếu
            </h2>
            <div className="rounded-2xl bg-gray-800/40 backdrop-blur-md p-5 shadow-xl border border-gray-700/40">
               <MovieSlider movieShow={upComing} status={false} />
            </div>
         </section>
      </div>
   );
}

export default Main;
