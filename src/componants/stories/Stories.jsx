import { storiesData } from "../../data";
import Story from "./Story";
import { activeUser } from "../../data";
import { AiFillPlusCircle } from "react-icons/ai";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode } from "swiper/modules";
// import { useState, useEffect } from "react";

const Stories = () => {
  // const [slidesPerView, setSlidesPerView] = useState(6); // Default value for larger screens

  // useEffect(() => {
  //   // Function to update slidesPerView based on screen size
  //   function updateSlidesPerView() {
  //     const screenWidth = window.innerWidth;
  //     // Set the number of slides based on the screen width
  //     if (screenWidth <= 768) {
  //       setSlidesPerView(3); // Set to 3 for smaller screens
  //     } else {
  //       setSlidesPerView(6); // Set to 6 for larger screens
  //     }
  //   }

  //   // Initial call to set the number of slides
  //   updateSlidesPerView();

  //   // Attach the event listener for window resize
  //   window.addEventListener("resize", updateSlidesPerView);

  //   // Clean up the event listener when the component unmounts
  //   return () => {
  //     window.removeEventListener("resize", updateSlidesPerView);
  //   };
  // }, []);
  return (
    <div className="flex p-2 gap-4 overflow-x-auto lg:w-[746px] md:w-[300px] sm:w-[300px] w-[350px] scrollbar-thin scrollbar-thumb-black scrollbar-track-gray-300">
      <div className="relative w-[5.4rem] h-32 " style={{ flexShrink: 0 }}>
        <img
          src={activeUser.personPic}
          alt="activeUserPic"
          className="bg-cover w-[5.4rem] h-32 rounded-md border-[1px] border-blue-500"
        />
        <span className="text-sm absolute bottom-1 left-1 text-white ">
          <AiFillPlusCircle className="text-3xl text-blue-500" />
        </span>
      </div>
      <Swiper
        slidesPerView={6}
        spaceBetween={0}
        freeMode={true}
        modules={[FreeMode]}
        className="mySwiper"
      >
        {storiesData.map((s, i) => (
          <SwiperSlide>
            <Story story={s} key={i} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default Stories;
