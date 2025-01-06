import express from "express";
import { deleteApplicant,  getApplicantById,  getApplicants, submitApplication } from "../controller/ApplicantsController.js";


const router = express.Router()


router.post("/submit", submitApplication);
router.get("/get-all-applicants", getApplicants);
router.get("/get-applicant/:id", getApplicantById);
router.delete("/delete/:id", deleteApplicant);



export default router;