import JobApplication from "../models/JobApplication.js"
import User from "../models/User.js"
import Job from "../models/Job.js"
import {v2 as cloudinary} from "cloudinary"
import { clerkClient } from '@clerk/clerk-sdk-node';

// Get user data
export const getUserData = async (req, res) => {
    const { userId } = await req.auth();
    try {
        let user = await User.findById(userId);

        if (!user) {
            // Fetch user info from Clerk
            const clerkUser = await clerkClient.users.getUser(userId);

            if (!clerkUser) {
                return res.json({ success: false, message: 'Clerk user not found' });
            }

            // Create a new user in MongoDB
            user = await User.create({
                _id: userId,
                name: clerkUser.firstName + ' ' + clerkUser.lastName,
                email: clerkUser.emailAddresses[0].emailAddress,
                image: clerkUser.imageUrl,
                resume: ""
            });
        }

        res.json({ success: true, user });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};







//Apply for a job
export const applyForJob = async (req,res) =>{

    const { jobId} = req.body

   const { userId } = await req.auth();
    try{

        const isAlreadyApplied = await JobApplication.find({jobId,userId})
        if(isAlreadyApplied.length >0){
            return res.json ({success:false,message:'Already Applied'})
        }

        const jobData = await Job.findById(jobId)

        if(!jobData){
            return res.json({success:false,message:'Job Not Found'})
        }

        await JobApplication.create({
            companyId:jobData.companyId,
            userId,
            jobId,
            date:Date.now()
        })

        res.json({success: true,message:'Applied Successfully'})
    }catch(error){
        res.json({success:false,message:error.message})
    }
}

//Get user applied applications
export const getUserJobApplications  = async (req,res) => {
        try{

           const { userId } = await req.auth();

            const applications = await JobApplication.find({userId})
            .populate('companyId','name email image')
            .populate('jobId','title description location category level salary')
            .exec()

            if(!applications){
                return res.json({success:false,message:'No job applications found for this user.'})
            }

            return res.json({success:true,applications})

        } catch(error){
        res.json({success:false,message:error.message})
    }
}

//Update user profile(resume)
export const updateUserResume = async(req,res) =>{

    try{
        const { userId } = await req.auth();

        const resumeFile = req.file

        const userData = await User.findById(userId)

        if(resumeFile){
            const resumeUpload = await cloudinary.uploader.upload(resumeFile.path)
            userData.resume = resumeUpload.secure_url
        }

        await userData.save()

        return res.json({success:true,message:'Resume Updated'})
    } catch(error){
        res.json({success:false,message:error.message})
    }
}

