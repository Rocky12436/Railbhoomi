const BASE_URL = "http://localhost:5001"; // Backend server URL

// Register a new user
export const registerUser = async (userData) => {
    try {
        const response = await fetch(`${BASE_URL}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            throw new Error("Registration failed");
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
        const response = await fetch(`${BASE_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        });

        if (!response.ok) {
            throw new Error("Login failed");
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
        const response = await fetch(`${BASE_URL}/submit-complaint`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(complaintData),
        });

        if (!response.ok) {
            throw new Error("Complaint submission failed");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error during complaint submission:", error);
        throw error;
    }
};