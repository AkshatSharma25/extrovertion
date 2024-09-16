"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import axios from "axios";
const Profile = () => {
  const [ClickOnPost, setClickOnPost] = useState(false);
  const [popupData, setpopupData] = useState([])
  const { data: session } = useSession();   
  const [name, setname] = useState("Name");
  const [postData, setPostData] = useState([]);
  const [tagline, settagline] = useState("hello");
  const [userName, setuserName] = useState("username");
  const [posts, setPosts] = useState(0);
  const [followers, setfollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [postsExist, setPostsExist] = useState(false);
  const [imgUrl, setimgUrl] = useState(
    "https://w7.pngwing.com/pngs/193/660/png-transparent-computer-icons-woman-avatar-avatar-girl-thumbnail.png"
  );
  const togglePostView=()=>{
    if(!ClickOnPost){
      console.log(popupData)
    }
    setClickOnPost(!ClickOnPost);
  }
  const router = useRouter();
  async function getImages() {
    const response=await axios.get(`http://localhost:3000/api/post/getallpost/${session.user._doc._id}`);
    // console.log(response);
    const data=response.data.data;
    setPostsExist(true);
    setPostData(data);
    // console.log(data);
  }
  useEffect(() => {
    if (!session) {
      router.replace("/login");
    }
    if (session) {
      setname(session.user.name);
      setuserName(session.user.email.split("@")[0]);
      setPosts(session.user._doc.posts.length);
      setfollowers(session.user._doc.followers.length);
      setFollowing(session.user._doc.following.length);
      setimgUrl(session.user._doc.profile);
      settagline(session.user._doc.tagline);
      if(posts>0){
        setPostsExist(true);
      }
      async function fetch() {
        await getImages();
      }
      if(postData.length==0){
        fetch();
      }
    }
    
  }, [session]);
  

  return (
    <>
    <Navbar />
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
                <span className=" text-base flex">
                  <span className="font-bold mr-2">{posts} </span> Posts
                </span>
              </li>
              <li>
                <span className="cursor-pointer  text-base flex ml-5">
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
        
      
    <div className={`w-[100vw] flex justify-center items-center h-[100vh] z-50 top-0 left-0 absolute backdrop-blur-md ${(ClickOnPost)?"":"hidden"} transition-all duration-750`}>
      <div className="bg-gray-200 w-[50%] h-[80%]  rounded-xl">
      <button onClick={()=>{togglePostView()}} type="button" className="absolute right-[25.2%] top-[10.5%]  focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-2 py-2 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"><img src="/cross.svg" alt="" /></button>
        {
          popupData && <div className="bg-white rounded-md overflow-hidden mx-8 mt-16">
              <img src={popupData.imageUrl} alt="" />
          </div>
        }
      </div>
    </div>
      
        
        {
            postsExist && <div className=" w-[100vw] p-2">
              <div className=" bg-gray-100 grid grid-cols-3">
            {postsExist &&  postData.map((data) => {
              return (
                <div onClick={()=>{togglePostView();setpopupData(data) }} className="cursor-pointer relative w-[86%] flex justify-center items-center">
                  {data && data.imageUrl && <img
                    src={data.imageUrl}
                    className="foto w-full h-full object-cover"
                    alt="description"
                  />
                  }
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
