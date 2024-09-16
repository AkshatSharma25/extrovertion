import connectDB from "@/database/ConnectToDB";
import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import User from "@/models/User";
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if(account.provider=='github'){
        connectDB();
        // console.log("connected")
        console.log(account);
        const foundUser=await User.find({email: email});
        console.log(foundUser);
        if(foundUser.length===0){
          const newUser=new User({
            name: user.name,
            username: user.email.split('@')[0],
            email: user.email,
            profile: "/commonAvatar.png",
          });
          await newUser.save();
          // this.session();
          // session.user=newUser;
          console.log("created new user:",newUser);
        }
        else{
          console.log("user already exists")
        }
        return true;
      }
      else{
        return false;
      }
    },
    async session({ session,user }) {
      // ... your code here ...
  
      // Retrieve additional user data from the database
      // console.log(session.user);
      connectDB();
      console.log("i was called")
      const userData = await User.findOne({email: session.user.email});
      // console.log(userData);
      // // Update session.user with the retrieved data
      console.log(userData);
      session.user = {
        ...session.user,
        ...userData
      };
      // console.log(session.user);
      return session;
    },
    
  }
}
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };