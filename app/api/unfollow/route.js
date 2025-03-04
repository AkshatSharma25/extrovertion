import { connectDB } from "@/database/ConnectToDB";
import { NextResponse } from "next/server";
export async function DELETE(request) {
    try {
        const db = await connectDB();
        const requestBody = await request.json();
        
        const from = requestBody.from;
        const to = requestBody.to;
        
        const checkIfAlreadyFollow = await db.execute(`select * from userrelation where follower="${from}" and username="${to}";`);
        if (checkIfAlreadyFollow[0].length === 0) {
            return new NextResponse(JSON.stringify({ "msg": "Already not following" }));
        }
        const follow = await db.execute(`delete from userrelation  where username="${to}" and follower="${from}";`);
        
        return new NextResponse(JSON.stringify({ "success": true, "msg": "unFollowed" }));
    }
    catch (error) {
        return new NextResponse(JSON.stringify({ "success": false, "msg": "Failed to follow" }),{status:500});
    }
}