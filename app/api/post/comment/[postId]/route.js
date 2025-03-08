import { connectDB } from "@/database/ConnectToDB";
import { NextResponse } from "next/server";
import { comment } from "postcss";

export async function POST(req,{params}) {
    const postId = params.postId;
    const body = await req.json();
    const db = await connectDB();
    const randomId = Math.floor(100000000000 + Math.random() * 900000000000).toString();
    const commentText = body.commentText;
    const visitor = body.visitor;
    console.log(commentText, visitor)
    const makeComment = await db.execute(`insert into comments(commentID,content,username,postId) values("${randomId}","${commentText}","${visitor}","${postId}");`)
    return new NextResponse(JSON.stringify("hello world"))
}

export async function GET(req,{params}) { 
    // console.log(params);
    const postId = params.postId;
    const db = await connectDB();
    const comments = await db.execute(`select * from comments where postId="${postId}"`);
    return new NextResponse(JSON.stringify(comments[0]));
}