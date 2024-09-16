import mongoose from "mongoose";
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      `mongodb+srv://202311005:sharmakshat19@cluster0.gch3l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
    );
    console.log(`MongoDB Connected: {conn.connection.host}`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};
export default connectDB;
