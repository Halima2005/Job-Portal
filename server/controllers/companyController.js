import { messageInRaw } from "svix";
import Company from "../models/Company.js";
import bcrypt from 'bcrypt';
import {v2 as cloudinary} from 'cloudinary'
import generateToken from "../utils/generateToken.js";
//Register a new company
export const registerComapny = async(req,res) => {
       
    const {name,email,password} = req.body

    const imageFile = req.file;

    if(!name || !email || !password || !imageFile) {

        return res.json({success:false,message: "Missing Details"})

    }

    try{

        const comapnyExists = await Company.findOne({email})


        if(comapnyExists){
             return res.json({success:false,message:'Comapany already registered'})
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password,salt)

        const imageUpload = await cloudinary.uploader.upload(imageFile.path)
         const comapany = await Company.create({
            name,
            email,
            password:hashPassword,
            image:imageUpload.secure_url
         })

         res.json({
            success:true,
            comapany:{
                _id:comapany._id,
                name:comapany.name,
                email:comapany.email,
                image:comapany.image


            },

            token:generateToken(comapany._id)
         })


    }catch(error){
        res.json({success:false,message:error.message})
    }
}


//company login

export const loginCompany = async()=>{

}

//Get comapany data
export const getCompanyData = async(req,res) => {

}

//Post a new job
export const postJob= async(req,res) => {

}

//Get Comapny Job Applications
export const getCompanyJobApplicants = async(req,res) =>{

}

//Get company Posted Jobs
export const getCompanyPostedJob = async(req,res) => {

}

//Chnage Job Application Status
export const changeJobApplicationsStatus = async(req,res) => {

}

//Change Job visibility
export const changeVisibility= async(req,res) => {

}