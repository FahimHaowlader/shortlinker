import app from "./app.js";
import mongoose from "mongoose";
import connectDB from "./db.js";
import router from "./route.js"; // your route.js with /api/v1 endpoints


connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})




