// document.addEventListener('DOMContentLoaded', function () {
//     const submitComplaintBtn = document.getElementById('submitComplaint');
//     const complaintText = document.getElementById('complaintText');
//     const imageUpload = document.getElementById('imageUpload');
//     const aiAnalysis = document.getElementById('aiAnalysis');
//     const detectedPriority = document.getElementById('detectedPriority');
  
//     submitComplaintBtn.addEventListener('click', async (e) => {
//       e.preventDefault(); // Prevent form submission
  
//       const complaint = complaintText.value.trim();
//       const images = imageUpload.files;
  
//       if (!complaint) {
//         alert('Please describe your complaint.');
//         return;
//       }
  
//       // Create FormData object to send text and images
//       const formData = new FormData();
//       formData.append('complaint', complaint);
//       for (let i = 0; i < images.length; i++) {
//         formData.append('images', images[i]);
//       }
  
//       try {
//         // Send complaint data to the backend
//         const response = await fetch('/submit-complaint', {
//           method: 'POST',
//           body: formData,
//         });
  
//         const data = await response.json();
  
//         if (response.ok) {
//           // Display success message
//           alert('Complaint submitted successfully!');
//           console.log(data);
  
//           // Clear the form
//           complaintText.value = '';
//           imageUpload.value = '';
//           aiAnalysis.classList.add('hidden'); // Hide AI analysis section
//         } else {
//           // Display error message
//           alert(`Error: ${data.message}`);
//         }
//       } catch (error) {
//         console.error('Error:', error);
//         alert('An error occurred while submitting the complaint.');
//       }
//     });
  
//     // Optional: Analyze complaint text for priority (simulated)
//     complaintText.addEventListener('input', () => {
//       const text = complaintText.value.trim();
//       if (text.length > 20) {
//         analyzeComplaint(text);
//       }
//     });
  
//     function analyzeComplaint(text) {
//       // Simulate AI analysis (replace with actual AI logic)
//       aiAnalysis.classList.remove('hidden');
//       setTimeout(() => {
//         const priorities = [
//           { class: 'bg-red-100 text-red-600', text: 'High Priority' },
//           { class: 'bg-yellow-100 text-yellow-600', text: 'Medium Priority' },
//           { class: 'bg-green-100 text-green-600', text: 'Low Priority' },
//         ];
//         const randomPriority = priorities[Math.floor(Math.random() * priorities.length)];
//         detectedPriority.className = `text-xs ml-2 px-2 py-1 rounded-full ${randomPriority.class}`;
//         detectedPriority.textContent = randomPriority.text;
//       }, 1000);
//     }
//   });





document.addEventListener('DOMContentLoaded', function () {
    const submitComplaintBtn = document.getElementById('submitComplaint');
    const complaintText = document.getElementById('complaintText');
    const imageUpload = document.getElementById('imageUpload');
    const aiAnalysis = document.getElementById('aiAnalysis');
    const detectedPriority = document.getElementById('detectedPriority');
    const nameInput = document.getElementById('nameInput');
    const emailInput = document.getElementById('emailInput');
    const prioritySelect = document.getElementById('prioritySelect');
    const departmentSelect = document.getElementById('departmentSelect');
  
    submitComplaintBtn.addEventListener('click', async (e) => {
      e.preventDefault();
  
      const complaint = complaintText.value.trim();
      const images = imageUpload.files;
  
      if (!complaint) {
        alert('Please describe your complaint.');
        return;
      }
  
      // Create FormData object to send text and images
      const formData = new FormData();
      formData.append('complaint', complaint);
      
      // Add optional fields if available
      if (nameInput) formData.append('name', nameInput.value || 'Anonymous');
      if (emailInput) formData.append('email', emailInput.value || 'no-email@example.com');
      if (prioritySelect) formData.append('priority', prioritySelect.value);
      if (departmentSelect) formData.append('department', departmentSelect.value);
  
      // Append images
      for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i]);
      }
  
      try {
        const response = await fetch('/submit-complaint', {
          method: 'POST',
          body: formData
        });
  
        const data = await response.json();
  
        if (response.ok) {
          alert('Complaint submitted successfully!');
          console.log(data);
  
          // Clear the form
          complaintText.value = '';
          imageUpload.value = '';
          if (nameInput) nameInput.value = '';
          if (emailInput) emailInput.value = '';
          if (prioritySelect) prioritySelect.selectedIndex = 0;
          if (departmentSelect) departmentSelect.selectedIndex = 0;
  
          if (aiAnalysis) aiAnalysis.classList.add('hidden');
        } else {
          alert(`Error: ${data.message || 'Unknown error occurred'}`);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while submitting the complaint.');
      }
    });
  
    // Optional AI analysis function
    function analyzeComplaint(text) {
      if (aiAnalysis && detectedPriority) {
        aiAnalysis.classList.remove('hidden');
        setTimeout(() => {
          const priorities = [
            { class: 'bg-red-100 text-red-600', text: 'High Priority' },
            { class: 'bg-yellow-100 text-yellow-600', text: 'Medium Priority' },
            { class: 'bg-green-100 text-green-600', text: 'Low Priority' },
          ];
          const randomPriority = priorities[Math.floor(Math.random() * priorities.length)];
          detectedPriority.className = `text-xs ml-2 px-2 py-1 rounded-full ${randomPriority.class}`;
          detectedPriority.textContent = randomPriority.text;
        }, 1000);
      }
    }
  
    // Trigger AI analysis on complaint input
    if (complaintText) {
      complaintText.addEventListener('input', () => {
        const text = complaintText.value.trim();
        if (text.length > 20) {
          analyzeComplaint(text);
        }
      });
    }
  });