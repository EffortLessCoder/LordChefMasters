import React from "react";
import { useState, useEffect } from "react";
import Spinner from "../../../../assets/Spinner.svg";
import axios from "axios";
import Infinity from "../../../../assets/Infinity.svg";

function Order(props) {
  const [isClicked, setClicked] = useState(false);
  const [ischecked, setChecked] = useState(false);
  const [dates, setDates] = useState([]);
  const [rate, setRate] = useState(null);
  const [userIdList,setUserIdList]=useState([])
  const [selectedChef, setSelectedChef] = useState(null);
  const [orderData, setOrderData] = useState({
    OrganizerName: "",
    eventName: "",
    startDate: "",
    endDate: "",
  });
  const [formated, setFormated] = useState({
    chefId: "",
    userId: "",
    startDate: "",
    endDate: "",
    paid: 0,
    eventName: "",
    eventOrganizer: "",
  });

  const resetAll = () => {
    setOrderData({
      OrganizerName: "",
      eventName: "",
      startDate: "",
      endDate: "",
    });
    setSelectedChef(null);
    setRate(null);
  };
  useEffect(() => {
    if (props.IsLoggedIn) {
      props.setLogin(false);
      props.setUserLogin(false);
      props.MoveToCheckout();
    }
      if (dates.length > 0) {
        dates.map((date) => {
          axios
            .get(`http://localhost:3000/work/search/?startDate=${date}`)
            .then((result) => {
              if(result.data != null){
                setUserIdList([...userIdList,result.data['chefId']])
              }
            });
        });
      }
  }, [props.IsLoggedIn,dates]);
  const chefHandler = () => {
    let { OrganizerName, eventName, startDate, endDate } = orderData;
    if (OrganizerName && eventName && startDate && endDate) {
      setClicked(!isClicked);
      if (startDate && endDate) {
        setDates(getDateRange(startDate, endDate));
      }
      console.log(dates);
      console.log(userIdList);
    } else {
      alert("please fill above details");
    }
  };
  const getDateRange = (startDateStr, endDateStr) => {
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);
    const dates = [];

    let currentDate = startDate;
    while (currentDate <= endDate) {
      const formattedDate = currentDate.toISOString().slice(0, 10);
      dates.push(formattedDate);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };
  const CheckOut = () => {
    setChecked(true);
    if (props.IsLoggedIn) {
      props.setLogin(false);
      props.setUserLogin(false);
      props.MoveToCheckout();
      setFormated({
        chefId: selectedChef[0]["_id"],
        userId: props.userId,
        startDate: orderData["startDate"],
        endDate: orderData["endDate"],
        paid: rate,
        eventName: orderData["eventName"],
        eventOrganizer: orderData["OrganizerName"],
      });
      const {
        chefId,
        userId,
        startDate,
        endDate,
        paid,
        eventName,
        eventOrganizer,
      } = formated;
      console.log(formated);
      axios
        .post("http://localhost:3000/addwork", {
          chefId,
          userId,
          startDate,
          endDate,
          paid,
          eventName,
          eventOrganizer,
        })
        .then((result) => {
          if (result.status == 200) {
            setChecked(false);
            resetAll();
            alert("Track Your Order in Your Profile");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      if (!props.IsLoggedIn) {
        props.setLogin(true);
        props.setUserLogin(true);
        props.MoveToLogin();
      }
    }
  };
  return (
    <div
      className="w-screen h-screen relative px-10 py-3 flex flex-col items-center justify-center"
      id="order"
    >
      <div className="flex justify-between items-center w-5/6 h-5/6 p-3">
        <div className="pr-10 mr-28 leading-10 capitalize w-3/4 border-r-2 border-red-400">
          <p>
            Looking to book a talented chef for your next event or special
            occasion? Look no further than our booking website, where you can
            browse a variety of expert chefs in contract and find the perfect
            fit for your needs.
          </p>
          <span className="font-bold text-md">
            Elevate your event with a talented chef in contract - book with us
            today!
          </span>
        </div>
        <div className="w-full">
          <h1 className="text-center font-bold text-lg text-indigo-600">
            Reserve Your Own Chef Now
          </h1>
          <div className="relative">
            <div className="m-1">
              <label htmlFor="organizer" className="mr-5">
                Event Organizer Name{" "}
              </label>
              <input
                onChange={(e) => {
                  e.preventDefault();
                  setOrderData({ ...orderData, OrganizerName: e.target.value });
                }}
                type="text"
                title="who organizes this program"
                placeholder="Enter Organizer Name"
                name="organizer"
                id="organizer"
                value={orderData.OrganizerName}
                className="border border-black rounded-md p-1 outline-none w-80"
              />
            </div>
            <div className="m-1">
              <label htmlFor="event" className="mr-24">
                Event Name{" "}
              </label>
              <input
                onChange={(e) => {
                  e.preventDefault();
                  setOrderData({ ...orderData, eventName: e.target.value });
                }}
                type="text"
                placeholder="Event Name"
                value={orderData.eventName}
                name="event"
                id="event"
                className="border border-black rounded-md p-1 outline-none w-80"
              />
            </div>
            <div className="m-1">
              <label htmlFor="begin-date" className="m-[30px] relative -left-8">
                {" "}
                Event Begin Date{" "}
              </label>
              <input
                onChange={(e) => {
                  e.preventDefault();
                  setOrderData({ ...orderData, startDate: e.target.value });
                }}
                type="date"
                value={orderData.startDate}
                name="begin-date"
                id="begin-date"
                className="border border-black rounded-md p-1 outline-none w-80"
              />
            </div>
            <div className="m-1">
              <label htmlFor="end-date" className="mr-[75px]">
                Event End Date{" "}
              </label>
              <input
                onChange={(e) => {
                  e.preventDefault();
                  setOrderData({ ...orderData, endDate: e.target.value });
                }}
                type="date"
                value={orderData.endDate}
                name="end-date"
                id="end-date"
                className="border border-black rounded-md p-1 outline-none w-80"
              />
            </div>
            <div>
              <center>
                <div
                  className="bg-red-400 mb-2 text-white font-bold w-fit cursor-pointer rounded-md p-2 z-[5]"
                  onClick={chefHandler}
                >
                  Choose Chef Here
                </div>
              </center>
              <div
                className="bg-white border border-black w-[120%] h-96 z-10 absolute -left-20 top-5 rounded-lg"
                style={{ display: isClicked ? "block" : "none" }}
              >
                <div
                  className="close absolute right-0 cursor-pointer rounded-full w-fit"
                  onClick={() => {
                    setClicked(false);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    className="font-bold"
                  >
                    <path d="M0 0h24v24H0z" fill="none" />
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
                  </svg>
                </div>
                <div className="w-full h-full overflow-x-hidden">
                  <div className="wrapper flex-row flex flex-wrap">
                    {props.chefListConsumer.length > 0 ? (
                      props.chefListConsumer.map((item, index) => {
                        let isError = false;
                        let isHour = false;
                        let isClick = false;
                        let isTotal = false;
                        const {
                          _id,
                          name,
                          profile,
                          yearofexp,
                          company,
                          hourly_rate,
                          total_package,
                          specifications,
                        } = item;
                        return (
                          <div className="w-60 m-5 p-1 border flex flex-col border-black rounded-lg">
                            <div className="flex justify-center pt-2">
                              <div className="relative">
                                <div className="w-2  h-2 right-0 absolute top-0 rounded-full"></div>
                                <div className="relative w-[60px] h-[60px] rounded-full overflow-hidden">
                                  <img
                                    src={profile}
                                    alt="profile"
                                    style={{
                                      width: "150%",
                                      height: "150%",
                                      objectFit: "cover",
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="relative chefContent p-1">
                              <div className="details flex justify-between items-center gap-10">
                                <span className="uppercase text-red-400 font-bold">
                                  {name}
                                </span>
                                <div className="exp flex flex-col flex-wrap justify-center items-center">
                                  <span className="font-semibold text-xs text-gray-400">
                                    {yearofexp} Yrs at
                                  </span>
                                  <span className="font-semibold uppercase text-center text-gray-400 text-sm">
                                    {company}
                                  </span>
                                </div>
                              </div>
                              <hr />
                              <div>
                                {isError ? (
                                  <span className="text-red-500 text-sm font-bold">
                                    please select package
                                  </span>
                                ) : null}
                              </div>
                              <div className="packages">
                                <div className="hourly_cost">
                                  <div>
                                    <input
                                      type="radio"
                                      name="package"
                                      id={`hour${index}`}
                                      onChange={() => {
                                        isHour = true;
                                        isTotal = false;
                                        isClick = true;
                                        isError = false;
                                      }}
                                      value={hourly_rate}
                                    />
                                  </div>
                                  <div className="flex gap-5">
                                    <label
                                      htmlFor={`hour${index}`}
                                      className="text-sm font-semibold text-gray-400"
                                    >
                                      Houly Rate
                                    </label>
                                    <span className="text-sm font-semibold text-green-400">
                                      $ {hourly_rate} /Hr
                                    </span>
                                  </div>
                                </div>
                                <hr />
                                <div className="total">
                                  <div>
                                    <input
                                      type="radio"
                                      name="package"
                                      id={`total${index}`}
                                      onChange={() => {
                                        isTotal = true;
                                        isHour = false;
                                        isClick = true;
                                        isError = false;
                                      }}
                                      value={total_package}
                                    />
                                  </div>
                                  <div className="flex gap-5">
                                    <label
                                      htmlFor={`total${index}`}
                                      className="text-sm font-semibold text-gray-400"
                                    >
                                      Total Rate
                                    </label>
                                    <span className="text-sm font-semibold text-green-400">
                                      $ {total_package} /work
                                    </span>
                                  </div>
                                  <div className="w-44 my-1">
                                    <h1 className="font-bold text-indigo-400 text-md text-center">
                                      Includes{" "}
                                    </h1>
                                    <span>
                                      <ul className="flex mt-1 gap-2 flex-row flex-wrap">
                                        {specifications.map(
                                          (specification, index) => {
                                            return (
                                              <li
                                                key={index}
                                                className="inline-block ml-1 mr-1 text-xs font-semibold text-gray-500"
                                              >
                                                {specification}
                                              </li>
                                            );
                                          }
                                        )}
                                      </ul>
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div
                                key={index}
                                onClick={() => {
                                  if (isClick) {
                                    if (isHour) {
                                      setRate(hourly_rate);
                                      setSelectedChef([item]);
                                      console.log(selectedChef);
                                    } else if (isTotal) {
                                      setRate(total_package);
                                      setSelectedChef([item]);
                                      console.log(selectedChef);
                                    }
                                    setClicked(false);
                                  } else {
                                    alert(
                                      "please select an package to continue"
                                    );
                                  }
                                }}
                                className="cursor-pointer border font-bold text-lg relative bottom-0 bg-green-500 text-white border-black rounded-md flex flex-col justify-center items-center"
                              >
                                Appoint
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="w-full h-96 flex-col flex justify-center items-center">
                        <img
                          src={Infinity}
                          alt="Loding..."
                          style={{
                            width: "80px",
                            height: "80px",
                            objectFit: "cover",
                          }}
                        />
                        <span>Loading ...</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="w-full flex justify-center items-center">
                <div className="w-96 h-fit text-white bg-[rgba(10,9,9,0.64)] relative rounded-lg shadow-inner shadow-black py-3">
                  {selectedChef ? (
                    selectedChef.map((item, index) => {
                      const { name, profile } = item;
                      const { OrganizerName, eventName, startDate, endDate } =
                        orderData;
                      return (
                        <div
                          key={index}
                          className="flex flex-col justify-center items-center"
                        >
                          <h1 className="text-gray-300 inline-block absolute left-2 top-10 font-extrabold text-ld uppercase">
                            Chef
                          </h1>
                          <div className="relative w-[80px] h-[80px] bg-gray-300 shadow-2xl rounded-full overflow-hidden">
                            <img
                              src={profile}
                              alt="profile"
                              style={{
                                width: "150%",
                                height: "150%",
                                objectFit: "cover",
                              }}
                            />
                          </div>
                          <div className="details mt-1 mb-2">
                            <h1 className="text-orange-400 text-md font-bold capitalize">
                              {name}
                            </h1>
                          </div>
                          <hr className="w-full h-[2px] bg-green-400" />
                          <div>
                            <div>
                              <div className="my-2 flex justify-between">
                                <h1 className="mr-2 text-md font-bold text-gray-200">
                                  Event Name :{" "}
                                  <span className="capitalize px-2 text-green-300">
                                    {eventName}
                                  </span>
                                </h1>
                                <h1 className="ml-2 text-md font-bold text-gray-200">
                                  Organizer Name :
                                  <span className="capitalize px-2 text-green-300">
                                    {OrganizerName}
                                  </span>
                                </h1>
                              </div>
                              <h1 className="text-md font-bold text-gray-200">
                                Event Date :From{" "}
                                <span className="capitalize text-sm px-2 text-green-300">
                                  {startDate}
                                </span>{" "}
                                To{" "}
                                <span className="capitalize text-sm px-2 text-green-300">
                                  {endDate}
                                </span>
                              </h1>
                            </div>
                            <div className="m-2 flex justify-center items-center">
                              <button
                                onClick={CheckOut}
                                className="bg-green-400 text-xs font-bold text-gray-50 p-2 rounded-lg"
                              >
                                CHECKOUT
                                <span className="text-lg pl-1">$ {rate}</span>
                                {ischecked && !props.IsLoggedIn ? (
                                  <img
                                    className="relative -top-1 inline-block"
                                    src={Spinner}
                                    alt="spinner"
                                    width="40px"
                                    height="40px"
                                  />
                                ) : null}
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="flex justify-center items-center flex-col w-full h-full">
                      <div className="text-center text-gray-200 font-semibold">
                        Please Fill Out Above all Details to CheckOut Your Order
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;
