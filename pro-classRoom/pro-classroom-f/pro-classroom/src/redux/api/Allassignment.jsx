import { createAsyncThunk } from "@reduxjs/toolkit";

// Fetch all assignments API action
export const Allassignment = createAsyncThunk(
  "assignments/fetchAssignments", // Action type
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token"); // Get token from localStorage
    const user = localStorage.getItem("user"); // Get user info from localStorage

    if (!token) {
      return rejectWithValue("No token found"); // Handle case when token is not available
    }

    try {
      const response = await fetch(
        `http://localhost:8581/assignments/${user}`, // API endpoint
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Pass the token in Authorization header
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch assignments");

      const data = await response.json();
      return data; // Return the fetched assignments data
    } catch (error) {
      return rejectWithValue(error.message); // Return error message for rejected state
    }
  }
);
