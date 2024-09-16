import React from "react";

const PostComponent = () => {
  return (
    <div className="m-2 flex justify-center items-center">
      <div className=" w-full h-[28vw]">
        <div className="flex px-3 m-2 gap-2 items-center bg-gray-50 rounded-md">
          <img src="/profile.svg" width={40} alt="" />
          <div className="text-xl font-bold">UserName</div>
          <div className="text-xs">time and Date</div>
        </div>
        <div className="w-full bg-gray-200 h-[0.15px] m-1"></div>
        <div className=" flex justify-center overflow-hidden object-cover m-4 mb-2 mt-0 h-[75%] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
          <img
            src="https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp"
            className="object-contain"
            alt=""
          />
        </div>
        <div className="w-full bg-gray-200 h-[0.15px] m-1"></div>
        <div className="caption mx-4 px-8 flex gap-8  ">
          <div className="text-2xl">Title</div>
          <div className="flex justify-center items-center gap-2">
            <button className="">
              <img src="/like.svg" className="invert" alt="" />
            </button>
            3 likes
          </div>
          <div className="flex justify-center items-center gap-2">
            <button className="">
              <img src="/message.svg" className="invert" alt="" />
            </button>
            4 comments
          </div>
          <div className="flex justify-center items-center gap-2">
            <button className="">
              <img src="/share.svg" className="invert" alt="" />
            </button>
            5 shares
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostComponent;
