import { connectDB } from "@/database/ConnectToDB";
import { NextResponse } from "next/server";
export async function GET(request, { params }) {
    const db = await connectDB();
    // console.log(params);
    const userName  = params.username;
    // console.log(userName);
    // let postsData = [];
    const posts = await db.execute(`SELECT * from post where username="${userName}" order by createdAt;`)

    // const followerCount=await db.execute(`SELECT count(follower) as ctr from userrelation where username="${userName}";`);
    // console.log(posts,followerCount);
    return NextResponse.json({success:true,data:posts});
}