const Complaint = require("../models/Complaint");
const analyzeComplaint = require("./aiModel"); // Import the AI model

// Submit a complaint
exports.submitComplaint = async (req, res) => {
  try {
    const { name, email, complaint, images } = req.body;

    // Analyze the complaint using the AI model
    const { priority, department } = analyzeComplaint(complaint);

    // Create new complaint
    const newComplaint = new Complaint({
      name,
      email,
      complaint,
      priority,
      department,
      images,
    });

    await newComplaint.save();

    res.status(201).json({
      success: true,
      message: "Complaint submitted successfully!",
      data: newComplaint,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get all complaints
exports.getAllComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ date: -1 }); // Most recent first
    res.json({ success: true, data: complaints });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get complaints by user email
exports.getUserComplaints = async (req, res) => {
  try {
    const { email } = req.params;
    const complaints = await Complaint.find({ email }).sort({ date: -1 });
    res.json({ success: true, data: complaints });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get complaints by department
exports.getDepartmentComplaints = async (req, res) => {
  try {
    const { department } = req.params;
    const complaints = await Complaint.find({ department }).sort({ date: -1 });
    res.json({ success: true, data: complaints });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update complaint status
exports.updateComplaintStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedComplaint = await Complaint.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedComplaint) {
      return res.status(404).json({ success: false, message: "Complaint not found" });
    }

    res.json({ success: true, data: updatedComplaint });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};