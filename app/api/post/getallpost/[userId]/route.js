import { NextResponse } from "next/server";
import User from "@/models/User";
import Post from "@/models/Post";
export async function GET(request,{params}){
    const {userId}=params;
    const user=await User.findById(userId);
    if(!user){
        return NextResponse.json({"message":"user not found",success:false});
    }
    // console.log(user.posts);
    let object=[];
    for (const postId of user.posts) {
        const foundPost = await Post.findById(postId);
        if (foundPost) {
            object.push(foundPost);
        }
    }
    console.log(object);
    return NextResponse.json({success:true,data:object});
}   