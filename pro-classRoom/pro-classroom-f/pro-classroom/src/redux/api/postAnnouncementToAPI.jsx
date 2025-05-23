import { createAsyncThunk } from "@reduxjs/toolkit";

export const postAnnouncementToAPI = createAsyncThunk(
  "announcements/postAnnouncements",
  async (announcementData, thunkAPI) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:8581/announcement", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(announcementData),
      });

      if (!response.ok) {
        throw new Error("Failed to post announcement");
      }

      const data = await response.json();
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message); // Reject with error message
    }
  }
);
