import express from "express"

const router = express.Router()

app.get("/", (req, res) => {
    res.json(message: "API working");
})