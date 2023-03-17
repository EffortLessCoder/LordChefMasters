import React from "react";
import GoodQuality from "../../../../assets/GoodQuality.jpg";
import Hygeine from "../../../../assets/hygiene.jpg";
import Delicious from "../../../../assets/delicious.jpg";
import LessPrice from "../../../../assets/LessPrice.jpg";
import "./home.css";

function Home() {
  return (
    <div className="w-full h-[87vh] flex justify-center items-center relative top-24" id="home">
      <div className="rounded-lg w-5/6 h-5/6 flex flex-row gap-2 shadow-2xl">
        <div className="p-2 imgBox w-1/2 h-full flex flex-col flex-wrap">
          <div className="wrapper overflow-hidden relative p-2 w-1/2 h-1/2">
            <img
              className="image opacity-80"
              src={GoodQuality}
              alt="Good-quality"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div className="content absolute flex flex-col text-center justify-center items-center top-8 left-8 container backdrop-blur-sm border border-red-500 w-52 h-36 text-white">
              <h1 className="text-xl font-bold underline text-green-400">
                Good Quality
              </h1>
              <span className="text-lg font-semibold">
                Savor the Flavors of Perfection: Where Good Quality Food is Our
                Promise!
              </span>
            </div>
          </div>
          <div className="wrapper overflow-hidden relative p-2 w-1/2 h-1/2">
            <img
              className="image opacity-80"
              src={LessPrice}
              alt="Less-price"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div className="content absolute flex flex-col text-center justify-center items-center top-8 left-8 container backdrop-blur-sm border border-red-500 w-52 h-36 text-white">
              <h1 className="text-xl font-bold underline text-green-400">
                Less Price
              </h1>
              <span className="text-lg font-semibold">
                Delicious meals without breaking the bank!
              </span>
            </div>
          </div>
          <div className="wrapper overflow-hidden relative p-2 w-1/2 h-1/2">
            <img
              className="image opacity-80 "
              src={Hygeine}
              alt="hygeine"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div className="content absolute flex flex-col text-center justify-center items-center top-8 left-8 container backdrop-blur-sm border border-red-500 w-52 h-36 text-white">
              <h1 className="text-xl font-bold underline text-green-400">
                Hygiene
              </h1>
              <span className="text-lg font-semibold">
                Experience food that's not only delicious, but also safe and
                hygienic.
              </span>
            </div>
          </div>
          <div className="wrapper overflow-hidden relative p-2 w-1/2 h-1/2">
            <img
              className="image opacity-80"
              src={Delicious}
              alt="delicious"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div className="content absolute flex flex-col text-center justify-center items-center top-8 left-8 container backdrop-blur-sm border border-red-500 w-52 h-36 text-white">
              <h1 className="text-xl font-bold underline text-green-400">
                Deligious
              </h1>
              <span className="text-lg font-semibold">
                Where every bite brings you joy
              </span>
            </div>
          </div>
        </div>
        <div className="contentBox shadow-inner shadow-[#33333375] w-1/2 h-full p-2 flex justify-center items-center">
          <div className="w-10/12 h-10/12 shadow-inner shadow-[#33333373]">
            <h1 className="text-2xl text-center font-extrabold text-red-400 m-5">
              Chef Contract Provider
            </h1>
            <div className="tags text-center">
              <h3 className="text-lg m-5 font-semibold text-[#333333aa]">
                "Savor the Flavor with the Best Chefs on Contract!"
              </h3>
              <h4 className="text-lg m-5 font-semibold text-[#33333397]">
                Find Your Perfect Chef on Contract Today!
              </h4>
            </div>
            <p className="m-2 text-center font-semibold text-lg text-indigo-800">
              Welcome to our chef contract providing website, where you can
              easily find the perfect chef to suit your needs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
