"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper";

export default function ImageSlider({ images }: { images: string[] }) {
  if (!images || images.length === 0) return null;

  return (
    <div className="w-full">
      <Swiper modules={[Navigation, Pagination]} navigation pagination={{ clickable: true }} spaceBetween={10} slidesPerView={1}>
        {images.map((src, i) => (
          <SwiperSlide key={i}>
            <div className="h-96 w-full flex items-center justify-center bg-gray-100 rounded overflow-hidden">
              <img src={src} alt={`slide-${i}`} className="object-cover w-full h-full" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
