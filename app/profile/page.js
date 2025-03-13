"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import axios from "axios";
import { set } from "mongoose";
const Profile = () => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const router = useRouter();
  const load = true;
  const [ClickOnPost, setClickOnPost] = useState(false);
  const [popupData, setpopupData] = useState([]);
  const [name, setname] = useState("Name");
  const [postData, setPostData] = useState([]);
  const [tagline, settagline] = useState("hello");
  const [userName, setuserName] = useState("username");
  const [posts, setPosts] = useState();
  // let posts = [];
  const [followers, setfollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [postsExist, setPostsExist] = useState(false);
  const [imgUrl, setimgUrl] = useState(
    "https://w7.pngwing.com/pngs/193/660/png-transparent-computer-icons-woman-avatar-avatar-girl-thumbnail.png"
  );
  async function getImages(userName) {
    console.log(userName);
    const response = await axios.get(`/api/post/getallpost/${userName}`);
    console.log(response.data.data[0]);
    setPostData(response.data.data[0])
    const followData = await axios.get(`/api/follow/${userName}`);
    setfollowers(followData.data.followerCount);
    setFollowing(followData.data.followingCount);
    console.log(followData.data);
    // console.log(response.data.data[0].length);
    if (response.data.data[0].length === 0) {
      setPostsExist(false);

    }
    else {

      setPostsExist(true);
    }
  }
  useEffect(() => {

    const token = localStorage.getItem('token');
    if (!token) {
      router.replace('/login');
      return;
    }
    axios.get("/api/protected", {
      headers: { Authorization: `Bearer ${token}` },
    }).then((response) => {
      const user = sessionStorage.getItem('user');
      setname(response.data.user.name);
      setuserName(response.data.user.userName);
      settagline(response.data.user.description);
      setimgUrl(response.data.user.profileImage);
      getImages(response.data.user.userName);


    }).catch((error) => {
      console.log(error);
      localStorage.removeItem('token');
      router.replace('/login');
      return;
    });
  }, [load]);


  const togglePostView = () => {
    if (!ClickOnPost) {
      console.log(popupData)
    }
    setClickOnPost(!ClickOnPost);
  }

  // useEffect(() => {
  // }, []);


  return (
    <>
      <Navbar userName={userName} />
      <div className="bg-gray-100">
        <div className="flex justify-center items-center pb-10 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
          <img
            src={imgUrl}
            className="h-40 w-40 rounded-full object-cover"
            alt="username"
          />
          <div className="ml-10">
            <div className="flex items-center">
              <h2 className="block leading-relaxed font-light text-gray-700 text-3xl">
                {userName}
              </h2>

              <Link
                href={"/"}
                className="cursor-pointer ml-2 p-1 border-transparent text-gray-700 rounded-full hover:text-blue-600 focus:outline-none focus:text-gray-600"
                aria-label="Notifications"
              >
                <img src="/pencil.svg" className="invert" alt="" />
              </Link>
            </div>
            <div className="mb-1">
              <h1 className="text-base font-bold ">{name}</h1>
            </div>
            <div className="mb-1">
              <h1 className="text-base ">{tagline}</h1>
            </div>
            <ul className="flex justify-content-around items-center">
              
              <li>
                <span className="text-base flex ">
                  <span className="font-bold mr-2">{followers} </span> Followers
                </span>
              </li>
              <li>
                <span className="cursor-pointer  text-base flex ml-5">
                  <span className="font-bold mr-2">{following} </span> followed
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-b border-gray-300"></div>
        <div className="flex items-center  justify-start pl-8 font-bold text-2xl">
          posts{" "}
          <img src="/arrowForward.svg" className="invert font-bold" alt="" />
        </div>


        <div className={`w-[100vw] flex justify-center items-center h-[100vh] z-50 top-0 left-0 absolute backdrop-blur-md ${(ClickOnPost) ? "" : "hidden"} transition-all duration-750`}>
          <div className="bg-gray-200 w-[50%] h-[80%]  rounded-xl">
            <button onClick={() => { togglePostView() }} type="button" className="absolute right-[25.2%] top-[10.5%]  focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-2 py-2 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"><img src="/cross.svg" alt="" /></button>
            {
              popupData && <div className="bg-white rounded-md overflow-hidden flex flex-col justify-center items-center pt-4 mx-8 mt-16">
                <img src={`/api/images/${popupData.ImageUrl}`} className="w-[60%]" alt="" />
                <div>
                  {console.log(`/api/images${popupData.ImageUrl}`)}
                  <h1 className="text-center">{popupData.description}</h1>
                </div>
                <div className="flex justify-center gap-8 items-center p-2">
                  <p>{popupData.Postlike} likes</p>
                  <p>
                    Posted at {`${popupData.createdAt !== undefined ? popupData.createdAt.slice(5, 10) : "loading"}`}
                  </p>
                </div>
              </div>
            }
          </div>
        </div>


        {
          postsExist && <div className=" w-[100vw] p-2">
            <div className=" bg-gray-100 grid grid-cols-3">
              {postsExist && postData.map((data) => {
                return (
                  <div onClick={() => { togglePostView(); setpopupData(data) }} className="cursor-pointer relative w-[86%] flex justify-center items-center">
                    {data && data.ImageUrl && <img
                      src={`/api/images${data.ImageUrl}`}
                      className="foto w-full h-full object-cover"
                      alt="description"
                    />
                    }
                    {/* {console.log(data)} */}
                  </div>
                );
              })}

            </div>
          </div>
        }
        {
          !postsExist && <div className="w-full text-center">
            No posts yet...
          </div>
        }
      </div>
    </>
  );
};

export default Profile;
