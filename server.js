import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';





// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000; // Use default port 3000 for localhost
const MONGO_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/yourDatabaseName"; // Local MongoDB
const router = express.Router();

// Middleware
app.use(express.json()); // Enable parsing JSON in requests
app.use(cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE",
    credentials: true
})); // Enable cross-origin requests for frontend/backend communication

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
})
    .then(() => console.log(" Connected to MongoDB"))
    .catch(err => console.error(" MongoDB Connection Error:", err));




    const UserSchema = new mongoose.Schema({
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        // role: { type: String, enum: ["doctor", "patient"], required: true } // Role field
    });
    
    const UserModel = mongoose.model("User", UserSchema, "users");
    UserModel.createCollection()
        .then(() => console.log(" Collection created"))
        .catch((err) => console.log(" Error creating collection", err));



        // router.post("/register", async (req, res) => {
        //     try {
        //         const { name, email, password, role } = req.body;
        //         console.log("Received registration data:", { name, email, password, role });
        
        //         if (!name || !email || !password || !role) {
        //             return res.status(400).json({ message: "All fields are required, including role" });
        //         }
        
        //         if (!["doctor", "patient"].includes(role)) {
        //             return res.status(400).json({ message: "Invalid role. Must be 'doctor' or 'patient'" });
        //         }
        
        //         let user = await UserModel.findOne({ email });
        //         if (user) return res.status(400).json({ message: "User already exists" });
        
        //         const hashedPassword = await bcrypt.hash(password, 10);
        //         console.log("Hashed Password:", hashedPassword);
        
        //         user = new UserModel({ name, email, password: hashedPassword, role });
        //         await user.save();
        
        //         res.status(201).json({ message: "User registered successfully" });
        //     } catch (error) {
        //         console.error("Registration Error:", error);
        //         res.status(500).json({ message: "Server error during registration" });
        //     }
        // });
        
    
    // Register Route
    router.post("/register", async (req, res) => {
        try {
            const { name, email, password } = req.body;
            console.log(" Received registration data:", { name, email, password });
    
            if (!name || !email || !password) {
                return res.status(400).json({ message: "All fields are required" });
            }
    
            let user = await UserModel.findOne({ email });
            if (user) return res.status(400).json({ message: "User already exists" });
    
            const hashedPassword = await bcrypt.hash(password, 10);
            console.log(" Hashed Password:", hashedPassword);
    
            user = new UserModel({ name, email, password: hashedPassword });
            await user.save();
    
            res.status(201).json({ message: "User registered successfully" });
        } catch (error) {
            console.error(" Registration Error:", error);
            res.status(500).json({ message: "Server error during registration" });
        }
    });

    // router.post("/login", async (req, res) => {
    //     try {
    //         const { email, password } = req.body;
    //         console.log("Received login request:", { email, password });
    
    //         if (!email || !password) {
    //             return res.status(400).json({ message: "Email and password are required" });
    //         }
    
    //         const user = await UserModel.findOne({ email });
    //         if (!user) {
    //             console.log("No user found with this email");
    //             return res.status(400).json({ message: "Invalid Credentials" });
    //         }
    
    //         console.log("User found:", { id: user._id, email: user.email, role: user.role });
    
    //         const isMatch = await bcrypt.compare(password, user.password);
    //         console.log(`Password Match Status: ${isMatch ? "Match" : "Mismatch"}`);
    
    //         if (!isMatch) {
    //             return res.status(400).json({ message: "Invalid Credentials" });
    //         }
    
    //         const token = jwt.sign({ id: user._id, role: user.role }, "secretkey", { expiresIn: "1h" });
    //         console.log("Token generated successfully");
    
    //         res.json({
    //             success: true,
    //             token,
    //             user: { id: user._id, name: user.name, email: user.email, role: user.role }
    //         });
    //     } catch (error) {
    //         console.error("Login Error:", error);
    //         res.status(500).json({ message: "Server error during login" });
    //     }
    // });
    
    
    // Login Route
    router.post("/login", async (req, res) => {
        try {
            const { email, password } = req.body;
            console.log(" Received login request:", { email, password });
    
            if (!email || !password) {
                return res.status(400).json({ message: "Email and password are required" });
            }
    
            const user = await UserModel.findOne({ email });
            if (!user) {
                console.log(" No user found with this email");
                return res.status(400).json({ message: "Invalid Credentials" });
            }
    
            console.log(" User found:", { id: user._id, email: user.email, storedPassword: user.password });
    
            const isMatch = await bcrypt.compare(password, user.password);
            console.log(" Comparing:", password, "vs", user.password);
            console.log(` Password Match Status: ${isMatch ? " Match" : " Mismatch"}`);
    
            if (!isMatch) {
                return res.status(400).json({ message: "Invalid Credentials" });
            }
    
            const token = jwt.sign({ id: user._id }, "secretkey", { expiresIn: "1h" });
            console.log(" Token generated successfully");
    
            res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
        } catch (error) {
            console.error(" Login Error:", error);
            res.status(500).json({ message: "Server error during login" });
        }
    });
    
    app.use("/api/auth", router);


