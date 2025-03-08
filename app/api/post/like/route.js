import { NextResponse } from "next/server";
import { connectDB } from "@/database/ConnectToDB";
export async function PATCH(req) {
    try {
        const body = await req.json();
        // console.log(body);
        const postId = body.postId;
        const username = body.username;
        const db = await connectDB();
        const isLiked = await db.execute(`select *   from interactions where username="${username}" and postId="${postId}";`)
        console.log(isLiked[0]);
        if (isLiked[0].length === 0) {

            const likes = await db.execute(`update post set Postlike=Postlike+1 where postId="${postId}"`)
            const updateInteraction = await db.execute(`insert into interactions(postId, username,likeCount) values("${postId}","${username}",1)`);
            // console.log(update);
            return new NextResponse(JSON.stringify({ "message": "liked" }));
        }

        return new NextResponse(JSON.stringify({ 'message': "already liked" }));
    }
    catch (error) {
        console.log(error);
        return new NextResponse(JSON.stringify({ error: error.message }), { status: 500 });
    }
}