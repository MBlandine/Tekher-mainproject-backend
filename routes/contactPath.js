import { createContact, getAllcontact , getContactById, deleteContactById, updateDataById} from "../controllers/contactController.js";
import express from "express";
import {Admin} from "../middlewares/roleidentification.js";
import {auth} from "../middlewares/tokenVerification.js";



const contactRouter = express.Router();

contactRouter.post("/createContact",createContact);
contactRouter.get("/getAllContact", auth, Admin, getAllcontact);
contactRouter.get("/getContactById/:Id",Admin,auth,getContactById);
contactRouter.delete("/deleteContactById/:Id",Admin,auth,deleteContactById);
contactRouter.put("/updateDataById/:Id",updateDataById);

export default contactRouter;