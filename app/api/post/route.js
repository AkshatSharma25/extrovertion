import { connectDB } from '@/database/ConnectToDB';
import { NextResponse } from 'next/server';
export async function POST(request) {
    const db = await connectDB();
    const requestBody = await request.json();
    const randomId = Math.floor(100000000000 + Math.random() * 900000000000).toString();
    
    
    const { userName, description, imageUrl } = requestBody;
    // console.log(userName.username, description, imageUrl);
    let now = new Date();
    now= now.toISOString().slice(0, 19).replace('T', ' ');
    const dbResponse=await db.execute(`insert into post values ("${randomId}",111,"${userName.username}","${imageUrl}","${now}",0,"${description}");`);
    console.log(dbResponse);
    return new NextResponse(JSON.stringify({success:true,data:dbResponse[1]}),{status:201});
}