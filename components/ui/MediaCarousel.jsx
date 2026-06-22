"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Keyboard } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/free-mode";
export function MediaCarousel({
  images,
  cover,
  initialIndex = 0
}) {
  const allImages = cover ? [cover, ...images] : images;
  const swiperRef = useRef(null);
  return <div className="relative flex flex-col items-center justify-center w-full h-full">
      <div className="w-full relative">
        <Swiper onSwiper={s => swiperRef.current = s} modules={[FreeMode, Keyboard]} spaceBetween={20} slidesPerView={1} freeMode centeredSlides grabCursor keyboard={{
        enabled: true
      }} initialSlide={initialIndex} className="w-full max-w-full">
          {allImages.map((img, idx) => <SwiperSlide key={idx} className="flex items-center justify-center">
              <div className="w-full max-w-[1100px] mx-auto flex items-center justify-center">
                <Image src={img} alt={`slide-${idx}`} width={0} height={0} sizes="100vw" className="w-full h-auto max-h-[78vh] object-contain select-none" draggable={false} />

              </div>
              <div className="absolute top-3 left-3 font-mono text-[10px] uppercase tracking-[0.3em] text-white/70 bg-background/60 backdrop-blur px-2 py-1 border border-border">
                {String(idx + 1).padStart(2, "0")} / {String(allImages.length).padStart(2, "0")}
              </div>
            </SwiperSlide>)}
        </Swiper>

        {/* Desktop nav */}
        <div className="hidden md:flex absolute bottom-4 left-1/2 -translate-x-1/2 gap-3 z-10">
          <button onClick={() => swiperRef.current?.slidePrev()} className="p-2.5 bg-background/60 backdrop-blur border border-border text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors" aria-label="Previous slide">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={() => swiperRef.current?.slideNext()} className="p-2.5 bg-background/60 backdrop-blur border border-border text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors" aria-label="Next slide">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <div className="flex md:hidden justify-center gap-4 mt-4 z-10">
        <button onClick={() => swiperRef.current?.slidePrev()} className="p-2 bg-background/60 backdrop-blur border border-border text-foreground" aria-label="Previous slide">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button onClick={() => swiperRef.current?.slideNext()} className="p-2 bg-background/60 backdrop-blur border border-border text-foreground" aria-label="Next slide">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>;
}
export default MediaCarousel;
