// Expect a cold start of 5 to 10 secs on this service
const API_BASE_URL = "https://project-tempest-hiring.up.railway.app";

/**
 * TASK: Implement API client for fetching data from the backend API endpoint
 */
export const apiClient = async (endpoint, options = {}) => {
    const url = `${API_BASE_URL}${endpoint}`;

    const defaultHeaders = {
        "Content-Type": "application/json",
    };

    const config = {
        method: "GET",
        headers: defaultHeaders,
        ...options,
    };

    try {
        const response = await fetch(url, config);
        if (!response.ok) {
            throw new Error(`HTTP error ! Status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("apiClient error", error);
        throw error;
    }
};
