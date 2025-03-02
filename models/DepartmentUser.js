const mongoose = require("mongoose");

const departmentUserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    department: { type: String, enum: ['Cleanliness', 'Emergency', 'Canteen'], required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("DepartmentUser", departmentUserSchema);