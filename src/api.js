const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5001";

// Helper function for making fetch requests
const fetchWithTimeout = (url, options, timeout = 5000) => {
    return Promise.race([
        fetch(url, options),
        new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Request timed out")), timeout)
        ),
    ]);
};

// Register a new user
export const registerUser = async (userData) => {
    try {
        const response = await fetchWithTimeout(`${BASE_URL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Registration failed");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error during registration:", error);
        throw error;
    }
};

// Log in a user
export const loginUser = async (credentials) => {
    try {
        const response = await fetchWithTimeout(`${BASE_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Login failed");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error during login:", error);
        throw error;
    }
};

// Submit a complaint
export const submitComplaint = async (complaintData) => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetchWithTimeout(`${BASE_URL}/submit-complaint`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(complaintData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Complaint submission failed");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error during complaint submission:", error);
        throw error;
    }
};

// Fetch all complaints
export const fetchComplaints = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetchWithTimeout(`${BASE_URL}/complaints`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Failed to fetch complaints");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching complaints:", error);
        throw error;
    }
};