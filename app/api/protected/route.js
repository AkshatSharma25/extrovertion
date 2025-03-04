import { NextResponse } from "next/server";
import verifyToken from "../../components/middleware";
export async function GET(req) {
    const user = verifyToken(req);
    // console.log(req);
    // console.log('hhh',user);
    if (!user) {
        return new NextResponse(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }
    return new NextResponse(JSON.stringify({ message: "success", user }));
}