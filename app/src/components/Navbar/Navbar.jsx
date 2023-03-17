import React, { useState } from "react";
import Logo from "../assets/Logo.png";
import Profile from "../Main_Assets/Profile/main.profile";
import {
  Link,
  Button,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller,
} from "react-scroll";

function Navbar(props) {
  return (
    <div className="fixed w-full z-50">
      <div className="navbar border-b-1 shadow-md border-solid border-black h-16 flex justify-between items-center bg-gradient-to-r from-white via-slate-500 to-slate-800 text-white p-5 overflow-hidden">
        <div className="logo overflow-hidden relative">
          <img src={Logo} alt="Logo" className="w-36 h-36 relative top-3" />
        </div>
        <div className="menu flex items-center">
          <ul className="">
            <li className="hover:font-semibold">
              <Link
                activeClass="active"
                to="home"
                spy={true}
                smooth={true}
                offset={-75}
                duration={800}
                hashSpy={true}
              >
                Home
              </Link>
            </li>
            <li className="hover:font-semibold">
              <Link
                activeClass="active"
                to="about"
                spy={true}
                smooth={true}
                offset={-50}
                delay={200}
                duration={800}
                hashSpy={true}
              >
                About
              </Link>
            </li>
            <li className="hover:font-semibold">
              <Link
                activeClass="active"
                to="order"
                isDynamic={true}
                spy={true}
                smooth={true}
                offset={-50}
                delay={300}
                duration={800}
                hashSpy={true}
                onSetActive={(e) => {
                  console.log(e);
                }}
              >
                Check Out
              </Link>
            </li>
          </ul>
          <div>
            {props.loginStatus ? (
              <Profile
                category={props.category}
                id={props.id}
                logout={props.logoutStatus}
              />
            ) : (
              <div>
                <Link className="" to="home" smooth={true} offset={-75} duration={800}>
                  <button
                    className="bg-red-500 px-4 py-1 rounded-md font-bold hover:bg-white hover:text-black"
                    onClick={() => {
                      props.LoginClick(true);
                    }}
                  >
                    Login
                  </button>
                </Link>
                <Link to="home" smooth={true} offset={-75} duration={800}>
                  <button
                    className="bg-green-500 px-2 py-1 rounded-md font-bold hover:bg-white hover:text-black"
                    onClick={() => {
                      props.RegisterClick(true);
                    }}
                  >
                    Register
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
