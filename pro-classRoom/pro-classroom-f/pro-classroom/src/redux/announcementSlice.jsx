import { createSlice } from "@reduxjs/toolkit";
import { postAnnouncementToAPI } from "./api/postAnnouncementToAPI";

const initialState = {
  loading: false,
  error: null,
  success: false,
};

const announcementSlice = createSlice({
  name: "announcement",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postAnnouncementToAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postAnnouncementToAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(postAnnouncementToAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to post announcement"; // Set error message
      });
  },
});

export default announcementSlice.reducer;
