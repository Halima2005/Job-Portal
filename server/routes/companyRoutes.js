import express from 'express'
import { changeJobApplicationsStatus, changeVisibility, getCompanyData, getCompanyJobApplicants, getCompanyPostedJob, loginCompany, postJob, registerCompany } from '../controllers/companyController.js'
import upload from '../config/multer.js'
import { protectCompany } from '../middleware/authMiddleware.js'
import { requireAuth } from '@clerk/express';
const router = express.Router()

//Register a company 
router.post('/register',upload.single('image'),registerCompany)

//company login
router.post('/login',loginCompany)

//Get Comapny Data
router.get('/company',requireAuth(),protectCompany,getCompanyData)

//Post a Job
router.post('/post-job',protectCompany,postJob)

//Get Applicants Data of Company
router.get('/applicants',protectCompany,getCompanyJobApplicants)

//Get Company Job List
router.get('/list-jobs',protectCompany,getCompanyPostedJob)

//Change Applications Status
router.post('/change-status',protectCompany,changeJobApplicationsStatus)

//Change Applications Visibility
router.post('/change-visibility',protectCompany,changeVisibility)


export default router