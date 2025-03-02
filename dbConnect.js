// const express = require("express");
// const cors = require("cors");
// const path = require("path");
// const connectDB = require("./dbConnect"); // Import the database connection function

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Serve static files from "src"
// app.use(express.static(path.join(__dirname, "src")));

// // Connect to MongoDB
// connectDB();

// // Define schemas
// const mongoose = require("mongoose");

// // Complaint schema
// const complaintSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     email: { type: String, required: true },
//     complaint: { type: String, required: true },
//     priority: { type: String, enum: ['High Priority', 'Medium Priority', 'Low Priority'], default: 'Medium Priority' },
//     status: { type: String, enum: ['New', 'In Progress', 'Resolved', 'Closed'], default: 'New' },
//     department: { type: String, enum: ['Cleanliness', 'Emergency', 'Canteen', 'General'], default: 'General' },
//     images: [String], // Array of image URLs/paths
//     date: { type: Date, default: Date.now }
// });

// // User schema
// const userSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     role: { type: String, enum: ['User', 'Admin'], default: 'User' },
//     date: { type: Date, default: Date.now }
// });

// // Department user schema
// const departmentUserSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     department: { type: String, enum: ['Cleanliness', 'Emergency', 'Canteen'], required: true },
//     date: { type: Date, default: Date.now }
// });

// // Create models
// const Complaint = mongoose.model("Complaint", complaintSchema);
// const User = mongoose.model("User", userSchema);
// const DepartmentUser = mongoose.model("DepartmentUser", departmentUserSchema);

// // API Routes

// // Submit a complaint
// app.post("/submit-complaint", async (req, res) => {
//     try {
//         const newComplaint = new Complaint(req.body);
//         await newComplaint.save();
//         res.status(201).json({ 
//             success: true,
//             message: "Complaint submitted successfully!",
//             data: newComplaint
//         });
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// });

// // Get all complaints
// app.get("/complaints", async (req, res) => {
//     try {
//         const complaints = await Complaint.find().sort({ date: -1 }); // Most recent first
//         res.json({ success: true, data: complaints });
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// });

// // Get complaints by user email
// app.get("/user-complaints/:email", async (req, res) => {
//     try {
//         const complaints = await Complaint.find({ email: req.params.email }).sort({ date: -1 });
//         res.json({ success: true, data: complaints });
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// });

// // Get complaints by department
// app.get("/department-complaints/:department", async (req, res) => {
//     try {
//         const complaints = await Complaint.find({ department: req.params.department }).sort({ date: -1 });
//         res.json({ success: true, data: complaints });
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// });

// // Update complaint status
// app.put("/complaint/:id", async (req, res) => {
//     try {
//         const updatedComplaint = await Complaint.findByIdAndUpdate(
//             req.params.id,
//             { $set: req.body },
//             { new: true }
//         );
        
//         if (!updatedComplaint) {
//             return res.status(404).json({ success: false, message: "Complaint not found" });
//         }
        
//         res.json({ success: true, data: updatedComplaint });
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// });

// // User registration
// app.post("/register", async (req, res) => {
//     try {
//         // Check if user already exists
//         const existingUser = await User.findOne({ email: req.body.email });
//         if (existingUser) {
//             return res.status(400).json({ success: false, message: "User already exists" });
//         }
        
//         // Create new user
//         const newUser = new User(req.body);
//         await newUser.save();
        
//         res.status(201).json({ 
//             success: true, 
//             message: "User registered successfully",
//             data: { name: newUser.name, email: newUser.email, role: newUser.role }
//         });
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// });

// // User login
// app.post("/login", async (req, res) => {
//     try {
//         const { email, password } = req.body;
        
//         // Find user
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({ success: false, message: "Invalid credentials" });
//         }
        
//         // Check password (in a real app, use proper password hashing)
//         if (user.password !== password) {
//             return res.status(400).json({ success: false, message: "Invalid credentials" });
//         }
        
//         res.json({ 
//             success: true, 
//             message: "Login successful",
//             data: { name: user.name, email: user.email, role: user.role }
//         });
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// });

// // Department login
// app.post("/department-login", async (req, res) => {
//     try {
//         const { email, password, department } = req.body;
        
//         // Find department user
//         const departmentUser = await DepartmentUser.findOne({ email, department });
//         if (!departmentUser) {
//             return res.status(400).json({ success: false, message: "Invalid credentials" });
//         }
        
//         // Check password (in a real app, use proper password hashing)
//         if (departmentUser.password !== password) {
//             return res.status(400).json({ success: false, message: "Invalid credentials" });
//         }
        
//         res.json({ 
//             success: true, 
//             message: "Login successful",
//             data: { 
//                 name: departmentUser.name, 
//                 email: departmentUser.email, 
//                 department: departmentUser.department 
//             }
//         });
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// });

// // Create sample department users (for testing)
// app.get("/setup-department-users", async (req, res) => {
//     try {
//         // Check if department users already exist
//         const existingUsers = await DepartmentUser.find();
//         if (existingUsers.length > 0) {
//             return res.json({ 
//                 success: true, 
//                 message: "Department users already set up",
//                 count: existingUsers.length
//             });
//         }
        
//         // Create department users
//         const departmentUsers = [
//             {
//                 name: "Cleanliness Department",
//                 email: "clean@railway.com",
//                 password: "clean123",
//                 department: "Cleanliness"
//             },
//             {
//                 name: "Emergency Department",
//                 email: "emergency@railway.com",
//                 password: "emergency123",
//                 department: "Emergency"
//             },
//             {
//                 name: "Canteen Department",
//                 email: "canteen@railway.com",
//                 password: "canteen123",
//                 department: "Canteen"
//             }
//         ];
        
//         await DepartmentUser.insertMany(departmentUsers);
        
//         res.json({ 
//             success: true, 
//             message: "Department users created successfully",
//             data: departmentUsers.map(user => ({
//                 name: user.name,
//                 email: user.email,
//                 department: user.department
//             }))
//         });
//     } catch (error) {
//         res.status(500).json({ success: false, error: error.message });
//     }
// });

// // Serve index.html for all routes (for client-side routing)


// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, 'src', 'index.html'));
// });


// // Start server
// const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));






const mongoose = require("mongoose");

// User Schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['User', 'Admin'], default: 'User' },
    date: { type: Date, default: Date.now }
});

// Complaint Schema
const complaintSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    complaint: { type: String, required: true },
    priority: { type: String, enum: ['High Priority', 'Medium Priority', 'Low Priority'], default: 'Medium Priority' },
    status: { type: String, enum: ['New', 'In Progress', 'Resolved', 'Closed'], default: 'New' },
    department: { type: String, enum: ['Cleanliness', 'Emergency', 'Canteen', 'General'], default: 'General' },
    images: [String], // Array of image URLs/paths
    date: { type: Date, default: Date.now }
});

// Create Models
const User = mongoose.model("User", userSchema);
const Complaint = mongoose.model("Complaint", complaintSchema);

module.exports = { User, Complaint };