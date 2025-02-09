import mongoose from "mongoose"


export const connectDB = async () => {
    try{
        const db = await mongoose.connect(process.env.MONGO_URI as string);

        console.log(`MongoDB connected: ${db.connection.host}`);
      } catch (error) {
        console.error(`Error: ${(error as Error).message}`);
        process.exit(1);
      }
    
}