// Define Patient Schema
const patientSchema = new mongoose.Schema({
    patientName: { type: String, required: true },
    patientID: { type: String, required: true, unique: true },
    pregnancies: Number,
    glucose: Number,
    bloodpressure: Number,
    skinthickness: Number,
    insulin: Number,
    BMI: Number,
    DPF: Number, // Ensure capitalization matches the frontend
    age: Number
});

// Create Mongoose Model
const PatientModel = mongoose.model("Patient", patientSchema);





  

// Update Patient Data (PUT /DashPage/:id)
app.put('/DashPage/:id', async (req, res) => {
    const { id } = req.params; // Get the patient _id from the URL
    const updatedData = req.body; // Get the updated data from the request body

    try {
        // Find and update the patient by _id
        const updatedPatient = await PatientModel.findByIdAndUpdate(id, updatedData, { new: true });

        // If the patient doesn't exist
        if (!updatedPatient) {
            return res.status(404).json({ success: false, message: "Patient not found" });
        }

        // Respond with the updated patient data
        res.status(200).json({ success: true, data: updatedPatient });
    } catch (error) {
        console.error(" Error updating patient data:", error);
        res.status(500).json({ success: false, message: "Error updating patient data", error });
    }
});


// Route to Fetch Patient by ID (GET /DashPage/:id)
app.get('/DashPage/:id', async (req, res) => {
    const { id } = req.params; // Get the patient _id from the URL

    try {
        // Find patient by ID
        const patient = await PatientModel.findById(id);
        
        // If the patient doesn't exist
        if (!patient) {
            return res.status(404).json({ success: false, message: "Patient not found" });
        }

        // Respond with the patient data
        res.status(200).json({ success: true, data: patient });
    } catch (error) {
        console.error(" Error fetching patient data:", error);
        res.status(500).json({ success: false, message: "Error fetching patient data", error });
    }
});





app.delete('/DashPage/:id', async (req, res) => {
    const { id } = req.params; // Expecting _id from frontend (MongoDB ID)

    try {
        const deletedPatient = await PatientModel.findByIdAndDelete(id);  // Use findByIdAndDelete to delete based on MongoDB _id
        
        if (!deletedPatient) {
            return res.status(404).json({ success: false, message: "Patient not found" });
        }

        res.status(200).json({ success: true, message: "Patient deleted successfully", patientId: id });
    } catch (error) {
        console.error(" Error deleting patient:", error);
        res.status(500).json({ success: false, message: "Error deleting patient" });
    }
});
  

//  Route: Fetch All Patients (GET /DashPage)
app.get('/DashPage', async (req, res) => {
    try {
        const patients = await PatientModel.find(); // Fetch all patient data
        console.log(" Sending Patients Data to Frontend:", patients);
        res.status(200).json({ data: patients });
    } catch (error) {
        console.error(" Error fetching patient data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//  Route: Insert New Patient Data (POST /DashPredict)
app.post('/DashPredict', async (req, res) => {
    try {
        console.log(" Received Data from Frontend:", req.body);

        const { patientName, patientID } = req.body;
        if (!patientName || !patientID) {
            return res.status(400).json({ error: "Missing required fields: patientName and patientID!" });
        }

        // Insert Data into Database
        const newPatient = new PatientModel(req.body);
        await newPatient.save();
        console.log(" Data Inserted Successfully:", newPatient);
        res.status(201).json({ message: "Data inserted successfully", data: newPatient });
    } catch (error) {
        console.error(" Error inserting data:", error);
        if (error.code === 11000) { // Duplicate key error for patientID
            return res.status(400).json({ error: "Duplicate patientID found!" });
        }
        res.status(500).json({ error: "Error inserting data", details: error.message });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(` Server running on http://localhost:${PORT}`);
});
