import { connectDB } from "@/database/ConnectToDB";
export async function GET(request, { params }) {
    const db = await connectDB();
    const username=params.username;
    const data = await db.execute(`select * from user where username="${username}"`);
    console.log(data[0][0]);
    return new Response(JSON.stringify(data[0][0]),{status:200});
}