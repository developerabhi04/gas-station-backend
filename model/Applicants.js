import mongoose from "mongoose";


const applicationSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    locationDescription: {
        type: String,
    },
    typeOfRO: {
        type: String,
    },
    modeOfSelection: {
        type: String,
    },
    category: {
        type: String,

    },
    state: {
        type: String,
    },
    publishedDate: {
        type: Date,
    },
    closingDate: {
        type: Date,
    },
    applyAs: {
        type: String,
        enum: ['Individual', 'Partnership'],
    },
    // 
    firmName: {
        type: String,
        required: function () {
            return this.applyAs === 'Partnership';
        },
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    companyName: {
        type: String,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
    },
    mobileNumber: {
        type: String,
    },
    landlineNumber: {
        type: String,
    },
    resAddress: {
        type: String,
    },
    pincode: {
        type: String,
    },
    stateAddress: {
        type: String,
    },
    district: {
        type: String,
    },
    email: {
        type: String,
    },
    panCard: {
        type: String,
    },
    indianCitizen: {
        type: String,
    },
    indianITRule: {
        type: String,
    },
    dateOfBirth: {
        type: String,
    },
    physicalDisability: {
        type: String,
    },
    FatherOrHusbandFirstName: {
        type: String,
    },
    FatherOrHusbandMiddleName: {
        type: String,
    },
    FatherOrHusbandLastName: {
        type: String,
    },
    maritalStatus: {
        type: String,
        enum: ['Single', 'Married', 'Widow', 'Divorce'],
    },

    // 
    qualification: {
        type: String,
    },
    boardUniversityInstitute: {
        type: String,
    },
    degree: {
        type: String,
    },
    year: {
        type: String,
    },
    groupType: {
        type: String,
    },
    landOwnerName: {
        type: String,
    },
    relationshipWithApplicant: {
        type: String,
    },
    dateOfRegistration: {
        type: Date,
    },
    KhasraKhatouniGutNoSurvey: {
        type: String,
    },
    landLocation: {
        type: String,
    },
    landDimensionsFrontage: {
        type: String,
    },
    landDimensionsDepth: {
        type: String,
    },
    landDimensionsArea: {
        type: String,
    },
    landTransfer: {
        type: String,
        enum: ['yes', 'no'],
    },
    rateTerm: {
        type: String,
    },
    offerAnotherPlot: {
        type: String,
    },
    declarationIsAgree: {
        type: Boolean,
    },
    // 
    applicantPhoto: {
        type: String, // Store the file path or URL
    },
    idProof: {
        type: String, // Store the file path or URL
    },
    addressProof: {
        type: String, // Store the file path or URL
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const UserApplicant = mongoose.model('Application', applicationSchema);


export default UserApplicant;
