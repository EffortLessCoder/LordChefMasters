import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../../../assets/Spinner.svg";

const Theme = (handle, submit, status, LoadStatus) => {
  return (
    <div>
      <div className="main p-3">
        <h1 className="text-lg font-bold underline text-center">Login</h1>
        <div className="my-4">
          <label htmlFor="username">UserName : </label>
          <input
            type="text"
            name="username"
            id="username"
            onChange={handle}
            className="block border border-black rounded-md p-1 w-full"
          />
        </div>
        <div className="my-4">
          <label htmlFor="password">Password : </label>
          <input
            className="block border border-black rounded-md p-1 w-full"
            type="password"
            name="password"
            id="password"
            onChange={handle}
          />
        </div>
        <div className="relative left-[60px]">
          <button
            onClick={submit}
            className="bg-green-500 w-20 rounded-md p-1 text-white font-bold border border-black"
          >
            Login
          </button>
          {LoadStatus ? (
            <img
              src={Spinner}
              alt="spinner"
              width="50px"
              height="50px"
              className="inline"
            />
          ) : null}
        </div>
        <div
          className={`status ${status != "success" ? "text-red-400" : null}`}
        >
          {status?(
            <div>
              <div className="w-2 h-2 mx-2 inline-block rounded-full bg-red-500"></div>
              <span>{status}</span>
            </div>
          ) : null}
        </div>
        <div className="option">
          <span>Not an User!</span>
          <button className="ml-2 m-1 border-b border-b-green-500">
            SignUp
          </button>
        </div>
      </div>
    </div>
  );
};
export function ChefLogin(props) {
  const [ChefstatusMsg, setChefStatusMsg] = useState("");
  const [loggedChefId, setLoggedChefId] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [chef, setChef] = useState({
    username: "",
    password: "",
  });
  const chefhandler = (e) => {
    let key = e.target.id;
    setChef({
      ...chef,
      [key]: e.target.value,
    });
  };
  const chefsubmit = () => {
    console.log(chef);
    let { username, password } = chef;
    axios
      .get(`http://localhost:3000/chef/login/${username}/${password}`)
      .then(async (result) => {
        const { msg, _id } = result.data;
        console.log(msg, _id);
        setChefStatusMsg(msg);
        if (ChefstatusMsg == "success") {
          setLoggedChefId(_id);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(true);
  };
  useEffect(() => {
    if (ChefstatusMsg) {
      setLoading(false);
      console.log(isLoading);
    }
    if (ChefstatusMsg == "success") {
      props.statusLogin(true);
      props.category("chef");
      props.id(loggedChefId);
    }
  }, [ChefstatusMsg]);
  return <div>{Theme(chefhandler, chefsubmit, ChefstatusMsg, isLoading)}</div>;
}

export function UserLogin(props) {
  const [UserstatusMsg, setUserStatusMsg] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [loggedUserId, setLoggedUserId] = useState("");
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const userhandler = (e) => {
    let key = e.target.id;
    setUser({
      ...user,
      [key]: e.target.value,
    });
  };
  const usersubmit = () => {
    let { username, password } = user;
    axios
      .get(`http://localhost:3000/user/login/${username}/${password}`)
      .then(async (result) => {
        await console.log(result.data);
        const { msg, _id } = result.data;
        setUserStatusMsg(msg);
        setLoggedUserId(_id);
        Theme(userhandler, usersubmit, UserstatusMsg);
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(true);
  };
  useEffect(() => {
    if (UserstatusMsg) {
      console.log(loggedUserId);
      setLoading(false);
    }
    if (UserstatusMsg == "success") {
      props.statusLogin(true);
      props.category("user");
      props.id(loggedUserId);
    }
  }, [UserstatusMsg]);
  return <div>{Theme(userhandler, usersubmit, UserstatusMsg, isLoading)}</div>;
}
