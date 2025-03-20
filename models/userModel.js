import mongoose from "mongoose";

// Define the schema for User data
const UserSchema = new mongoose.Schema({
    patientName: { type: String, required: true },
    patientID: { type: Number, required: true },
    pregnancies: { type: Number, required: true },
    glucose: { type: Number, required: true },
    bloodPressure: { type: Number, required: true },
    skinThickness: { type: Number, required: true },
    // insulin: { type: Number, required: true },
    BMI: { type: Number, required: true },
    DPF: { type: Number, required: true },
    age: { type: Number, required: true },
    // tokens: {
    //   accessTokens: { type: String },
    // }
});

 // Create and export the model
const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
