"use client"
import React, { useEffect } from "react"
import { useSession, signIn, signOut } from "next-auth/react"

import LeftContainer from "@/components/Homepage/LeftContainer";
import MiddleContainer from "@/components/Homepage/MiddleContainer";
import RightContainer from "@/components/Homepage/RightContainer";
import { useRouter } from 'next/navigation';
import Navbar from "@/components/Navbar";

export default function Home() {
    const { data: session } = useSession();
    const router=useRouter();
    useEffect(()=>{ 
      // console.log(session);
      if (!session) {
        router.replace('/login');
      }
    })
    
  return (
    <>
      <Navbar/>
      <div className="grid grid-cols-5 h-[92vh] overflow-x-hidden overflow-y-hidden">
        
        <LeftContainer />
        <MiddleContainer/>
        <RightContainer />
      </div>
    </>
  );
}
