import { connectDB } from "@/database/ConnectToDB";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


async function verifyString(plainText, hashedString) {
    return await bcrypt.compare(plainText, hashedString);
}


export async function POST(request) {
    const secretKey = process.env.SECRET_KEY
    try {
        const db = await connectDB();
        const body = await request.json();
        const { userName, password } = body; 
        const verify = await db.execute(`SELECT * FROM USER WHERE USERNAME="${userName}";`);
        if (verify[0].length === 0) {
            return new NextResponse(JSON.stringify({ success: false, data: "User does not exist" }), { status: 404 });
        }
        const fetchedPassword = verify[0][0].password;
        console.log(fetchedPassword);
        const isMatch = await verifyString(password, fetchedPassword);
        if (!isMatch) { 
            return new NextResponse(JSON.stringify({ success: false, data: "Invalid Password" }), { status: 403 });
        }
        const followers = await db.execute(`SELECT count(follower) as ctr from userrelation where username="${userName}";`);
        const following = await db.execute(`SELECT count(username) as ctr from userrelation where follower="${userName}";`);
        // console.log(followers[0][0].ctr, following[0][0].ctr);
        const token = jwt.sign({ userName: verify[0][0].username, name: verify[0][0].name, description:verify[0][0].description, profileImage: verify[0][0].profileImage}, secretKey, {
            expiresIn: "1h",
        }); 
        return new NextResponse(JSON.stringify({ success: true,token: token }), { status: 200 });
        
    }
    catch (error) {
        console.log(error)
        return new NextResponse(JSON.stringify({ success: false, data: "Internal Server Error" }), { status: 500 });
    }
}