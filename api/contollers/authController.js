import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import { signupValidation } from "../middlewares/validationForms.js";

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
      return res.status(400).json({ message: "Email already exist" });
    }

    const hashedPassword = bcryptjs.hashSync(password, 10)

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};
