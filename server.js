const express = require("express");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const connectFirebase = require("./firebaseConfig");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from "src"
app.use(express.static(path.join(__dirname, "src")));
app.use('/uploads', express.static(path.join(__dirname, 'src', 'uploads')));

// Initialize Firebase
const db = connectFirebase();

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'src', 'uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
  fileFilter: (req, file, cb) => {
    const allowedFileTypes = /jpeg|jpg|png|gif/;
    const extname = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedFileTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb('Error: Only images are allowed!');
    }
  }
});

// Submit a complaint with file upload support
app.post("/submit-complaint", upload.array('images', 5), async (req, res) => {
  try {
    const { name, email, complaint, priority, department } = req.body;

    // Create image paths array
    const imagePaths = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];

    const complaintData = {
      name: name || "Anonymous",
      email: email || "no-email@example.com",
      complaint,
      priority: priority || "Medium Priority",
      department: department || "General",
      status: "New",
      images: imagePaths,
      date: new Date()
    };

    const docRef = await db.collection('complaints').add(complaintData);

    res.status(201).json({
      success: true,
      message: "Complaint submitted successfully!",
      data: { id: docRef.id, ...complaintData },
    });
  } catch (error) {
    console.error("Complaint submission error:", error);
    res.status(500).json({ 
      success: false, 
      message: error.message || "An error occurred while submitting the complaint" 
    });
  }
});

// Get all complaints
app.get("/complaints", async (req, res) => {
  try {
    const snapshot = await db.collection('complaints').orderBy('date', 'desc').get();
    const complaints = [];
    
    snapshot.forEach(doc => {
      complaints.push({ id: doc.id, ...doc.data() });
    });

    res.json({ success: true, data: complaints });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get complaints by user email
app.get("/user-complaints/:email", async (req, res) => {
  try {
    const snapshot = await db.collection('complaints')
      .where('email', '==', req.params.email)
      .orderBy('date', 'desc')
      .get();
    
    const complaints = [];
    snapshot.forEach(doc => {
      complaints.push({ id: doc.id, ...doc.data() });
    });

    res.json({ success: true, data: complaints });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get complaints by department
app.get("/department-complaints/:department", async (req, res) => {
  try {
    const snapshot = await db.collection('complaints')
      .where('department', '==', req.params.department)
      .orderBy('date', 'desc')
      .get();
    
    const complaints = [];
    snapshot.forEach(doc => {
      complaints.push({ id: doc.id, ...doc.data() });
    });

    res.json({ success: true, data: complaints });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update complaint status
app.put("/complaint/:id", async (req, res) => {
  try {
    const docRef = db.collection('complaints').doc(req.params.id);
    await docRef.update(req.body);
    
    const updatedDoc = await docRef.get();
    if (!updatedDoc.exists) {
      return res.status(404).json({ success: false, message: "Complaint not found" });
    }

    res.json({ success: true, data: { id: updatedDoc.id, ...updatedDoc.data() } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// User registration
app.post("/register", async (req, res) => {
  try {
    const { name, email, password, role = "User" } = req.body;

    // Check if user already exists
    const existingUser = await db.collection('users').where('email', '==', email).get();
    if (!existingUser.empty) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const userData = {
      name,
      email,
      password, // In production, hash this password
      role,
      date: new Date()
    };

    const docRef = await db.collection('users').add(userData);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: { id: docRef.id, name, email, role },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// User login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const snapshot = await db.collection('users').where('email', '==', email).get();
    
    if (snapshot.empty) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const userDoc = snapshot.docs[0];
    const userData = userDoc.data();

    // Check password (in production, use proper password hashing)
    if (userData.password !== password) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    res.json({
      success: true,
      message: "Login successful",
      data: { id: userDoc.id, name: userData.name, email: userData.email, role: userData.role },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Department login
app.post("/department-login", async (req, res) => {
  try {
    const { email, password, department } = req.body;

    const snapshot = await db.collection('departmentUsers')
      .where('email', '==', email)
      .where('department', '==', department)
      .get();
    
    if (snapshot.empty) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const userDoc = snapshot.docs[0];
    const userData = userDoc.data();

    // Check password (in production, use proper password hashing)
    if (userData.password !== password) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    res.json({
      success: true,
      message: "Login successful",
      data: {
        id: userDoc.id,
        name: userData.name,
        email: userData.email,
        department: userData.department,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create sample department users (for testing)
app.get("/setup-department-users", async (req, res) => {
  try {
    // Check if department users already exist
    const existingUsers = await db.collection('departmentUsers').get();
    if (!existingUsers.empty) {
      return res.json({
        success: true,
        message: "Department users already set up",
        count: existingUsers.size,
      });
    }

    // Create department users
    const departmentUsers = [
      {
        name: "Cleanliness Department",
        email: "clean@railway.com",
        password: "clean123",
        department: "Cleanliness",
        date: new Date()
      },
      {
        name: "Emergency Department",
        email: "emergency@railway.com",
        password: "emergency123",
        department: "Emergency",
        date: new Date()
      },
      {
        name: "Canteen Department",
        email: "canteen@railway.com",
        password: "canteen123",
        department: "Canteen",
        date: new Date()
      },
    ];

    const batch = db.batch();
    departmentUsers.forEach(user => {
      const docRef = db.collection('departmentUsers').doc();
      batch.set(docRef, user);
    });
    
    await batch.commit();

    res.json({
      success: true,
      message: "Department users created successfully",
      data: departmentUsers.map((user) => ({
        name: user.name,
        email: user.email,
        department: user.department,
      })),
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Serve index.html for all routes (for client-side routing)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "src", "index.html"));
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 Open your browser and go to: http://localhost:${PORT}`);
  console.log(`📋 Test setup: http://localhost:${PORT}/setup-department-users`);
});