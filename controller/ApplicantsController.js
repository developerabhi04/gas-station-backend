import UserApplicant from '../model/Applicants.js';
import multer from 'multer';
import cloudinary from 'cloudinary';
import { v4 as uuidv4 } from 'uuid';

// Setup multer to use memory storage (store files in memory temporarily)
const storage = multer.memoryStorage();
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
                resAddress, pincode, stateAddress, district, email, panCard, indianCitizen, indianITRule, dateOfBirth,
                physicalDisability, maritalStatus, FatherOrHusbandFirstName, FatherOrHusbandMiddleName, FatherOrHusbandLastName,
                qualification, boardUniversityInstitute, degree, year, groupType, landOwnerName, relationshipWithApplicant,
                dateOfRegistration, KhasraKhatouniGutNoSurvey, landLocation, landTransfer, rateTerm, offerAnotherPlot,
                landDimensionsFrontage, landDimensionsDepth, landDimensionsArea, declarationIsAgree
            } = req.body;

            // Helper function to upload files to Cloudinary
            const uploadFileToCloudinary = (fileBuffer) => {
                return new Promise((resolve, reject) => {
                    cloudinary.v2.uploader.upload_stream({ folder: 'applicants' }, (error, result) => {
                        if (error) return reject(error);
                        resolve(result.secure_url);
                    }).end(fileBuffer);
                });
            };

            // Handle file uploads to Cloudinary
            const applicantPhoto = req.files?.applicantPhoto ? await uploadFileToCloudinary(req.files.applicantPhoto[0].buffer) : '';
            const idProof = req.files?.idProof ? await uploadFileToCloudinary(req.files.idProof[0].buffer) : '';
            const addressProof = req.files?.addressProof ? await uploadFileToCloudinary(req.files.addressProof[0].buffer) : '';

            // Create a new application instance
            const newApplication = new UserApplicant({
                title, locationDescription, typeOfRO, modeOfSelection, state, publishedDate, closingDate,
                applyAs, firmName, firstName, lastName, companyName, gender, mobileNumber, landlineNumber,
                resAddress, pincode, stateAddress, district, email, panCard, indianCitizen, indianITRule, dateOfBirth,
                physicalDisability, FatherOrHusbandFirstName, FatherOrHusbandMiddleName, FatherOrHusbandLastName,
                maritalStatus, qualification, boardUniversityInstitute, degree, year, groupType, landOwnerName,
                relationshipWithApplicant, dateOfRegistration, KhasraKhatouniGutNoSurvey, landLocation, landTransfer,
                rateTerm, offerAnotherPlot, landDimensionsFrontage, landDimensionsDepth, landDimensionsArea,
                declarationIsAgree, applicantPhoto, idProof, addressProof
            });

            // Save the new application to the database
            await newApplication.save();

            // Respond with a success message
            res.status(201).json({
                success: true,
                message: 'Application submitted successfully!',
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Server error. Please try again later.' });
        }
    },
];


// GET route to retrieve applicants by ID
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

// GET route to retrieve all applicants
export const getApplicants = async (req, res) => {
    try {
        const applicants = await UserApplicant.find();
        res.status(200).json({
            success: true,
            applicants,
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error. Please try again later.' });
    }
};

// DELETE route to remove an applicant
// export const deleteApplicant = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const deletedApplicant = await UserApplicant.findByIdAndDelete(id);
//         if (!deletedApplicant) {
//             return res.status(404).json({ error: 'Applicant not found' });
//         }
//         res.status(200).json({
//             success: true,
//             message: 'Applicant deleted successfully',
//         });
//     } catch (error) {
//         res.status(500).json({ error: 'Server error. Please try again later.' });
//     }
// };



// DELETE route to remove an applicant and delete images from Cloudinary
export const deleteApplicant = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the applicant to check if they exist and get the image URLs
        const applicant = await UserApplicant.findById(id);
        if (!applicant) {
            return res.status(404).json({ error: 'Applicant not found' });
        }

        // Helper function to delete a file from Cloudinary using its URL
        const deleteFromCloudinary = async (url) => {
            if (!url) return;
            // Extract the public_id from the URL for deletion
            const publicId = url.split('/').pop().split('.')[0]; // Get public_id before the file extension
            await cloudinary.v2.uploader.destroy(`applicants/${publicId}`);
        };

        // Delete applicant's images from Cloudinary if they exist
        if (applicant.applicantPhoto) await deleteFromCloudinary(applicant.applicantPhoto);
        if (applicant.idProof) await deleteFromCloudinary(applicant.idProof);
        if (applicant.addressProof) await deleteFromCloudinary(applicant.addressProof);

        // Proceed with deleting the applicant from the database
        await UserApplicant.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: 'Applicant and associated images deleted successfully',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error. Please try again later.' });
    }
};
