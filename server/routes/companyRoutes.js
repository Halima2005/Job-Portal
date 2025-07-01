import express from 'express'
import { changeJobApplicationsStatus, changeVisibility, getCompanyData, getCompanyJobApplicants, getCompanyPostedJob, loginCompany, postJob, registerComapny } from '../controllers/companyController.js'
import upload from '../config/multer.js'

const router = express.Router()

//Register a company 
router.post('/register',upload.single('image'),registerComapny)

//company login
router.post('/login',loginCompany)

//Get Comapny Data
router.get('/company',getCompanyData)

//Post a Job
router.post('/post-job',postJob)

//Get Applicants Data of Company
router.get('/applicants',getCompanyJobApplicants)

//Get Company Job List
router.get('/list-jobs',getCompanyPostedJob)

//Change Applications Status
router.post('/change-status',changeJobApplicationsStatus)

//Change Applications Visibility
router.post('/change-visibility',changeVisibility)


export default router