import express from "express";
import { dataStatic, deleteMessage, getMessages, submitForm } from "../controller/Message.js";



const router = express.Router()

router.post("/contact", submitForm);
router.get("/getdata", getMessages);
router.delete("/delete/:id", deleteMessage);

router.get("/set", dataStatic);



export default router;