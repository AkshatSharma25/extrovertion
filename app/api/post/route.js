import User from "@/models/User";
import Post from "@/models/Post";

export async function POST(request){
    const requestBody=await request.json();
    const {userId,content,imageUrl,likes}=requestBody;
    const createdAt=new Date(); 
    const newPost=new Post({userId,content,imageUrl,createdAt,likes:[...likes]});
    await newPost.save();
    // console.log(newPost);
    const foundUser=await User.findByIdAndUpdate(userId,{$push:{posts:newPost._id}});
    console.log(foundUser);
    // console.log(userId,content,imageUrl,createdAt,likes);
    return new Response("successfully created the post",{status:200});
}