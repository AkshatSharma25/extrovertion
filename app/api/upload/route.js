import {writeFile} from "fs/promises"
import { NextResponse } from "next/server";
export async function POST(req){
    const data=await req.formData();
    const file=data.get('file');
    if(!file){
        return NextResponse.json({"message":"error",success:false})
    }
    // console.log(file);
    const date=new Date();
    const newFileName=`${date.getDate()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}${date.getDate()}${date.getMonth()+1}${date.getFullYear()}`;
    const byteData=await file.arrayBuffer();
    const buffer=Buffer.from(byteData);
    const path = `./public/upload/IMG${newFileName}.${file.name.split('.').pop()}`;
    await writeFile(path,buffer);
    const returnPath=`/upload/IMG${newFileName}.${file.name.split('.').pop()}`;
    console.log(returnPath);
    return NextResponse.json({"message":"success",success:true,"path":returnPath});
}