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
  images: [String],
  date: { type: Date, default: Date.now }
});

// Department User Schema
const departmentUserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  department: { type: String, enum: ['Cleanliness', 'Emergency', 'Canteen'], required: true },
  date: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);
const Complaint = mongoose.model("Complaint", complaintSchema);
const DepartmentUser = mongoose.model("DepartmentUser", departmentUserSchema);

module.exports = { User, Complaint, DepartmentUser };