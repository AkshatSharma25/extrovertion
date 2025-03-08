
import { NextResponse } from "next/server";
import { connectDB } from "@/database/ConnectToDB";
export async function DELETE(req, { params }) { 
    try {
        const db = await connectDB();
        // const body = await req.json();
        // const from = body.from;
        // console.log(body);
        const { username ,from} = params;
        // console.log(username, from);
        const updateBuffer = await db.execute(`delete from requestBuffer where username="${username}" and sender="${from}"`);
        // const updateFollower = await db.execute(`insert into userrelation values("${username}","${from}")`)
        return new NextResponse(JSON.stringify({ "message": "following updated!" }));
    }
    catch (error) {
        console.log(error);
        return new NextResponse(JSON.stringify({ "error": error }), { status: 500 });
    }
}