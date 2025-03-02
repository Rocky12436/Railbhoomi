// document.addEventListener("DOMContentLoaded", () => {
//     console.log("🚀 Frontend Loaded!");

//     // Handle complaint form submission
//     const complaintForm = document.getElementById("complaintText"); 
//     if (complaintForm) {
//         complaintForm.addEventListener("submit", async (event) => {
//             event.preventDefault();

//             const formData = {
//                 name: document.getElementById("name").value,
//                 email: document.getElementById("email").value,
//                 complaint: document.getElementById("complaintText").value
//             };

//             try {
//                 const response = await fetch("/submit-complaint", {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json"
//                     },
//                     body: JSON.stringify(formData)
//                 });

//                 const result = await response.json();
//                 alert(result.message || "Complaint Submitted Successfully!");
//                 complaintForm.reset();
//             } catch (error) {
//                 console.error("Error submitting complaint:", error);
//             }
//         });
//     }
// });


document.addEventListener("DOMContentLoaded", () => {
    console.log("🚀 Frontend Loaded!");

    // Handle complaint form submission
    const complaintForm = document.getElementById("complaintText"); 
    if (complaintForm) {
        complaintForm.addEventListener("submit", async (event) => {
            event.preventDefault();

            // Collect form data
            const formData = {
                name: document.getElementById("name").value.trim(),
                email: document.getElementById("email").value.trim(),
                complaint: document.getElementById("complaintText").value.trim()
            };

            // Validate form data
            if (!formData.name || !formData.email || !formData.complaint) {
                alert("Please fill in all fields!");
                return;
            }

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                alert("Please enter a valid email address!");
                return;
            }

            try {
                // Send form data to the backend
                const response = await fetch("/submit-complaint", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                });

                // Handle response
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || "Failed to submit complaint");
                }

                const result = await response.json();
                alert(result.message || "Complaint Submitted Successfully!");

                // Reset the form
                complaintForm.reset();
            } catch (error) {
                console.error("Error submitting complaint:", error);
                alert(error.message || "An error occurred. Please try again.");
            }
        });
    }
});
