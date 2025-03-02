// routes/complaintRoutes.js
const express = require("express");
const Complaint = require("../models/Complaint"); // Import the Complaint model
const analyzeComplaint = require("../controllers/aiModel"); // Import the AI model for complaint analysis

const router = express.Router();

// Route to submit a complaint
router.post("/submit-complaint", async (req, res) => {
    try {
        const { name, email, complaint, images } = req.body;

        // Analyze the complaint using the AI model
        const { priority, department } = analyzeComplaint(complaint);

        // Create a new complaint document
        const newComplaint = new Complaint({
            name,
            email,
            complaint,
            priority,
            department,
            images: images || [], // Handle case where no images are uploaded
        });

        // Save the complaint to the database
        await newComplaint.save();

        // Send a success response
        res.status(201).json({
            success: true,
            message: "Complaint submitted successfully",
            data: newComplaint,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to submit complaint",
            error: error.message,
        });
    }
});

// Route to fetch all complaints
router.get("/complaints", async (req, res) => {
    try {
        const complaints = await Complaint.find();
        res.json({ success: true, data: complaints });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;