// Main.jsx
import React, { useContext } from "react";
import SlideBanner from "../slides/SlideBanner";
import MovieSlider from "../movie/MovieSlider";
import { MovieScreeningContext } from "../../../contexts/MovieScreeningProvider";
import { MoviesContext } from "../../../contexts/MovieProvider";

function Main() {
   const movieScreen = useContext(MovieScreeningContext);
   const movies = useContext(MoviesContext);
   const today = new Date();


   const nowShowing = movieScreen.filter(ms => {
      const rd = ms.release_date?.seconds ? new Date(ms.release_date.seconds * 1000) : new Date(ms.release_date);
      return rd && rd <= today;
   });

   const upComing = movieScreen.filter(ms => {
      const rd = ms.release_date?.seconds ? new Date(ms.release_date.seconds * 1000) : new Date(ms.release_date);
      return rd && rd > today;
   });

   return (
      <div className="bg-gradient-to-b from-gray-900 via-gray-950 to-black min-h-screen text-white">
         <div className="shadow-2xl pt-16"><SlideBanner /></div>

         <section className="mt-14 px-4 md:px-12">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
               Phim Đang Chiếu
            </h2>
            <div className="rounded-2xl bg-gray-800/40 backdrop-blur-md p-5 shadow-xl border border-gray-700/40">
               <MovieSlider movieScreen={nowShowing} movies={movies} />
            </div>
         </section>

         <section className="mt-16 px-4 md:px-12 pb-16">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
               Phim Sắp Chiếu
            </h2>
            <div className="rounded-2xl bg-gray-800/40 backdrop-blur-md p-5 shadow-xl border border-gray-700/40">
               <MovieSlider movieScreen={upComing} movies={movies} />
            </div>
         </section>
      </div>
   );
}

export default Main;
