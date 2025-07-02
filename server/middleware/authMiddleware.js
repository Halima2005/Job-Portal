// import jwt from 'jsonwebtoken'
// import Company from '../models/Company.js'


// export const protectCompany = async (req,res,next) => {

//     const token = req.headers.token

//     if(!token){
//         return res.json({success:false,message:'Not authorized, Login Again'})

//     }
//     try{
//         const decoded = jwt.verify(token, process.env.JWT_SECRET)
//         const company = await Company.findById(decoded.id); // <-- This must match token payload

//         if (!company) return res.status(404).json({ success: false, message: "Company not found" });

//         req.company = company; // <-- This line is what makes req.company not null
//         next();
        

//     } catch(error){
//         res.json({success:false,message:error.message})
//     }
// }
import jwt from 'jsonwebtoken';
import Company from '../models/Company.js';

export const protectCompany = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ success: false, message: "Not authorized, Login Again" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const company = await Company.findById(decoded.id); // decoded must have `id`

    if (!company) {
      return res.status(401).json({ success: false, message: "Not authorized, Login Again" });
    }

    req.company = company;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Not authorized, Login Again" });
  }
};
