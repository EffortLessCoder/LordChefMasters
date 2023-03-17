import React, { useState,useEffect } from "react";
import avatar from "../../../assets/avatar.png";
import axios from "axios";
import Spinner from "../../../../assets/Spinner.svg";


function RegisterUser() {
  const [RegisterMsg, setRegisterMsg] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [imgData, setImgData] = useState(avatar);
  const [registeredData, setRegisteredData] = useState({
    profile: "",
    name: "",
    username: "",
    password: "",
    email: "",
    mobile: 0,
  });
  const handleProfile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    new Promise((resolve, reject) => {
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    }).then((result) => {
      setImgData(result);
      setRegisteredData({
        ...registeredData,
        profile: result,
      });
    });
  };
  const handleChange = (e) => {
    const key = e.target.id;
    setRegisteredData({
      ...registeredData,
      [key]: e.target.value,
    });
  };
  const handleSubmit = () => {
    setLoading(true);
    console.log(registeredData);
    axios
      .post("http://localhost:3000/adduser", registeredData)
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
    <React.Fragment>
      <div className="userRegistry px-2 py-2">
        {RegisterMsg == "data sent successfully" ? (
          <div className="border border-blue-500 p-3 rounded-lg relative top-[30%] text-black">
            <h5 className="text-md text-center m-3">
              Thank You For SignUp With Us :)
            </h5>
            <h2 className="font-bold text-lg">Please Login To Contiue...</h2>
          </div>
        ) : (
          <div>
            <div className="flex justify-center items-center flex-col">
              <h3>Register As User</h3>
              <label htmlFor="profile">
                <img
                  src={imgData}
                  alt="avatar"
                  width={"100px"}
                  height="100px"
                />
              </label>
              <input
                type="file"
                name="profile"
                id="profile"
                style={{ display: "none" }}
                onChange={handleProfile}
              />
            </div>
            <div>
              <div className="my-2">
                <label htmlFor="name" className="mr-10">
                  Name :{" "}
                </label>
                <input
                  className="border outline-none p-1 border-black rounded-md "
                  type="text"
                  name="name"
                  id="name"
                  onChange={handleChange}
                />
              </div>
              <div className="my-2">
                <label htmlFor="username" className="mr-4">
                  Username :
                </label>
                <input
                  className="border outline-none p-1 border-black rounded-md "
                  type="text"
                  name="username"
                  id="username"
                  onChange={handleChange}
                />
              </div>
              <div className="my-2">
                <label htmlFor="email" className="mr-11">
                  Email :{" "}
                </label>
                <input
                  className="border outline-none p-1 border-black rounded-md "
                  type="email"
                  name="email"
                  id="email"
                  onChange={handleChange}
                />
              </div>
              <div className="my-2">
                <label htmlFor="mobile" className="mr-8">
                  Mobile :{" "}
                </label>
                <input
                  className="border outline-none p-1 border-black rounded-md "
                  type="number"
                  name="mobile"
                  id="mobile"
                  onChange={handleChange}
                />
              </div>
              <div className="my-2">
                <label htmlFor="password" className="mr-4">
                  Password :{" "}
                </label>
                <input
                  className="border outline-none border-black rounded-md "
                  type="password"
                  name="password"
                  id="password"
                  onChange={handleChange}
                />
              </div>
              <div className="my-2">
                <label htmlFor="confirmpass" className="mr-2">
                  Confirm Password :{" "}
                </label>
                <input
                  className="border outline-none p-1 border-black rounded-md "
                  type="password"
                  name="confirm"
                  id="confirmpass"
                />
              </div>
              <div className="my-2">
                <button
                  style={{ cursor: isLoading ? "progress" : "pointer" }}
                  disabled={isLoading ? "disabled" : null}
                  className="hover:border-green-600 hover:bg-white hover:text-black bg-green-500 text-white relative left-32 mt-2 p-1 rounded-lg font-bold border border-black top-1/2 w-28"
                  type="submit"
                  onClick={handleSubmit}
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
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}

export default RegisterUser;

/**{
    "email" : "email",
    "username" : "name1234",
    "password" : "password123",
    "profile" : "picture",
    "name":"test",
    "mobile" : 123456
} */
