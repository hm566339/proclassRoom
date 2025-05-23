import { createAsyncThunk } from "@reduxjs/toolkit";

export const EnrollClassApi = createAsyncThunk(
  "classroom/enroll",
  async (payload, thunkAPI) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:8581/enroll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to enroll in classroom");
      }

      const data = await response.json();
      console.log("Enroll success:", data);
      return data;
    } catch (error) {
      console.error("Enroll error:", error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
