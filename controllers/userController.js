// import User from "../models/userModel.js";

// import bcrypt from 'bcryptjs';
// import { generateAccessToken } from "../utils/tokenGenerating.js";

// export const Register = async (req, res) => {
//     try {
//         const { userName, userEmail, userPassword, userRole } = req.body;
//         //check if email already exists
//         const existingUser = await User.findOne({ userEmail });
//         if (existingUser) {
//             return res.status(400).json({ message: "Email already exists" });
//         }
//         //hash Password
//         const hashedPassword = await bcrypt.hash(userPassword, 10);
//         const user = new User({ username: userName, useremail: userEmail, userpassword: hashedPassword, userrole: userRole });

//         // user.token.accessToken = generateAccessToken(user);
//         await user.save();
//         res.status(201).json({
//             message: "Account created successfull !",
//             user: {
//                 ...user.toObject()
//             },
//         });
//     }
//     catch (error) {
//         res.status(500).json({message:"Internal server Error! Failed to register User", error: error.message});
//     }
// };

// export const getAllUsers = async (req, res) => {
//     try{
//         const users = await User.find();
//         res.json({
//             users
//         });
//     } catch(err){
//         console.log(err)
//         res.status(500).json({
//             message: "Server error", error: err.message
//         })
//     }
// }



// export const Login = async (req, res) => {
//     try {
//         const { userEmail, userPassword } = req.body;
//         const user = await User.findOne({ useremail: userEmail });

//         if (!user) {
//             // User not found
//             return res.status(404).json({ message: "User not found" });
//         }

//         const isMatch = await bcrypt.compare(userPassword, user.userpassword);
//         if (!isMatch) {
//             return res.status(401).json({ message: "Invalid credentials" });
//         }
//         const accessToken = generateAccessToken(user);


//         user.tokens = { accessToken };

//         await user.save();

//         const userResponse = {
//             _id: user._id,
//             userEmail: user.userEmail,
//             tokens: { accessToken },
//         };

//         res.json({ user: userResponse });
//     } catch (error) {
//         // General error handling
//         res.status(500).json({ message: "Server error", error: error.message });
//     }
// };

