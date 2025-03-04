import jwt from 'jsonwebtoken';

export default function verifyToken(req) {
    const secretKey = process.env.SECRET_KEY;
    const authHeader = req.headers.get("authorization");
    // console.log("verifytoken")
    // console.log(authHeader);
    if (!authHeader || !authHeader.startsWith('Bearer ')) { 
        return null;
    }
    const token = authHeader.split(' ')[1];
    try {
        // console.log(jwt.verify(token, secretKey));
        return jwt.verify(token, secretKey);
    }
    catch (error) {
        return null;
    }
}