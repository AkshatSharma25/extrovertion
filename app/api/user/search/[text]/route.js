import { connectDB } from "@/database/ConnectToDB";
import { NextResponse } from "next/server";
export async function GET(request, { params }) {
    const db = await connectDB();
    const toSearch = params.text;
    console.log(toSearch)
    const name = await db.execute(`select * from user where name="${toSearch}";`);
    const username=await db.execute(`select * from user where username="${toSearch}";`);
    console.log(name[0]);
    console.log(username[0]);
    if(name[0].length==0){
        return new NextResponse(JSON.stringify({success:true,data:username[0]}),{status:200}) 
    }else{
        return new NextResponse(JSON.stringify({success:true,data:name[0]}),{status:200})
    }
}