import DateS from '../model/date.js';

// GET: Fetch all dates
export const getDates = async (req, res) => {
    try {
        const dates = await DateS.find();  // Find all dates
        res.status(200).json({
            success: true,
            message: 'Dates retrieved successfully',
            data: dates,
        });
    } catch (error) {
        console.error('Error fetching dates:', error);
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again later.',
            error: error.message,
        });
    }
};

// POST: Create new dates
export const createDates = async (req, res) => {
    try {
        const { publishedDate, closingDate } = req.body;

        if (!publishedDate || !closingDate) {
            return res.status(400).json({
                success: false,
                message: 'Published Date and Closing Date are required.',
            });
        }

        // Ensure the dates are in the correct format (YYYY-MM-DD)
        const newDates = new DateS({
            publishedDate: new Date(publishedDate),
            closingDate: new Date(closingDate),
        });
        await newDates.save();

        res.status(201).json({
            success: true,
            message: 'Dates created successfully',
            data: newDates,
        });
    } catch (error) {
        console.error('Error creating dates:', error);
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again later.',
            error: error.message,
        });
    }
};

// PUT: Update existing dates by ID
export const updateDates = async (req, res) => {
    try {
        const { publishedDate, closingDate } = req.body;

        if (!publishedDate || !closingDate) {
            return res.status(400).json({
                success: false,
                message: 'Published Date and Closing Date are required.',
            });
        }

        // Ensure the dates are in the correct format (YYYY-MM-DD)
        const updatedDocument = await DateS.findByIdAndUpdate(
            req.params.id,
            {
                publishedDate: new Date(publishedDate),
                closingDate: new Date(closingDate),
            },
            { new: true } // Return the updated document
        );

        if (!updatedDocument) {
            return res.status(404).json({
                success: false,
                message: 'Document not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Dates updated successfully',
            data: updatedDocument,
        });
    } catch (error) {
        console.error('Error updating dates:', error);
        res.status(500).json({
            success: false,
            message: 'Server error. Please try again later.',
            error: error.message,
        });
    }
};
