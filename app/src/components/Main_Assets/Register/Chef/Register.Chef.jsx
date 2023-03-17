import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import avatar from "../../../assets/avatar.png";
import SwiperBtns from "../../../assets/swiper_btns/swiperBtns";
import Spinner from "../../../../assets/Spinner.svg";

//swiper
// import Swiper core and required modules
import { Navigation, Pagination, A11y } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function RegisterChef(props) {
  const [RegisterMsg, setRegisterMsg] = useState("");
  const [isLoading, setLoading] = useState(false);
  //swiper
  const [slide, setSlide] = useState(0);
  //states
  const elementRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(avatar);
  const [registeredData, setRegisteredData] = useState({
    username: "",
    email: "",
    password: "",
    profile: "",
    name: "",
    mobile: "",
    yearofexp: 0,
    company: "",
    summary: "",
    hourly_rate: 0,
    total_package: 0,
    specifications: [],
  });
  const [specification, setSpecification] = useState("");
  const handleChange = (e) => {
    const key = e.target.id;
    setRegisteredData({
      ...registeredData,
      [key]: e.target.value,
    });
  };
  const filehandle = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    new Promise((resolve, reject) => {
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    }).then((result) => {
      setImgSrc(result);
      setRegisteredData({
        ...registeredData,
        profile: result,
      });
    });
  };
  const handleSubmit = () => {
    setLoading(true);
    console.log(registeredData);
    let {
      email,
      username,
      password,
      profile,
      name,
      mobile,
      yearofexp,
      company,
      summary,
      hourly_rate,
      total_package,
      specifications,
    } = registeredData;
    axios
      .post("http://localhost:3000/addchef", {
        email,
        username,
        password,
        profile,
        name,
        mobile,
        yearofexp,
        company,
        summary,
        hourly_rate,
        total_package,
        specifications,
      })
      .then((result) => {
        const { msg } = result.data;
        console.log(msg);
        setRegisterMsg(msg);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (RegisterMsg) {
      setLoading(false);
      console.log(RegisterMsg);
    }
  }, [RegisterMsg]);
  
  return (
    <div className="Register-user w-Register h-Register py-2 px-1">
      {RegisterMsg == "data sent successfully" ? (
        <div className="border border-blue-500 p-3 rounded-lg relative top-[30%] text-black">
          <h5 className="text-md text-center m-3">
            Thank You For SignUp With Us :)
          </h5>
          <h2 className="font-bold text-lg">Please Login To Contiue...</h2>
        </div>
      ) : (
        <div className="flex">
          <Swiper
            modules={[Navigation, Pagination, A11y]}
            spaceBetween={50}
            slidesPerView={1}
            allowTouchMove={false}
            pagination={{
              type: "progressbar",
            }}
            className="h-[345px] min-w-[240px]"
          >
            <SwiperSlide>
              <div className="flex flex-col my-3">
                <h3 className="text-center underline m-2">
                  <b className="text-lg uppercase">Register</b>
                </h3>
                <div className="main">
                  <div className="m-2">
                    <label htmlFor="username">Username : </label>
                    <input
                      required={true}
                      className=" placeholder:text-sm border border-black outline-none rounded-md px-1"
                      type="text"
                      name="username"
                      id="username"
                      placeholder="Example:Maxim01"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="m-2">
                    <label htmlFor="email">Email : </label>
                    <input
                      required={true}
                      className=" placeholder:text-sm border border-black outline-none rounded-md px-1"
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Example@gmail.com"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="m-2">
                    <label htmlFor="password">Password : </label>
                    <input
                      required={true}
                      className=" placeholder:text-sm border border-black outline-none rounded-md px-1"
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Password"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="m-2">
                    <label htmlFor="confirmpasswd">Confirm Password : </label>
                    <input
                      required={true}
                      className=" placeholder:text-sm border border-black outline-none rounded-md px-1"
                      type="password"
                      placeholder="Password Again"
                      name="confirmpasswd"
                      id="confirmpasswd"
                    />
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="Persional box my-5" ref={elementRef}>
                <h3 className="text-center m-2">
                  <b className="underline">Persional Details </b>
                </h3>
                <div className="main flex flex-col justify-center items-center">
                  <div className="my-2 max-w-[100px] max-h-[100px] overflow-hidden rounded-full">
                    <label htmlFor="profile">
                      <div className="w-16 h-16 rounded-full overflow-hidden">
                        <img
                          src={imgSrc}
                          alt="profile"
                          style={{
                            width: "150%",
                            height: "150%",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    </label>
                    <input
                      required={true}
                      type="file"
                      name="profile"
                      id="profile"
                      style={{ display: "none" }}
                      onChange={filehandle}
                    />
                  </div>
                  <div className="my-2">
                    <label htmlFor="name">Name : </label>
                    <input
                      placeholder="Enter Name Here"
                      className=" placeholder:text-sm border border-black outline-none rounded-md px-1"
                      required={true}
                      type="text"
                      name="name"
                      id="name"
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <div className="my-2">
                      <label htmlFor="mobile">Mobile No :</label>
                      <input
                        placeholder="Mobile Number"
                        className=" placeholder:text-sm border border-black outline-none rounded-md px-1"
                        required={true}
                        type="number"
                        name="mobile"
                        id="mobile"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="Professional box my-5">
                <h3 className="text-center my-2">
                  <b className="font-bold underline">Professional Details</b>
                </h3>
                <div className="main">
                  <div className="my-4">
                    <label htmlFor="yearofexp">Year of Experience : </label>
                    <input
                      placeholder="year of Experience"
                      className=" placeholder:text-sm border border-black outline-none rounded-md px-1"
                      required={true}
                      type="number"
                      name="yoe"
                      id="yearofexp"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="my-4">
                    <label htmlFor="company">Company Name: </label>
                    <input
                      placeholder="Working Company Name"
                      className=" placeholder:text-sm border border-black outline-none rounded-md px-1"
                      required={true}
                      type="text"
                      name="company"
                      id="company"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="my-4">
                    <label htmlFor="summary">Professional Summary : </label>
                    <textarea
                      className=" placeholder:text-sm border border-black outline-none rounded-md px-1"
                      placeholder="Add Your Working Summary Here!"
                      name="summary"
                      id="summary"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="Package my-5">
                <h3 className="font-bold text-center underline my-3">
                  Package Details{" "}
                </h3>
                <div className="main">
                  <div>
                    <label htmlFor="hour-Rate">Hourly Rate : </label>
                    <input
                      className="w-20 border border-black rounded-md mx-1 p-1 my-3"
                      required={true}
                      type="number"
                      name="hour-Rate"
                      id="hourly_rate"
                      onChange={handleChange}
                    />
                    <span>
                      <h4 style={{ display: "inline-block" }}>
                        <b>/hour</b>
                      </h4>
                    </span>
                  </div>
                  <div>
                    <label
                      htmlFor="total"
                      title="(as per of work and specifications)"
                    >
                      Total Package :
                    </label>
                    <input
                      className="w-20 p-1 border border-black rounded-md mx-1 my-3"
                      required={true}
                      type="number"
                      name="total"
                      id="total_package"
                      onChange={handleChange}
                    />
                    <span>
                      <h4 style={{ display: "inline-block" }}>
                        <b>/work</b>
                      </h4>
                    </span>
                  </div>
                  <div>
                    <label htmlFor="special">Add Specification : </label>
                    <ul>
                      {registeredData.specifications.map((item, index) => {
                        return (
                          <div>
                            <li key={index}>{item}</li>
                          </div>
                        );
                      })}
                    </ul>
                    <textarea
                      placeholder="example : I will Prepare 5 dishes for 40 serves"
                      className="border border-black rounded-md p-1 placeholder:text-sm"
                      name="special"
                      id="specification"
                      value={specification}
                      onChange={(e) => {
                        setSpecification(e.target.value);
                      }}
                    ></textarea>
                    <button
                      onClick={() => {
                        setRegisteredData({
                          ...registeredData,
                          specifications: [
                            ...registeredData.specifications,
                            specification,
                          ],
                        });
                        setSpecification("");
                      }}
                      className="bg-green-500 text-white w-5 rounded-2xl relative right-1 -top-12"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            {slide != 3 ? (
              <SwiperBtns slideChange={setSlide} />
            ) : (
              <div className="text-center relative -top-10 z-10">
                <button
                  style={{ cursor: isLoading ? "progress" : "pointer" }}
                  disabled={isLoading ? "disabled" : null}
                  type="submit"
                  onClick={handleSubmit}
                  className="font-bold p-1 bg-green-500 w-24 h-full rounded-lg border border-green-500 text-white hover:bg-white hover:text-black"
                >
                  Submit
                </button>
                {isLoading ? (
                  <img
                    src={Spinner}
                    alt="spinner"
                    width="30px"
                    height="30px"
                    className="inline z-10 mx-3"
                  />
                ) : null}
              </div>
            )}
          </Swiper>
        </div>
      )}
    </div>
  );
}

export default RegisterChef;
