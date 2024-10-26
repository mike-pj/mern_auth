import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import authRoutes from "./routes/authRoute.js"
import userRoutes from "./routes/userRoute.js"

mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("Database connected to MongoDb");
})
.catch((err) => {
    console.log(err)
})

const app = express();

app.use(express.json())


const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server listening on ${port}`);
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);