import { connectDB } from "@/database/ConnectToDB";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
export async function POST(request) {
    const secretKey = process.env.SECRET_KEY
    // console.log(secretKey)
    try {
        const db = await connectDB();
        const body = await request.json();
        const { userName, password } = body; 
        // console.log(userName, password);
        const verify = await db.execute(`SELECT * FROM USER WHERE USERNAME="${userName}";`);
        if (verify[0].length === 0) {
            return new NextResponse(JSON.stringify({ success: false, data: "User does not exist" }), { status: 404 });
        }
        // console.log(verify[0][0]);
        const fetchedPassword = verify[0][0].password;
        
        if (fetchedPassword!==password) { 
            return new NextResponse(JSON.stringify({ success: false, data: "Invalid Password" }), { status: 403 });
        }
        const token = jwt.sign({ userName: verify[0][0].username, name: verify[0][0].name, description:verify[0][0].description, profileImage: verify[0][0].profileImage }, secretKey, {
            expiresIn: "1h",
        });
        return new NextResponse(JSON.stringify({ success: true,token: token }), { status: 200 });
        // return new NextResponse(JSON.stringify({ success: true, data: { userName: verify[0][0].username, name: verify[0][0].name, description:verify[0][0].description, profileImage: verify[0][0].profileImage } }), { status: 200 });
    }
    catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify({ success: false, data: "Internal Server Error" }), { status: 500 });
    }
}