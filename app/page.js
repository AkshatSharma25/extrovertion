"use client"
import React, { useEffect,useState } from "react"
import axios from "axios";
import LeftContainer from "@/components/Homepage/LeftContainer";
import MiddleContainer from "@/components/Homepage/MiddleContainer";
import RightContainer from "@/components/Homepage/RightContainer";
import { useRouter } from 'next/navigation';
import Navbar from "@/components/Navbar";
import { ToastContainer } from "react-toastify";

export default function Home() {
  const router = useRouter();
  const [name, setname] = useState("Name");
  const [tagline, settagline] = useState("hello");
  const [userName, setuserName] = useState("username");
  const [follower, setfollower] = useState(0);
  const [following, setfollowing] = useState(0);
  const [imgUrl, setimgUrl] = useState(
      "https://w7.pngwing.com/pngs/193/660/png-transparent-computer-icons-woman-avatar-avatar-girl-thumbnail.png"
    );
  const load = true;
  useEffect(() => {
    try {
      const token = localStorage.getItem('token');
    if (!token) { 
      router.replace('/login');
      return;
    }
    axios.get("/api/protected", {
      headers: { Authorization: `Bearer ${token}` },
    }).then((response) => {
      setname(response.data.user.name);
      setuserName(response.data.user.userName);
      settagline(response.data.user.description);
      setimgUrl(response.data.user.profileImage);
      axios.get(`/api/follow/${response.data.user.userName}`).then((res) => {
        // console.log(res.data);
        setfollower(res.data.followerCount);
        setfollowing(res.data.followingCount);
      });
      sessionStorage.setItem('user', response.data.user.userName);
      
      
    }).catch((error) => { 
      localStorage.removeItem('token');
      router.replace('/login');
      return;
     });
    }
    catch(error) {
      console.log(error);
    }
  }, [load]);

  return (
    <>
      <div className="w-full">
        
        <Navbar userName={userName} />
      </div>
      <div className="grid grid-cols-5 h-[92vh] overflow-x-hidden overflow-y-hidden">

        <div className="flex w-[100vw]">

          <div className=" sm:hidden md:hidden lg:block w-[20vw]">
          
            <LeftContainer userName={userName} name={name} imgUrl={imgUrl} followerCount={follower} followingCount={following} />
          </div>
          <div className="sm:w-[100vw] lg:w-[60vw]">

            <MiddleContainer userName={userName} />
          </div>
          <div className="sm:hidden md:hidden lg:block">
            <RightContainer username={userName} />

          </div>
        </div>
        <ToastContainer/>
      </div>
    </>
  );
}
