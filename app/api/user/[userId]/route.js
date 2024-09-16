import User from "@/models/User";
export async function GET(request,{params}){
    const userId=params.userId;
    const user=await User.findById(userId);
    return new Response(JSON.stringify(user),{status:200});
}