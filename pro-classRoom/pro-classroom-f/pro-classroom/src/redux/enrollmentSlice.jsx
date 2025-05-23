import { createSlice } from "@reduxjs/toolkit";
import { EnrollClassApi } from "@/redux/api/EnrollClassApi"; // Your API action import

const initialState = {
  enrollStatus: "idle",
  error: null,
  enrollmentData: null,
};

const enrollmentSlice = createSlice({
  name: "enrollment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(EnrollClassApi.pending, (state) => {
        state.enrollStatus = "loading";
      })
      .addCase(EnrollClassApi.fulfilled, (state, action) => {
        state.enrollStatus = "succeeded";
        state.enrollmentData = action.payload;
      })
      .addCase(EnrollClassApi.rejected, (state, action) => {
        state.enrollStatus = "failed";
        state.error = action.payload;
      });
  },
});

export default enrollmentSlice.reducer;
