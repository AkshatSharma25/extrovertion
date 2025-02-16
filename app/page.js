"use client"
import React, { useEffect } from "react"
import { useSession, signIn, signOut } from "next-auth/react"

import LeftContainer from "@/components/Homepage/LeftContainer";
import MiddleContainer from "@/components/Homepage/MiddleContainer";
import RightContainer from "@/components/Homepage/RightContainer";
import { useRouter } from 'next/navigation';
import Navbar from "@/components/Navbar";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
  })

  return (
    <>
      <div className="w-full">
        
      <Navbar />
      </div>
      <div className="grid grid-cols-5 h-[92vh] overflow-x-hidden overflow-y-hidden">

        <div className="flex w-[100vw]">

          <div className=" sm:hidden md:hidden lg:block w-[20vw]">

            <LeftContainer />
          </div>
          <div className="sm:w-[100vw] lg:w-[60vw]">

            <MiddleContainer />
          </div>
          <div className="sm:hidden md:hidden lg:block">
            <RightContainer />

          </div>
        </div>
      </div>
    </>
  );
}
