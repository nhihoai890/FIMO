
import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import MovieCard from "./MovieCard";
import { MoviesContext } from "../../../contexts/MovieProvider";

function MovieSlider({ movieShow, status }) {
   return (
      <Swiper
         modules={[Navigation, Pagination, Autoplay]}
         spaceBetween={20}
         slidesPerView={1}
         navigation
         pagination={{ clickable: true }}
         autoplay={{ delay: 3000, disableOnInteraction: false }}
         breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
         }}
         className="py-2"
      >
         {movieShow.map(movie => {
           
            return (
               <SwiperSlide key={ movie.id}>
                  <MovieCard  movie={movie} status={status} />
               </SwiperSlide>
            ) ;
         })}
      </Swiper>
   );
}

export default MovieSlider;
