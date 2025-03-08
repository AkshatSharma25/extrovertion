"use client"
import axios from "axios";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { toastOptions } from "@/app/components/toast";
const PostComponent = ({ postId, visitor, imgUrl, likes, username, createdAt, description }) => {
  // console.log(username);
  const [like, setLikes] = useState(likes);
  const [popUp, setPopUp] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const handleLike = async () => {
    try {
      console.log('hit')
      const likeStatus = await axios.patch('/api/post/like', {
        username: visitor,
        postId: postId
      })
      console.log(likeStatus.data);
      if (likeStatus.data.message === "liked") {
        setLikes(like + 1)

        toast.success("liked!", toastOptions);
      }
      else {
        toast.success("already liked!", toastOptions);  // if user has already liked the post, unlike it
      }
    }
    catch (error) {
      console.log(error);
      toast.error("Failed to like post", toastOptions);
    }

  }

  const handleComment = async () => {
    try {
      setPopUp(true)
      const comment = await axios.get(`/api/post/comment/${postId}`);
      // console.log(comment.data);
      setComments(comment.data);
    }
    catch (error) {
      console.log(error);
    }
  }
  const makeComment = async () => {
    try {
      // e.preventDefault();
      // console.log(commentText);
      const comment = await axios.post(`/api/post/comment/${postId}`, {
        visitor: visitor,
        commentText: commentText
      })
      // console.log(comment.data);
      setCommentText("");
      toast.success("comment added successfully", toastOptions);
    }
    catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="m-2 flex justify-center items-center">
      <div className=" w-full h-[28vw]">




        <div className={`w-[100vw] ${popUp ? "" : "hidden"} flex justify-center items-center h-[100vh] z-50 top-0 left-0 absolute backdrop-blur-md  transition-all duration-750 ${"hello"}`}>
          <div className="bg-gray-200 w-[50%] h-[80%]  rounded-xl">
            <button onClick={() => setPopUp(false)} type="button" className="absolute right-[25.2%] top-[10.5%]  focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-2 py-2 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 flex justify-center items-center dark:focus:ring-purple-900"><img src="/cross.svg" alt="" /></button>
            {
              <div className="w-[90%] relative m-auto mt-8 rounded-xl p-4 h-[90%] bg-white">
                {
                  comments.map((com) => {
                    return (
                      <div key={com.commentId} className="flex rounded-xl px-8 bg-slate-100 m-2 gap-2 items-center p-2">
                        <div className="text-sm font-bold">{com.username} :</div>
                        <div>{com.content}</div>
                      </div>
                    )
                  })
                }
                <div className="h-12 w-[95%] absolute bottom-4 flex justify-center items-center gap-4">
                  <input type="text" onChange={(e)=>{setCommentText(e.target.value)}} placeholder="make a comment" className="bg-slate-300 active:border-none px-4 w-[90%] h-[90%] rounded-xl" />
                  <button onClick={()=>makeComment()}>
                    <img src="/send.svg" width={25} alt="" />
                  </button>
                </div>
              </div>
            }

          </div>
        </div>





        <div className="flex px-3 m-2 gap-2 items-center bg-gray-50 rounded-md">
          <img src="/profile.svg" width={40} alt="" />
          <div className="text-xl font-bold">{username}</div>
          <div className="text-xs">{createdAt.slice(5, 10) + " , " + createdAt.slice(11, 16)}</div>
        </div>
        <div className="w-full bg-gray-200 h-[0.15px] m-1"></div>
        <div className=" flex justify-center overflow-hidden object-cover m-4 mb-2 mt-0 h-[75%] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
          <img
            src={`/api/images${imgUrl}`}
            className="object-contain"
            alt=""
          />
        </div>
        <div className="w-full bg-gray-200 h-[0.15px] m-1"></div>
        <div className="caption mx-4 px-8 flex gap-8  ">
          <div className="text-2xl">{description}</div>
          <div className="flex justify-center items-center gap-2">
            <button className="" onClick={() => { handleLike() }}>
              <img src="/like.svg" className="invert" alt="" />
            </button>
            {like}
          </div>
          <div className="flex justify-center items-center gap-2">
            <button className="" onClick={() => handleComment()}>
              <img src="/message.svg" className="invert" alt="" />
            </button>
            comments
          </div>

        </div>
      </div>

    </div>
  );
};

export default PostComponent;
