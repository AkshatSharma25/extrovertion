"use client"
import React, { useState,useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation";
import axios from "axios";
const LeftContainer = () => {
  const router=useRouter();
  
  const [name, setname] = useState("Name");
  const [userName, setuserName] = useState("username");
  const [posts,setPosts]=useState(0);
  const [followers, setfollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const [imgUrl, setimgUrl]=useState("https://w7.pngwing.com/pngs/193/660/png-transparent-computer-icons-woman-avatar-avatar-girl-thumbnail.png")
  useEffect(()=>{
    
    
  })
  return (
    <div className=" h-full col-span-1 p-4 pr-0">
      <div className="profile bg-white rounded-lg h-[26%] p-4">
        <div className="bg-gray-100 h-full rounded-lg p-2">
          <div className="p-2 flex items-center justify-center mt-1 gap-2">
            <img
              src="/commonAvatar.png"
              alt="profile"
              className="object-cover w-[16%] rounded-full outline outline-white"
            />
            <div className="flex flex-col items-center justify-center ">
              <span className="font-bold text-lg">{userName}</span>
              <span className="text-xs font-thin">{name}</span>
            </div>
          </div>
          <div className="flex mt-4 justify-around text-gray-600">
            <div className="text-center">
              Followers
              <div className="font-bold">{followers}</div>
            </div>
            <div className="text-center">
              Following
              <div className="font-bold">{following}</div>
            </div>
            <div className="text-center">
              Posts
              <div className="font-bold">{posts}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="navigation bg-white rounded-lg h-[42%] mt-4 p-4 gap-2 pl-6 pr-6">
        <button className=" rounded-lg h-12 w-full flex justify-start  p-2 items-center hover:bg-gray-100 font-bold gap-2 ">
          <img src="/home.svg" className="invert" alt="" />
          Home
        </button>
        <button className=" rounded-lg  p-2 h-12 w-full flex gap-2 justify-start items-center hover:bg-gray-100 font-bold mt-2">
          <img src="/message.svg" className="invert" alt="" />
          Messages
        </button>
        <button onClick={()=>{
          
          router.push('/profile');
        }} className=" rounded-lg h-12 w-full flex justify-start items-center hover:bg-gray-100 font-bold mt-2 gap-2 p-2">
          <img src="/profile.svg" className="invert" alt="" />
          Your Profile
        </button>
        <button className=" rounded-lg h-12 w-full flex justify-start items-center hover:bg-gray-100 font-bold mt-2 gap-2 p-2">
          <img src="/setting.svg" className="invert" alt="" />
          Settings
        </button>
        <button className=" rounded-lg h-12 gap-2 p-2 w-full flex justify-start items-center hover:bg-gray-100 font-bold mt-2">
          <img src="/shopping.svg" className="invert" alt="" />
          Marketplace
        </button>
      </div>

      <div className=" rounded-lg h-[26%] mt-4 flex p-2 flex-col items-center flex-wrap gap-2">
        <span>Privacy and Policy</span>
        <span>Advertising</span>
        <span>Cookies</span>
        <span>Contact Us</span>
        <span className="font-semibold">©extrovertion 2024</span>
      </div>
    </div>
  );
};

export default LeftContainer;
