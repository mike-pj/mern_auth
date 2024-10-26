import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
// import cookie from "cookie-parser"
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

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal message Error";
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});