// Mock AI model function
const analyzeComplaint = (complaintText) => {
    // Simulate AI analysis
    const priorities = ["High Priority", "Medium Priority", "Low Priority"];
    const departments = ["Cleanliness", "Emergency", "Canteen", "General"];

    // Simple rules for priority and department (replace with actual AI logic later)
    let priority, department;

    if (complaintText.toLowerCase().includes("delay") || complaintText.toLowerCase().includes("late")) {
        priority = "High Priority";
        department = "Emergency";
    } else if (complaintText.toLowerCase().includes("clean") || complaintText.toLowerCase().includes("dirty")) {
        priority = "Medium Priority";
        department = "Cleanliness";
    } else if (complaintText.toLowerCase().includes("food") || complaintText.toLowerCase().includes("canteen")) {
        priority = "Medium Priority";
        department = "Canteen";
    } else {
        // Default priority and department
        priority = "Low Priority";
        department = "General";
    }

    return { priority, department };
};

module.exports = analyzeComplaint;