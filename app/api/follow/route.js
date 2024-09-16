import User from "@/models/User";
export async function PATCH(request){
    const requestBody=await request.json();
    console.log(requestBody);
    const from=requestBody.from;
    const to=requestBody.to;
    const updateTo=await User.findByIdAndUpdate(to,{$push:{requestBuffer:from}},{new: true, useFindAndModify: false});
    console.log(updateTo);
    // await updateTo.save();
    const updateFrom=await User.findByIdAndUpdate(from,{$push:{pendingRequests:to}},{new: true, useFindAndModify: false});
    return new Response(JSON.stringify({success:true,data:{to:updateTo,from:updateFrom}}),{status:200});
}