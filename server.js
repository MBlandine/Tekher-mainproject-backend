import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/yourDatabaseName";
const router = express.Router();

// Middleware
app.use(express.json());
app.use(cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE",
    credentials: true
}));

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
})
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err));

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const UserModel = mongoose.model("User", UserSchema, "users");
UserModel.createCollection()
    .then(() => console.log("✅ Collection created"))
    .catch((err) => console.log("❌ Error creating collection", err));

// Register Route
router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log("📥 Received registration data:", { name, email, password });

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        let user = await UserModel.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("🔐 Hashed Password:", hashedPassword);

        user = new UserModel({ name, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("❌ Registration Error:", error);
        res.status(500).json({ message: "Server error during registration" });
    }
});

// Login Route
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("📥 Received login request:", { email, password });

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await UserModel.findOne({ email });
        if (!user) {
            console.log("❌ No user found with this email");
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        console.log("✅ User found:", { id: user._id, email: user.email, storedPassword: user.password });

        const isMatch = await bcrypt.compare(password, user.password);
        console.log("🔍 Comparing:", password, "vs", user.password);
        console.log(`🔍 Password Match Status: ${isMatch ? "✅ Match" : "❌ Mismatch"}`);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const token = jwt.sign({ id: user._id }, "secretkey", { expiresIn: "1h" });
        console.log("✅ Token generated successfully");

        res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        console.error("❌ Login Error:", error);
        res.status(500).json({ message: "Server error during login" });
    }
});

app.use("/api/auth", router);

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
