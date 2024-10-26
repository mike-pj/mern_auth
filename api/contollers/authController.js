import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"
import { signinValidation, signupValidation } from "../middlewares/validationForms.js";
import { errorHandler } from "../utils/error.js";
import dotenv from 'dotenv'
dotenv.config()

export const signup = async (req, res, next) => {
  try {
    const { error } = signupValidation(req.body)
    if(error) {
        return res
        .status(400)
        .json({ message: error.details[0].message, success: false});
    }

    const { username, email, password } = req.body;
    const checkEmail = await User.findOne({ email: email });
    if (checkEmail) {
      return next(errorHandler(400, "Email already exist"));
    }

    const hashedPassword = bcryptjs.hashSync(password, 10)

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
    try {
        const { error } = signinValidation(req.body)
        if(error) {
            return res
            .status(400)
            .json({ message: error.details[0].message, success: false })
        }

        const { email, password } = req.body;
        const validUser = await User.findOne({ email })
        if(!validUser) {
            return next(errorHandler(404, "User not found"));
        }

        const validPassword = bcryptjs.compareSync( password, validUser.password )
        if(!validPassword) {
            return next(errorHandler(401, "Wrong Credentials"));
        }

        const token = jwt.sign( { id: validUser._id }, process.env.JWT_SECRET)
        const { password: hashedPassword, ...rest } = validUser._doc
        const expiryDate = new Date( Date.now() + 36000000)// 1 hour

        res
        .cookie("access_token", token, {
            httpOnly: true,
            sameSite: "strict",
            expires: expiryDate
        })
        .status(201)
        .json({rest, message: "User logged in successfully"})

    } catch (error) {
        next(error)
    }
}
