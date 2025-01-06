import UserApplicant from '../model/Applicants.js';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';




// Setup storage for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads'); // Specify the directory for uploads
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = `${uuidv4()}${path.extname(file.originalname)}`;
        cb(null, uniqueSuffix); // Save file with unique name
    }
});

const upload = multer({ storage: storage });


// POST route to submit application details
export const submitApplication = [
    upload.fields([
        { name: 'applicantPhoto', maxCount: 1 },
        { name: 'idProof', maxCount: 1 },
        { name: 'addressProof', maxCount: 1 },
    ]),
    async (req, res) => {
        try {
            const {
                title, locationDescription, typeOfRO, modeOfSelection, state, publishedDate, closingDate,
                applyAs, firmName, firstName, lastName, companyName, gender, mobileNumber, landlineNumber,
                resAddress, pincode, stateAddress, district, email, panCard, indianCitizen, indianITRule, dateOfBirth, physicalDisability,
                maritalStatus, FatherOrHusbandFirstName, FatherOrHusbandMiddleName, FatherOrHusbandLastName, qualification,
                boardUniversityInstitute, degree, year, groupType, landOwnerName, relationshipWithApplicant,
                dateOfRegistration, KhasraKhatouniGutNoSurvey, landLocation, landTransfer, rateTerm,
                offerAnotherPlot, landDimensionsFrontage, landDimensionsDepth, landDimensionsArea, declarationIsAgree
            } = req.body;

            // Handle file uploads (checking if the files exist)
            const applicantPhoto = req.files?.applicantPhoto ? req.files.applicantPhoto[0].path : '';
            const idProof = req.files?.idProof ? req.files.idProof[0].path : '';
            const addressProof = req.files?.addressProof ? req.files.addressProof[0].path : '';

            // Create a new application instance
            const newApplication = new UserApplicant({
                title,
                locationDescription,
                typeOfRO,
                modeOfSelection,
                state,
                publishedDate,
                closingDate,
                applyAs,
                firmName,
                firstName,
                lastName,
                companyName,
                gender,
                mobileNumber,
                landlineNumber,
                resAddress,
                pincode,
                stateAddress,
                district,
                email,
                panCard,
                indianCitizen,
                indianITRule,
                dateOfBirth,
                physicalDisability,
                FatherOrHusbandFirstName,
                FatherOrHusbandMiddleName,
                FatherOrHusbandLastName,
                maritalStatus,
                qualification,
                boardUniversityInstitute,
                degree,
                year,
                groupType,
                landOwnerName,
                relationshipWithApplicant,
                dateOfRegistration,
                KhasraKhatouniGutNoSurvey,
                landLocation,
                landTransfer,
                rateTerm,
                offerAnotherPlot,
                landDimensionsFrontage,
                landDimensionsDepth,
                landDimensionsArea,
                declarationIsAgree,
                applicantPhoto,
                idProof,
                addressProof,
            });

            // Save the new application to the database
            await newApplication.save();

            // Respond with a success message
            res.status(201).json({
                success: true,
                message: 'Application submitted successfully!',
            });

        } catch (error) {
            // Handle validation errors
            if (error.name === 'ValidationError') {
                return res.status(400).json({ error: error.message });
            }

            // Handle general server errors
            res.status(500).json({ error: 'Server error. Please try again later.' });
        }
    }
];


export const getApplicantById = async (req, res) => {
    try {
        const applicant = await UserApplicant.findById(req.params.id);
        if (!applicant) {
            return res.status(404).json({ message: "Applicant not found" });
        }
        res.status(200).json({ applicant });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};





export const getApplicants = async (req, res) => {
    try {
        const applicants = await UserApplicant.find();
        res.status(200).json({
            success: true,
            applicants
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error. Please try again later.' });
    }
};

export const deleteApplicant = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedApplicant = await UserApplicant.findByIdAndDelete(id);
        if (!deletedApplicant) {
            return res.status(404).json({ error: 'Applicant not found' });
        }
        res.status(200).json({
            success: true,
            message: 'Applicant deleted successfully'
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error. Please try again later.' });
    }
};