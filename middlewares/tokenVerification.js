
import jwt  from "jsonwebtoken";
import dotenv from 'dotenv';
import User from "../models/userModel.js"


dotenv.config();

export const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const token = authHeader.split(" ")[1];// Extract token from header

    if (!token) {
        return res.status(401).json({ message: "Token missing" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded)
        const user = await User.findOne({
            _id: decoded._id
        });
        if (!user) {
            return res.status(401).json({ message: "User not found or token invalid" });
        }
        req.token = token;
        req.user = user;
        next();
    }
    catch (error) {
        console.error("JWT Verification Error: ", error);// log error for debugging
        res.status(401).json({ message: "Authentication failed.", error: error.message });
    }
};
