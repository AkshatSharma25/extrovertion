import { NextResponse } from "next/server";
import { connectDB } from "@/database/ConnectToDB";

export async function GET(req,{params}) {
    const { username, from } = params;
    const db = await connectDB();
    try {
        const check = await db.execute(`select * from userrelation where username="${username}" and follower="${from}"`);
        // console.log(check[0]);
        if (check[0].length === 0) {
            return new NextResponse(JSON.stringify({"message":"non follower"}),{status:401})
        }
        return new NextResponse(JSON.stringify({"message":"success"}));
    }
    catch (error) {
        console.log(error.message);
    }
}