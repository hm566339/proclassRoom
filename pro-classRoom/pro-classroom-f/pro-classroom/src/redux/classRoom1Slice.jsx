import { createSlice } from "@reduxjs/toolkit";
import { ApiClassRoom } from "../redux/api/ApiClassRoom";

const classRoom1Slice = createSlice({
  name: "classRoom1", // 🔥 FIXED name to match the store key
  initialState: {
    classRoom: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(ApiClassRoom.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ApiClassRoom.fulfilled, (state, action) => {
        state.loading = false;
        state.classRoom = action.payload;
      })
      .addCase(ApiClassRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const classRoom1Reducer = classRoom1Slice.reducer; // 🔥 also update export name if you want
export default classRoom1Reducer;
