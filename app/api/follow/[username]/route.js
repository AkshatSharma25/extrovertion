import { connectDB } from "@/database/ConnectToDB";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    const db = await connectDB();
    const { username } = params;
    const followerCount = await db.execute(`SELECT count(follower) as ctr from userrelation where username="${username}";`);
    const followingCount = await db.execute(`SELECT count(username) as ctr from userrelation where follower="${username}";`);
    // console.log(followerCount[0][0].ctr,followingCount[0][0].ctr);
    return new NextResponse(JSON.stringify({ "followerCount": followerCount[0][0].ctr, "followingCount": followingCount[0][0].ctr }));
}

export async function PATCH(req, { params }) {
    try {
        const db = await connectDB();
        const body = await req.json();
        const from = body.from;
        const { username } = params;
        const updateBuffer = await db.execute(`delete from requestBuffer where username="${username}" and sender="${from}"`);
        const updateFollower = await db.execute(`insert into userrelation values("${username}","${from}")`)
        return new NextResponse(JSON.stringify({ "message": "following updated!" }));
    }
    catch (error) {
        console.log(error.message);
        return new NextResponse(JSON.stringify({ "error": error }), { status: 500 });
    }
}

