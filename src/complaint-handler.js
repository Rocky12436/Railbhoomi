document.addEventListener('DOMContentLoaded', function() {
    // Get form elements
    const complaintForm = document.getElementById('complaintText');
    const submitComplaintBtn = document.getElementById('submitComplaint');
    const complaintText = document.getElementById('complaintText');
    const aiAnalysis = document.getElementById('aiAnalysis');
    const detectedPriority = document.getElementById('detectedPriority');
    
    // Handle form submission
    submitComplaintBtn.addEventListener('click', async function() {
        // Basic validation
        if (!complaintText.value.trim()) {
            alert('Please enter your complaint');
            return;
        }
        
        // Get current user or anonymous
        const user = getCurrentUser();
        
        // Prepare complaint data
        const complaintData = {
            name: user ? user.name : 'Anonymous User',
            email: user ? user.email : 'anonymous@example.com',
            complaint: complaintText.value.trim(),
            priority: detectedPriority.textContent || 'Medium Priority',
            department: 'General' // Default department
        };
        
        // Show loading state
        submitComplaintBtn.disabled = true;
        submitComplaintBtn.innerHTML = '<i class="ri-loader-line animate-spin w-5 h-5 flex items-center justify-center mr-2"></i><span>Submitting...</span>';
        
        try {
            // Submit complaint to backend
            const response = await submitComplaint(complaintData);
            
            if (response.success) {
                // Show success message
                alert('Complaint submitted successfully!');
                complaintText.value = '';
                aiAnalysis.classList.add('hidden');
            } else {
                // Show error message
                alert(`Failed to submit complaint: ${response.message || response.error}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while submitting your complaint');
        } finally {
            // Reset button state
            submitComplaintBtn.disabled = false;
            submitComplaintBtn.innerHTML = '<i class="ri-send-plane-line w-5 h-5 flex items-center justify-center mr-2"></i><span>Submit Complaint</span>';
        }
    });
    
    // Automatic priority detection based on complaint text
    complaintText.addEventListener('input', function() {
        const text = complaintText.value.toLowerCase();
        let priority = 'Medium Priority';
        let priorityClass = 'bg-yellow-100 text-yellow-600';
        
        // Simple keyword-based priority detection
        if (text.includes('emergency') || text.includes('urgent') || 
            text.includes('danger') || text.includes('accident') ||
            text.includes('injury') || text.includes('fire')) {
            priority = 'High Priority';
            priorityClass = 'bg-red-100 text-red-600';
        } else if (text.includes('suggestion') || text.includes('feedback') ||
                  text.includes('improvement') || text.includes('minor')) {
            priority = 'Low Priority';
            priorityClass = 'bg-green-100 text-green-600';
        }
        
        // Update UI if text is long enough
        if (text.length > 15) {
            aiAnalysis.classList.remove('hidden');
            detectedPriority.className = `text-xs ml-2 px-2 py-1 rounded-full ${priorityClass}`;
            detectedPriority.textContent = priority;
        } else {
            aiAnalysis.classList.add('hidden');
        }
    });
    
    // Check login status and update UI accordingly
    function updateLoginStatus() {
        const user = getCurrentUser();
        const loginBtn = document.querySelector('button[onclick="window.location.href=\'login.html\'"]');
        const registerBtn = document.querySelector('button[onclick="window.location.href=\'registration.html\';"]');
        
        if (user) {
            // User is logged in
            loginBtn.innerHTML = `<i class="ri-user-line mr-2"></i>${user.name}`;
            loginBtn.onclick = null;
            registerBtn.innerHTML = 'Logout';
            registerBtn.onclick = function() {
                logout();
            };
        }
    }
    
    // Call the function to update login status
    updateLoginStatus();
});