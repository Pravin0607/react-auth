import mongoose from "mongoose";

const ConnectDb=async()=>{
    try
    {
        mongoose.connect(process.env.MONGODB_URI as string);
        console.log("successfully connected to Database");
    }
    catch(err)
    {
        console.log("failed to connect Database");
        throw Error("Failed to Connect to Database.");
    }
}

export default ConnectDb;