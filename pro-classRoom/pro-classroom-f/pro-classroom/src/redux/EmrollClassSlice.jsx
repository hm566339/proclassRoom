import { createSlice } from "@reduxjs/toolkit";
import { ApiEnrollClass } from "@/redux/api/ApiEnrollClass"; // Adjust the import path accordingly

const initialState = {
  classrooms: [],
  loading: false,
  error: null,
};

const EmrollClassSlice = createSlice({
  name: "EmrollClass", // Updated name here
  initialState,
  reducers: {
    resetClassrooms: (state) => {
      state.classrooms = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(ApiEnrollClass.pending, (state) => {
        state.loading = true;
      })
      .addCase(ApiEnrollClass.fulfilled, (state, action) => {
        state.loading = false;
        state.classrooms = action.payload;
      })
      .addCase(ApiEnrollClass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetClassrooms } = EmrollClassSlice.actions;

export default EmrollClassSlice.reducer;
