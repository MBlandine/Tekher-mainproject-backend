import User from "../models/userModel.js";


export const Admin = (req, res, next)=>{
    if( req.user.userrole !== "admin"){
        return res.status(403).json({message: "Access denied contact Admin please!"});
      }
      next();
};


