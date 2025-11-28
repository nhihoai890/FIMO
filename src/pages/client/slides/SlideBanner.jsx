import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules'; // Thêm Autoplay

function SlideBanner() {
  return (
    <div className="w-full mx-auto">
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{ clickable: true }}
        autoplay={{        
          delay: 3000,    
          disableOnInteraction: false, 
        }}
        modules={[EffectCoverflow, Pagination, Autoplay]} 
        className="mySwiper"
      >
        <SwiperSlide>
          <img src="https://cdn.galaxycine.vn/media/2025/11/5/gdm-mainposter-2048_1762336588270.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://cdn.galaxycine.vn/media/2025/11/12/trm-2048_1762920318151.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://cdn.galaxycine.vn/media/2025/11/13/long-dien-huong-2048_1763019004777.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://cdn.galaxycine.vn/media/2025/9/24/imax-treasure-hunt--s4_1758703859745.jpg" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://cdn.galaxycine.vn/media/2025/9/4/momo-galaxy-3_1756958677195.jpg" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default SlideBanner;
