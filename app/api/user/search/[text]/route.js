import User from "@/models/User";
import { NextResponse } from "next/server";
export async function GET(request,{params}){
    const toSearch=params.text;
    // console.log(toSearch);
    const email=await User.find({email:toSearch});
    const username=await User.find({username:toSearch});
    console.log(email);
    console.log(username);
    if(email.length==0){
        return new NextResponse(JSON.stringify({success:true,data:username}),{status:200}) 
    }else{
        return new NextResponse(JSON.stringify({success:true,data:email}),{status:200})
    }
}