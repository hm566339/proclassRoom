// Assuming you're using the same structure for API calls
import { createAsyncThunk } from "@reduxjs/toolkit";

// Create a new Grading Category
export const createGradingCategory = createAsyncThunk(
  "gradingCategories/createGradingCategory",
  async (gradingCategoryData, thunkAPI) => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    try {
      const response = await fetch("http://localhost:8581/grading-categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(gradingCategoryData),
      });

      if (!response.ok) throw new Error("Failed to create Grading Category");

      const data = await response.json();
      return data; // Return the created Grading Category data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Fetch all Grading Categories
export const fetchGradingCategories = createAsyncThunk(
  "gradingCategories/fetchGradingCategories",
  async (_, thunkAPI) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:8581/grading", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch Grading Categories");

      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
