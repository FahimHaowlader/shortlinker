import mongoose from "mongoose";


 const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_CLUSTER}/${process.env.DATABASE_NAME}?retryWrites=true&w=majority&appName=Cluster0`)
        console.log(`MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    }
}

    // const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_CLUSTER}/${process.env.DATABASE_NAME}?retryWrites=true&w=majority&appName=Cluster0`;
   


export default connectDB;
