import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  patientPregnancies: { type: Number, required: true },
  patientBloodpressure: { type: Number, required: true },
  patientInsulin: { type: Number, required: true },
  patientDPF: { type: Number, required: true },
  patientGlucose: { type: Number, required: true },
  patientSkinthickness: { type: Number, required: true },
  patientBMI: { type: Number, required: true },
  patientAge: { type: Number, required: true },
});

const Patient = mongoose.model("Patient", patientSchema);
export default Patient;
