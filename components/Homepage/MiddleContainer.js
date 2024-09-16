import React from "react";
import PostComponent from "./PostComponent";

const MiddleContainer = () => {
  return (
    <div className="h-full w-full p-4 pt-0 col-span-3">
      
      <div className="bg-white h-[87vh] mt-4 rounded-lg overflow-y-auto">
        <PostComponent />
        <PostComponent />
        <PostComponent />
        <PostComponent />
      </div>
    </div>
  );
};

export default MiddleContainer;
