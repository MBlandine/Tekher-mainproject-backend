import { createPatient, getAllPatients, getPatientById, updatePatient, deletePatient } from "../controllers/predictController.js";
import express from "express"
import {Admin} from "../middlewares/roleidentification.js"
import {auth}from "../middlewares/tokenVerification.js"


const patientRouter = express.Router();



patientRouter.post("/createPatient", Admin, auth, createPatient);
patientRouter.get("/getAllPatients", getAllPatients);
patientRouter.get("/getPatientById:id", getPatientById);
patientRouter.put("/updatePatient:id", updatePatient);
patientRouter.delete("/deletePatient:id", deletePatient);

export default patientRouter;
