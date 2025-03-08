import { connectDB } from "@/database/ConnectToDB";
import { NextResponse } from "next/server";
export async function PATCH(request) {
    try {
        const db = await connectDB();
        const requestBody = await request.json();
        
        const from = requestBody.from.userName;
        const to = requestBody.to;
        // console.log(from,to)
        // console.log("hello")
        const checkIfAlreadyFollow = await db.execute(`select * from userrelation where follower="${from}" and username="${to}";`);
        if (checkIfAlreadyFollow[0].length > 0) {
            return new NextResponse(JSON.stringify({ "msg": "Already following" }));
        }
        const follow = await db.execute(`insert into requestBuffer values("${to}","${from}");`);
        return new NextResponse(JSON.stringify({ "success": true, "msg": "Followed" }));
    }
    catch (error) {
        return new NextResponse(JSON.stringify({ "success": false, "msg": "Failed to follow" }),{status:500});
    }
}