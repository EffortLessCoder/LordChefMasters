import React, { useState, useEffect } from "react";
import axios from "axios";
import Owner from "../../../../assets/about/owner.png";
import Hr from "../../../../assets/about/HR.png";
import ChiefChef from "../../../../assets/about/chief_chef.png";
import CEO from "../../../../assets/about/CEO.png";
import Infinity from "../../../../assets/Infinity.svg";
import "./about.css";

//swiper
import { Navigation, Pagination, A11y, Autoplay } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "swiper/css/autoplay";

function About(props) {
  const [chefData, setChefData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/chef")
      .then(async (result) => {
        await setChefData(result.data);
        await props.chefListProvider(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [chefData, props.chefListProvider]);
  return (
    <div
      className="w-screen h-screen px-10 py-3 relative mt-[118px]"
      id="about"
    >
      <h1 className="text-center text-xl underline text-red-400 font-bold mb-5">
        Owner and Partners
      </h1>
      <div className="w-full mb-5 flex gap-20 flex-row justify-center">
        <div className="shadow-[#333] shadow-lg flex flex-col items-center justify-around w-56 h-80 rounded-lg">
          <div className="img h-28 w-28 overflow-hidden rounded-full">
            <img
              src={Owner}
              alt="owner"
              style={{ width: "150%", height: "150%", objectFit: "cover" }}
            />
          </div>
          <div className="aboutConten text-center">
            <h1 className="text-lg font-bold  text-[#333333]">Micheal John</h1>
            <h3 className="text-center mb-2 font-semibold text-[#5f5e5ece]">
              Owner
            </h3>
            <p className="text-md mb-2 text-[#333333bb]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
              eius ipsa aspernatur ut rerum ullam.
            </p>
          </div>
        </div>
        <div className="shadow-[#333] shadow-lg flex flex-col items-center justify-around w-56 h-80 rounded-lg">
          <div className="img h-28 w-28 overflow-hidden rounded-full">
            <img
              src={CEO}
              alt="HR Manager"
              style={{ width: "150%", height: "150%", objectFit: "cover" }}
            />
          </div>
          <div className="aboutConten text-center">
            <h1 className="text-lg font-bold text-[#333333]">Micheal John</h1>
            <h3 className="text-center mb-2 font-semibold text-[#5f5e5ece]">
              CEO
            </h3>
            <p className="text-md mb-2 text-[#333333bb]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
              eius ipsa aspernatur ut rerum ullam.
            </p>
          </div>
        </div>
        <div className="shadow-[#333] shadow-lg flex flex-col items-center justify-around w-56 h-80 rounded-lg">
          <div className="img h-28 w-28 overflow-hidden rounded-full">
            <img
              src={Hr}
              alt="HR Manager"
              style={{ width: "150%", height: "150%", objectFit: "cover" }}
            />
          </div>
          <div className="aboutConten text-center">
            <h1 className="text-lg font-bold text-[#333333]">Micheal John</h1>
            <h3 className="text-center mb-2 font-semibold text-[#5f5e5ece]">
              HR Manager
            </h3>
            <p className="text-md mb-2 text-[#333333bb]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
              eius ipsa aspernatur ut rerum ullam.
            </p>
          </div>
        </div>
        <div className="shadow-[#333] shadow-lg flex flex-col items-center justify-around w-56 h-80 rounded-lg">
          <div className="img h-28 w-28 overflow-hidden rounded-full">
            <img
              src={ChiefChef}
              alt="HR Manager"
              style={{ width: "150%", height: "150%", objectFit: "cover" }}
            />
          </div>
          <div className="aboutConten text-center">
            <h1 className="text-lg font-bold text-[#333333]">Micheal John</h1>
            <h3 className="text-center mb-2 font-semibold text-[#5f5e5ece]">
              Chief Chef
            </h3>
            <p className="text-md mb-2 text-[#333333bb]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
              eius ipsa aspernatur ut rerum ullam.
            </p>
          </div>
        </div>
      </div>
      <h1 className="text-center mt-4 font-bold text-sky-600 text-lg underline">
        Our Working Partners
      </h1>
      <Swiper
        modules={[Navigation, Pagination, A11y, Autoplay]}
        spaceBetween={50}
        slidesPerView={4}
        loop={true}
        autoplay={{
          delay: 3000, // Set the delay between each slide in milliseconds
          disableOnInteraction: false, // Keep autoplaying even if user interacts with the swiper
        }}
        direction="horizontal"
      >
        <div className="transition-all mt-3 w-full flex">
          {chefData.length > 0 ? (
            chefData.map((item, index) => {
              return (
                <SwiperSlide>
                  <div className="chef uppercase px-2 py-1 flex flex-row items-center gap-2 rounded-xl shadow-inner shadow-gray-300 w-fit h-fit mx-5 my-2 text-sm">
                    <div className="w-16 h-16 rounded-full overflow-hidden mx-1 shadow-md shadow-black">
                      <img
                        src={item.profile}
                        alt="profile"
                        style={{
                          width: "150%",
                          height: "150%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <div className="text-center w-44 h-28 rounded-lg p-3 shadow-inner shadow-gray-400">
                      <h1 className="text-lg  mb-1 text-orange-500 font-semibold">
                        {item.name}
                      </h1>
                      <h1 className="text-xs text-gray-500 mb-1 font-semibold capitalize">
                        {item.yearofexp} yrs
                      </h1>
                      <h3 className="font-semibold text-gray-500 text-xs mb-1">
                        {item.company}
                      </h3>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })
          ) : (
            <div className="w-full h-40 flex justify-center items-center">
              <div className="relative w-[60px] h-[60px] rounded-full overflow-hidden">
                <img
                  src={Infinity}
                  alt="Loading..."
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
              <span className="font-bold text-md">Loading...</span>
            </div>
          )}
        </div>
      </Swiper>
    </div>
  );
}

export default About;
