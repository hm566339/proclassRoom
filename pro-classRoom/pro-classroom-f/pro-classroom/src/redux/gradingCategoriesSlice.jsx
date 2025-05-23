import { createSlice } from "@reduxjs/toolkit";
import {
  createGradingCategory,
  fetchGradingCategories,
} from "./api/createGradingCategory";

// Initial state for Grading Categories
const initialState = {
  gradingCategories: [],
  loading: false,
  error: null,
  success: false,
};

const gradingCategoriesSlice = createSlice({
  name: "gradingCategories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handling the createGradingCategory async action
    builder
      .addCase(createGradingCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createGradingCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.gradingCategories.push(action.payload); // Add new category to the list
      })
      .addCase(createGradingCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create Grading Category";
      })

      // Handling the fetchGradingCategories async action
      .addCase(fetchGradingCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGradingCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.gradingCategories = action.payload || [];
      })
      .addCase(fetchGradingCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch Grading Categories";
      });
  },
});

export default gradingCategoriesSlice.reducer;
