import { connectDB } from "@/database/ConnectToDB";
import { NextResponse } from "next/server";

export async function GET(req,{params}) {
    const db = await connectDB();
    const { username } = params;
    const requests = await db.execute(`select * from requestBuffer where username="${username}"`)
    console.log(requests[0]);
    return new NextResponse(JSON.stringify({ "requests": requests[0] }));
}