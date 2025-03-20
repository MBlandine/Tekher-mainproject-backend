
import Patient from '../models/predictModel.js';
import fs from "fs";





// Create Patient
export const createPatient = async (req, res) => {
  try {
    const { patientPregnancies, patientBloodpressure, patientInsulin, patientDPF , patientGlucose, patientSkinthickness, patientBMI, patientAge } = req.body;
    const patient = new Patient({ patientPregnancies, patientBloodpressure, patientInsulin, patientDPF , patientGlucose, patientSkinthickness, patientBMI, patientAge});
    await patient.save();

    res.status(201).json(patient);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};


// Get All Patients
export const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Get Patient by ID
export const getPatientById = async (req, res) => {
  try {
    const {Id} = req.params;
    const patients = await Patient.findById(req.params.Id);
    if (!patients) {
        return res.status(404).json({ success: false, message: "Patient not found" });
    }
    // res.json(patient);
    res.status(200).json({ success: true, patients });
    } 
    catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

// Update Patient
export const updatePatient = async (req, res) => {
  try {
    const { patientPregnancies, patientBloodpressure, patientInsulin, patientDPF , patientGlucose, patientSkinthickness, patientBMI, patientAge } = req.body;
    let updateData = { patientPregnancies, patientBloodpressure, patientInsulin, patientDPF , patientGlucose, patientSkinthickness, patientBMI, patientAge };


    const patient = await Patient.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!patient) return res.status(404).json({ message: "Patient not found" });

    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};


// Delete Patient
export const deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    if (!patient) return res.status(404).json({ message: "Patient not found" });

    res.json({ message: "Patient deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
