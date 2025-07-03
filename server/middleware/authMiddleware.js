import jwt from 'jsonwebtoken'
import Company from '../models/Company.js'


export const protectCompany = async (req,res,next) => {

    const token = req.headers.token

    if(!token){
        return res.json({success:false,message:'Not authorized, Login Again'})

    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const company = await Company.findById(decoded.id); // <-- This must match token payload

        if (!company) return res.status(404).json({ success: false, message: "Company not found" });

        req.company = company; // <-- This line is what makes req.company not null
        next();
        

    } catch(error){
        res.json({success:false,message:error.message})
    }
}
// // middlewares/verifyCompany.js
// import jwt from "jsonwebtoken";
// import Company from "../models/Company.js";

// export const protectCompany = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       console.log("❌ No Authorization header or format invalid");
//       return res.status(401).json({ success: false, message: "Not authorized, Login Again" });
//     }

//     const token = authHeader.split(" ")[1];

//     if (!token) {
//       console.log("❌ Token missing after split");
//       return res.status(401).json({ success: false, message: "Not authorized, Login Again" });
//     }

//     // Decode the token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log("✅ Decoded token:", decoded);

//     const company = await Company.findById(decoded.id);

//     if (!company) {
//       console.log("❌ Company not found");
//       return res.status(401).json({ success: false, message: "Not authorized, Login Again" });
//     }

//     req.company = company;
//     next();
//   } catch (error) {
//     console.log("❌ JWT Error:", error.message);
//     return res.status(401).json({ success: false, message: "Not authorized, Login Again" });
//   }
// };
