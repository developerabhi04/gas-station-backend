import mongoose from "mongoose";

const DateSchema = new mongoose.Schema({
    publishedDate: {
        type: Date,
        required: true,
    },
    closingDate: {
        type: Date,
        required: true,
    },
});

const DateS = mongoose.model('DateOfChange', DateSchema);

export default DateS;
