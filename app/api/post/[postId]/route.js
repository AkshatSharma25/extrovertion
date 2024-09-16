import Post from "@/models/Post";
export async function GET(request,{params}){
    const postId=params.postId;
    const post=await Post.findById(postId);
    return new Response(JSON.stringify(post),{status:200});
}