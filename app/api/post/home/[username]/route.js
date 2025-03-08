import { NextResponse } from "next/server";
import { connectDB } from "@/database/ConnectToDB";
export async function GET(req,{params}) {
    const db=await connectDB();
    const username=params.username;
    const followingData = await db.execute(`select * from userrelation where follower="${username}"`);
    let postData = [];
    for (const element of followingData[0]) {
        // console.log(element);
        const user = element.username;
        if (user !== username) {
            // console.log(user,username)
            const posts=await db.execute(`select * from post where username="${user}"`);
            for (const post of posts[0]) {
                postData = [...postData, post];
            }
        }
    }
    postData.reverse();
    // console.log(postData);
    return new NextResponse(JSON.stringify({ data:postData }));
}