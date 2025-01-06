import Message from "../model/message.js";


export const submitForm = async (req, res) => {
    try {
        const {
            name, email, phoneNumber, dropMessage
        } = req.body;


        // Create new application instance
        const newForm = new Message({
            name,
            email,
            phoneNumber,
            dropMessage
        });

        // Save to database
        await newForm.save();

        res.status(201).json({
            success: true,
            message: 'submitted successfully!'
        });

    } catch (error) {

        // Check if the error is a validation error
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message });
        }

        // Return general server error if not a validation issue
        res.status(500).json({ error: 'Server error. Please try again later.' });
    }
}


export const getMessages = async (req, res) => {
    try {
        const messages = await Message.find();
        res.status(200).json({
            success: true,
            messages,
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error. Please try again later.' });
    }
}


export const deleteMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedMessage = await Message.findByIdAndDelete(id);
        if (!deletedMessage) {
            return res.status(404).json({ error: 'Message not found' });
        }
        res.status(200).json({
            success: true,
            message: 'Message deleted successfully!'
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error. Please try again later.' });
    }
}