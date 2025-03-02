const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { User, Complaint } = require("./dbConnect");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb+srv://yashgawande47:ADMIN@cluster2.3zkkq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster2")
    .then(() => console.log("✅ MongoDB Connected Successfully!"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err));

// User Registration Route
app.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // Create new user
        const newUser = new User({ name, email, password });
        await newUser.save();

        res.status(201).json({ success: true, message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


//--------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------


// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const { Complaint } = require("./dbConnect"); // Import the User and Complaint models
// const analyzeComplaint = require("./controllers/aiModel"); // Import the AI model for complaint analysis

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB
// mongoose.connect("mongodb+srv://yashgawande47:ADMIN@cluster2.3zkkq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster2")
//     .then(() => console.log("✅ MongoDB Connected Successfully!"))
//     .catch(err => console.error("❌ MongoDB Connection Error:", err));

// // User Registration Route
// app.post("/register", async (req, res) => {
//     try {
//         const { name, email, password } = req.body;

//         // Check if user already exists
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ success: false, message: "User already exists" });
//         }

//         // Create new user
//         const newUser = new User({ name, email, password });
//         await newUser.save();

//         res.status(201).json({ success: true, message: "User registered successfully" });
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// });

// // Complaint Submission Route
// app.post("/submit-complaint", async (req, res) => {
//     try {
//         const { name, email, complaint, images } = req.body;

//         // Analyze the complaint using the AI model
//         const { priority, department } = analyzeComplaint(complaint);

//         // Create a new complaint document
//         const newComplaint = new Complaint({
//             name,
//             email,
//             complaint,
//             priority,
//             department,
//             images: images || [], // Handle case where no images are uploaded
//         });

//         // Save the complaint to the database
//         await newComplaint.save();

//         // Send a success response
//         res.status(201).json({
//             success: true,
//             message: "Complaint submitted successfully",
//             data: newComplaint,
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "Failed to submit complaint",
//             error: error.message,
//         });
//     }
// });


// // Start the server
// const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

// --------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------
// server.js
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const complaintRoutes = require("./routes/complaintRoutes"); // Import the complaint routes

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB
// mongoose.connect("mongodb+srv://yashgawande47:ADMIN@cluster2.3zkkq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster2")
//     .then(() => console.log("✅ MongoDB Connected Successfully!"))
//     .catch(err => console.error("❌ MongoDB Connection Error:", err));

// // Use the complaint routes
// app.use("/", complaintRoutes);

// // Start the server
// const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));   