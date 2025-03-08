import React, { useEffect,useState } from "react";
import PostComponent from "./PostComponent";
import axios from "axios";
import PopUp from "./popUp";
const MiddleContainer = (userName) => {
  const [postData, setPostData] = useState([]);
  const load = false;
  useEffect(() => {
    // console.log(userName.userName);
    if (userName.userName == undefined) return;
    // console.log(userName.userName);
    try {
      axios.get(`/api/post/home/${userName.userName}`)
        .then((resposne) => {
          // console.log(resposne.data.data)
          setPostData(resposne.data.data);
      });
    }
    catch (error) {
      console.log(error);
    }
  },[userName])
  return (
    <div className="h-full w-full p-4 pt-0 col-span-3">
      <div className="bg-white h-[87vh] mt-4 rounded-lg overflow-y-auto">
        {postData.map((post) => {
          // {console.log(post.username)}
          return (
            
            <PostComponent postId={post.postId} visitor={userName.userName} key={post.postId} imgUrl={post.ImageUrl} likes={post.Postlike} createdAt={post.createdAt} username={post.username} description={post.description} />
          );
          // <PostComponent imgUrl={post.ImageUrl} likes={post.Postlike} username={post.username}/>
        })}
      </div>
    </div>
  );
};

export default MiddleContainer;
