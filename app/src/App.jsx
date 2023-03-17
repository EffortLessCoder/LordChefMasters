import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import RegisterChef from "./components/Main_Assets/Register/Chef/Register.Chef";
import RegisterUser from "./components/Main_Assets/Register/User/Register.User";

import {
  UserLogin,
  ChefLogin,
} from "./components/Main_Assets/Login/main.login";
import Home from "./components/Main_Assets/Pages/home/Home";
import About from "./components/Main_Assets/Pages/about/About";
import Order from "./components/Main_Assets/Pages/booking/Order";
import { animateScroll } from "react-scroll";

function App() {
  //For Register/Login Setup
  const [isLogin, setLogin] = useState(false);
  const [isChefLogin, setChefLogin] = useState(false);
  const [isUserLogin, setUserLogin] = useState(false);
  const [isRegister, setRegister] = useState(false);
  const [isChefRegister, setChefRegister] = useState(false);
  const [isUserRegister, setUserRegister] = useState(false);

  //After SignIn
  const [isSignInComplete, setSignInComplete] = useState(false);
  const [userCategory, setUserCategory] = useState("");
  const [userId, setUserId] = useState("");

  //After SignUp
  const [isSignUpComplete,setSignUpComplete] = useState(false)

  const [chefData, setchefData] = useState([]);

  //scroll animation
  function scrollToTop() {
    animateScroll.scrollToTop();
  }
  function scrollToBottom() {
    animateScroll.scrollToBottom();
  }

  const RegisterOptions = () => {
    return (
      <div className="w-[200px] h-[200px] flex justify-center items-center flex-col">
        <div>
          <button
            onClick={() => {
              isLogin
                ? setChefLogin(true)
                : isRegister
                ? setChefRegister(true)
                : null;
            }}
            className="bg-blue-600 p-2 rounded-md text-white font-bold border border-black hover:bg-white hover:text-[#333] hover:border-blue-600 m-3"
          >
            Continue as Chef
          </button>
        </div>
        <h3 className="font-bold">or</h3>
        <div>
          <button
            onClick={() => {
              isLogin
                ? setUserLogin(true)
                : isRegister
                ? setUserRegister(true)
                : null;
            }}
            className="hover:border-fuchsia-600 border border-black hover:bg-white hover:text-[#333]  bg-fuchsia-600 p-2 rounded-md text-white font-bold m-3"
          >
            Continue as User
          </button>
        </div>
      </div>
    );
  };
  useEffect(() => {
    console.log(userId)
    if (isSignInComplete) {
      setRegister(false);
      setChefRegister(false);
      setUserRegister(false);
      setLogin(false);
      setChefLogin(false);
      setUserLogin(false);
    }
    if(isSignUpComplete){
      setTimeout(() => {
        window.location.reload()
      },1000);
    }
  }, [isLogin,userId]);

  return (
    <div className="App overflow-hidden">
      {/* Navbar Portion Starts */}
      <Navbar
        RegisterClick={setRegister}
        LoginClick={setLogin}
        loginStatus={isSignInComplete}
        category={userCategory}
        id={userId}
        logoutStatus={setSignInComplete}
      />
      {isRegister || isLogin ? (
        <div className="z-20 popup-container absolute top-20 right-2 border border-black rounded-lg shadow-2xl m-5">
          <button
            className="relative float-right -top-3 -right-3 rounded-full p-1 bg-red-400 hover:border-red-500 border border-black hover:bg-white hover:text-white"
            onClick={() => {
              if (isRegister) {
                setRegister(false);
                setChefRegister(false);
                setUserRegister(false);
              } else {
                setLogin(false);
                setChefLogin(false);
                setUserLogin(false);
              }
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              className="font-bold"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
            </svg>
          </button>
          <div className="popup-container bg-white rounded-md p-2 w-full h-full">
            {!isChefRegister &&
            !isUserRegister &&
            !isChefLogin &&
            !isUserLogin ? (
              RegisterOptions()
            ) : isChefRegister ? (
              <RegisterChef/>
            ) : isUserRegister ? (
              <RegisterUser />
            ) : isChefLogin ? (
              <ChefLogin
                statusLogin={setSignInComplete}
                category={setUserCategory}
                id={setUserId}
              />
            ) : isUserLogin ? (
              <UserLogin
                statusLogin={setSignInComplete}
                category={setUserCategory}
                id={setUserId}
              />
            ) : null}
          </div>
        </div>
      ) : null}
      {/* Navbar Portion Ends */}

      <Home />
      <About chefListProvider={setchefData} />
      <Order
        chefListConsumer={chefData}
        IsLoggedIn={isSignInComplete}
        setLogin={setLogin}
        setUserLogin={setUserLogin}
        userId={userId}
        MoveToLogin = {scrollToTop}
        MoveToCheckout = {scrollToBottom}
      />
    </div>
  );
}

export default App;
