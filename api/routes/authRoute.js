import express from "express"
import { signup } from "../contollers/authController.js";

const router = express.Router()

router.post("/signup", signup)

export default router;