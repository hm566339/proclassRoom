import { createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch list of assignments
export const ListOfAssignmentApi = createAsyncThunk(
  "assignment/fetchAssignments", // We renamed this to match 'ListOfAssignment'
  async (_, thunkAPI) => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    try {
      const response = await fetch(
        `http://localhost:8581/students/${user}/assignments`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch assignments");

      const data = await response.json();
      return data; // Return fetched assignments data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
