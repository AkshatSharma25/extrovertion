"use client";
import React, { useState } from "react";
import { createPortal } from "react-dom";
import { useSession } from "next-auth/react";
import axios from "axios";
const RightContainer = () => {
  const [image, setImage] = useState(null);
  const [CreatePost, setCreatePost] = useState(false);
  const [previewImage, setPreviewImage] = useState();
  const [PostCaption, setPostCaption] = useState("This is Extrovertion");
  const session=useSession();
  const addCaption = (event) => {
    setPostCaption(event.target.value);
    // console.log(PostCaption);
  };
  const handleSubmit = async () => {
    if (image) {
      const formData = new FormData();
      formData.append("file", image);
      try {
        const response = await axios.post("/api/upload", formData);
        // console.log(response.data);
        
        // console.log(session.data.user._doc);
        const userId=session.data.user._doc._id;
        const imageUrl=response.data.path;
        const requestObject={
          userId:userId,
          imageUrl:imageUrl,
          content: PostCaption,
          likes: []
        }
        const response2= await axios.post("/api/post",requestObject);
        console.log(response2);
        setImage(null);
        setPreviewImage();
        setPostCaption("This is Extrovertion!");
        setCreatePost(false);
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    }
  };
  const handleCancelButton = () => {
    setImage(null);
    setPreviewImage();
    setPostCaption("hey there!");
    setCreatePost(false);
  };
  const handleFileInput = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile.type.startsWith("image")) {
      setImage(selectedFile);
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
    }
  };
  return (
    <div className={`h-full w-full  col-span-1 p-4 pl-0 `}>
      <div
        className={`w-[100vw] h-[100vh] z-50 left-0 top-0 backdrop-blur-md  absolute flex justify-center items-center ${
          CreatePost ? "" : "hidden"
        } transition ease-in-out delay-500`}
      >
        <div className="w-[60vw]  h-[80vh] absolute bg-gray-200 rounded-3xl flex justify-center items-center flex-col">
          <button
            onClick={() => {
              setCreatePost(!CreatePost);
              handleCancelButton();
            }}
            className=" focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm w-8 h-8 dark:bg-purple-600 flex items-center justify-center dark:hover:bg-purple-700 dark:focus:ring-purple-900 m-2 right-0 top-0 absolute z-50"
          >
            <img src="/cross.svg" className="" alt="" />
          </button>
          <div className="absolute top-0 h-12 w-full text-center bg-gray-300 flex justify-center rounded-t-3xl items-center border-b-black">
            Create Post
          </div>

          {!previewImage && (
            
            <div className="flex items-center flex-col justify-center w-full ">
              <div className="m-2 text-gray-400">
                *upload square image for best fitting
              </div>
              <label className="flex flex-col items-center justify-center w-96 h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 ">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <img
                    src="/image.svg"
                    className="w-24 invert rotate-6"
                    alt=""
                  />
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF{" "}
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  placeholder=""
                  onChange={(e) => {
                    handleFileInput(e);
                  }}
                />
              </label>
            </div>
          )}
          {previewImage && (
            <div className="flex justify-center items-center flex-col m-2 gap-2 w-[30vw] ">
              <div className=" inset-0 z-10  bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] w-full h-[40vh] overflow-hidden rounded-lg flex justify-center object-cover items-center">
                <img className="" src={previewImage} alt="hello world" />
              </div>
              <div className="w-[28vw] flex justify-center">
                <div className="relative w-[80%] min-w-[200px] h-10">
                  <input
                    className=" peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                    placeholder=" "
                    onChange={addCaption}
                  />
                  <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                    Add a Caption
                  </label>
                </div>
              </div>
              <div className="flex gap-4 w-full justify-center">
                <button
                  className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm w-[35%] mt-2 h-8 dark:bg-purple-600 flex items-center justify-center dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  Create Post
                </button>
                <button
                  onClick={() => {
                    handleCancelButton();
                  }}
                  className="focus:outline-none text-black bg-white hover:bg-red-200 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm w-[35%] mt-2 h-8  flex items-center justify-center dark:hover:bg-red-200 dark:focus:ring-red-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="profile bg-white rounded-lg h-[18%] p-2">
        <div className="">
          <div className="w-full bg-gray-100 h-16 p-2 rounded-lg mb-2 flex justify-center items-center text-center">
            <div>Share your thoughts.</div>
          </div>

          {/* IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII */}
          <button
            type="button"
            onClick={() => {
              setCreatePost(!CreatePost);
            }}
            className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 w-full text-center me-2 mb-2"
          >
            Create a Post
          </button>
        </div>
      </div>
      <div className="h-[5%] pb-1 bg-white rounded-t-lg">
        <h2 className="text-center mb-2 font-bold mt-2 relative">
          Friend Requests
        </h2>
      </div>
      <div className="navigation bg-white rounded-b-lg h-[38%]  overflow-auto pb-2">
        <div className="p-2  flex flex-col gap-2 overflow-auto">
          <div className="flex items-center justify-center gap-4 bg-gray-100 rounded-md w-full h-12 overflow-hidden">
            <img src="/profile.svg" className="invert" alt="" />
            Friend Name
            <div className="flex gap-2">
              <button
                type="button"
                className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm w-8 h-8 dark:bg-purple-600 flex items-center justify-center dark:hover:bg-purple-700 dark:focus:ring-purple-900"
              >
                <img src="/yes.svg" className="" alt="" />
              </button>
              <button
                type="button"
                className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm w-8 h-8 dark:bg-purple-600 flex items-center justify-center dark:hover:bg-purple-700 dark:focus:ring-purple-900"
              >
                <img src="/cross.svg" className="" alt="" />
              </button>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 bg-gray-100 rounded-md w-full h-12">
            <img src="/profile.svg" className="invert" alt="" />
            Friend Name
            <div className="flex gap-2">
              <button
                type="button"
                className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm w-8 h-8 dark:bg-purple-600 flex items-center justify-center dark:hover:bg-purple-700 dark:focus:ring-purple-900"
              >
                <img src="/yes.svg" className="" alt="" />
              </button>
              <button
                type="button"
                className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm w-8 h-8 dark:bg-purple-600 flex items-center justify-center dark:hover:bg-purple-700 dark:focus:ring-purple-900"
              >
                <img src="/cross.svg" className="" alt="" />
              </button>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 bg-gray-100 rounded-md w-full h-12">
            <img src="/profile.svg" className="invert" alt="" />
            Friend Name
            <div className="flex gap-2">
              <button
                type="button"
                className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm w-8 h-8 dark:bg-purple-600 flex items-center justify-center dark:hover:bg-purple-700 dark:focus:ring-purple-900"
              >
                <img src="/yes.svg" className="" alt="" />
              </button>
              <button
                type="button"
                className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm w-8 h-8 dark:bg-purple-600 flex items-center justify-center dark:hover:bg-purple-700 dark:focus:ring-purple-900"
              >
                <img src="/cross.svg" className="" alt="" />
              </button>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 bg-gray-100 rounded-md w-full h-12">
            <img src="/profile.svg" className="invert" alt="" />
            Friend Name
            <div className="flex gap-2">
              <button
                type="button"
                className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm w-8 h-8 dark:bg-purple-600 flex items-center justify-center dark:hover:bg-purple-700 dark:focus:ring-purple-900"
              >
                <img src="/yes.svg" className="" alt="" />
              </button>
              <button
                type="button"
                className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm w-8 h-8 dark:bg-purple-600 flex items-center justify-center dark:hover:bg-purple-700 dark:focus:ring-purple-900"
              >
                <img src="/cross.svg" className="" alt="" />
              </button>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 bg-gray-100 rounded-md w-full h-12">
            <img src="/profile.svg" className="invert" alt="" />
            Friend Name
            <div className="flex gap-2">
              <button
                type="button"
                className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm w-8 h-8 dark:bg-purple-600 flex items-center justify-center dark:hover:bg-purple-700 dark:focus:ring-purple-900"
              >
                <img src="/yes.svg" className="" alt="" />
              </button>
              <button
                type="button"
                className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm w-8 h-8 dark:bg-purple-600 flex items-center justify-center dark:hover:bg-purple-700 dark:focus:ring-purple-900"
              >
                <img src="/cross.svg" className="" alt="" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg h-[34 %] mt-4 p-2">
        <div className="w-full text-center text-xl font-bold">Events</div>
        <div className="w-full bg-gray-300 h-[0.25%]"></div>
        <div className="flex flex-col items-center justify-center m-2">
          <div className="flex gap-4 m-2">
            <div>
              <img src="/calender.svg" className="invert" alt="" />
            </div>
            11 September
            <div className="font-bold">someEvent</div>
          </div>
          <div className="flex gap-4 m-2">
            <div>
              <img src="/calender.svg" className="invert" alt="" />
            </div>
            11 September
            <div className="font-bold">someEvent</div>
          </div>
          <div className="flex gap-4 m-2">
            <div>
              <img src="/calender.svg" className="invert" alt="" />
            </div>
            11 September
            <div className="font-bold">someEvent</div>
          </div>
          <div className="flex gap-4 m-2">
            <div>
              <img src="/calender.svg" className="invert" alt="" />
            </div>
            11 September
            <div className="font-bold">someEvent</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightContainer;
