const mongoose = require("mongoose");

// Define the Complaint schema
const complaintSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    }, // Name of the user submitting the complaint
    email: { 
        type: String, 
        required: true 
    }, // Email of the user
    complaint: { 
        type: String, 
        required: true 
    }, // Text of the complaint
    priority: { 
        type: String, 
        enum: ["High Priority", "Medium Priority", "Low Priority"], 
        default: "Medium Priority" 
    }, // Priority determined by AI
    department: { 
        type: String, 
        enum: ["Cleanliness", "Emergency", "Canteen", "General"], 
        default: "General" 
    }, // Department determined by AI
    status: { 
        type: String, 
        enum: ["New", "In Progress", "Resolved", "Closed"], 
        default: "New" 
    }, // Status of the complaint
    images: { 
        type: [String], 
        default: [] 
    }, // Array of image URLs (if any)
    date: { 
        type: Date, 
        default: Date.now 
    } // Date and time when the complaint was submitted
});

// Create the Complaint model
const Complaint = mongoose.model("Complaint", complaintSchema);

// Export the Complaint model
module.exports = Complaint;