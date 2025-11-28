
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import MovieCard from "./MovieCard";

function MovieSlider({ movieScreen, movies }) {
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
         {movieScreen.map(ms => {
            const movie = movies.find(mv => mv.id === ms.idMovie);
            return movie ? (
               <SwiperSlide key={ms.id || ms.idMovie}>
                  <MovieCard movieScreen={ms} movie={movie} />
               </SwiperSlide>
            ) : null;
         })}
      </Swiper>
   );
}

export default MovieSlider;
