import express from "express"
import { test } from "../contollers/userController.js"

const router = express.Router()

router.get("/", test)

export default router;