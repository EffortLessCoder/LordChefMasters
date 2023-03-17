import React, { useEffect, useState } from "react";
import axios from "axios";
import "./profile.css";
import Loader from "../../../assets/Loader.svg";
import Spinner from "../../../assets/Spinner.svg";

function Profile(props) {
  //actions
  const [isView, setView] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [isOrders, setOrders] = useState(false);
  const [isWorks, setWorks] = useState(false);
  /**end actions */

  const [isTabs, setTabs] = useState(false);
  const [profileData, setProfileData] = useState("");
  const [Name, setName] = useState("");
  const [chefDetails, setChefDetails] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const [Jobs, setJobs] = useState([]);
  const [ordersBooked, setOrdersBooked] = useState([]);
  const { category, id, logout } = props;
  useEffect(() => {
    axios
      .get(`http://localhost:3000/${category}/${id}`)
      .then((result) => {
        if (category == "chef") {
          const { profile, name } = result.data[0];
          setProfileData(profile);
          setName(name);
          setChefDetails([result.data[0]]);
        } else {
          const { profile, name } = result.data;
          setProfileData(profile);
          setName(name);
          setUserDetails([result.data]);
        }
      })
      .then(() => {
        console.log(userDetails);
        console.log(ordersBooked);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //Getting Order Values
  const GetOrders = () => {
    axios
      .get(`http://localhost:3000/work/search?userid=${id}`)
      .then((result) => {
        setOrdersBooked([result.data]);
        console.log(ordersBooked);
      });
  };
  //Getting Jobs
  const GetJobs = () => {
    axios
      .get(`http://localhost:3000/work/search?chefid=${id}`)
      .then((result) => {
        setJobs([result.data]);
      });
  };
  //container set
  function containerSet() {
    if (isView) {
      return (
        <div>
          {category == "user" ? <div>user view</div> : <div>Chef view</div>}
        </div>
      );
    } else if (isEdit) {
      return <div>edit</div>;
    } else if (isOrders) {
      return (
        <div>
          {ordersBooked.map((order, index) => {
            const {
              eventName,
              eventOrganizer,
              paid,
              chefId,
              startDate,
              endDate,
            } = order;
            return (
              <div>
                {
                  <div>
                    <span>{eventName}</span>
                    <span>{eventOrganizer}</span>
                    <span>{paid}</span>
                    <span>{chefId}</span>
                    <span>{startDate}</span>
                    <span>{endDate}</span>
                  </div>
                }
              </div>
            );
          })}
        </div>
      );
    } else if (isWorks) {
      return <div>Works</div>;
    }
  }
  return (
    <React.Fragment>
      <div className="container">
        <div className="wrapper cursor-pointer">
          <div
            onClick={() => {
              setTabs(!isTabs);
              if (!isTabs) {
                setEdit(false);
                setView(false);
                setOrders(false);
                setWorks(false);
              }
            }}
            className="overflow-hidden flex justify-center items-center rounded-full w-24 h-24"
            style={{
              backgroundImage: isTabs ? `url(${Loader})` : "",
              backgroundSize: "cover",
            }}
          >
            <img
              src={profileData ? profileData : Spinner}
              alt="profile"
              className="profile w-14 h-14 object-cover rounded-full border-2 border-white hover:border-green-700"
            />
          </div>
          {isTabs ? (
            !isEdit && !isView && !isOrders && !isWorks ? (
              <div className="tabs absolute right-5 w-44 p-1 h-44 text-black grid grid-rows-4 border border-[#333] rounded-md shadow-2xl">
                <div
                  onClick={() => {
                    setView(true);
                  }}
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-emoji-heart-eyes-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zM4.756 4.566c.763-1.424 4.02-.12.952 3.434-4.496-1.596-2.35-4.298-.952-3.434zm6.559 5.448a.5.5 0 0 1 .548.736A4.498 4.498 0 0 1 7.965 13a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .548-.736h.005l.017.005.067.015.252.055c.215.046.515.108.857.169.693.124 1.522.242 2.152.242.63 0 1.46-.118 2.152-.242a26.58 26.58 0 0 0 1.109-.224l.067-.015.017-.004.005-.002zm-.07-5.448c1.397-.864 3.543 1.838-.953 3.434-3.067-3.554.19-4.858.952-3.434z" />
                    </svg>
                    view profile
                  </span>
                </div>
                <div
                  onClick={() => {
                    setEdit(true);
                  }}
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-pencil-square"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                      <path
                        fill-rule="evenodd"
                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                      />
                    </svg>
                    edit profile
                  </span>
                </div>
                {category == "user" ? (
                  <div
                    onClick={() => {
                      GetOrders();
                      setOrders(true);
                    }}
                  >
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-bag-check-fill"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5v-.5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0zm-.646 5.354a.5.5 0 0 0-.708-.708L7.5 10.793 6.354 9.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"
                        />
                      </svg>
                      Your orders
                    </span>
                  </div>
                ) : null}
                {category == "chef" ? (
                  <div
                    onClick={() => {
                      GetJobs();
                      setWorks(true);
                    }}
                  >
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-calendar-heart-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5ZM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2ZM8 7.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z" />
                      </svg>
                      Your jobs
                    </span>
                  </div>
                ) : null}
                <div
                  style={{ border: "none" }}
                  onClick={() => {
                    logout(false);
                  }}
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-box-arrow-right"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                      />
                    </svg>
                    logout
                  </span>
                </div>
              </div>
            ) : (
              <div className="cursor-default tab absolute right-5 w-44 p-1 h-44 text-black grid grid-rows-4 border border-[#333] rounded-md shadow-2xl">
                {isView || isEdit || isOrders || isWorks ? (
                  <div>
                    <button
                      className="cursor-pointer"
                      onClick={() => {
                        setView(false);
                        setEdit(false);
                        setOrders(false);
                        setWorks(false);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-caret-left"
                        viewBox="0 0 16 16"
                      >
                        <path d="M10 12.796V3.204L4.519 8 10 12.796zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z" />
                      </svg>
                    </button>
                    <div>{containerSet()}</div>
                  </div>
                ) : null}
              </div>
            )
          ) : null}
        </div>
      </div>
    </React.Fragment>
  );
}

export default Profile;
