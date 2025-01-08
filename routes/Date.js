import express from 'express';
import { createDates, getDates, updateDates } from '../controller/DateChange.js';

const router = express.Router();

// Route to GET all dates
router.get('/dates', getDates);

// Route to POST (create) new dates
router.post('/dates', createDates);

// Route to PUT (update) dates by ID
router.put('/dates/:id', updateDates);

export default router;
