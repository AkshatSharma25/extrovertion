import { connectDB } from "@/database/ConnectToDB";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
export async function POST(request) {
    const secretKey=process.env.SECRET_KEY;
    try {
        const db = await connectDB();
        const body = await request.json();
        const { userName, fullName, email, password,description,profileImage } = body;    
        const insert = await db.execute(`INSERT INTO USER VALUES("${email}","${fullName}","${userName}","${password}","${description}","${profileImage}");`)
        const token = jwt.sign({ userName:userName,name:fullName,tagline:description,profileImage:profileImage }, secretKey, { expiresIn: "1h" });
        // return new NextResponse(JSON.stringify({ success: true, data: body }), { status: 200 });
        return new NextResponse(JSON.stringify({ success: true, data: token }), { status: 200 });
    }
    catch (error) {
        if (error.sqlMessage.startsWith("Duplicate entry")) { 
            return new NextResponse(JSON.stringify({ success: false, data: "User already exists" }), { status: 400 });
        }
        return new NextResponse(JSON.stringify({ success: false, data: "Internal Server Error" }), { status: 500 });
    }
}