import { createAsyncThunk } from "@reduxjs/toolkit";

export const deleteClassRoom = createAsyncThunk(
  "classrooms/deleteClassRoom",
  async (class_id, { rejectWithValue }) => {
    const token = localStorage.getItem("token");

    if (!token) {
      return rejectWithValue("No token found");
    }

    console.log(class_id);

    try {
      const response = await fetch(
        `http://localhost:8581/deletclass/${class_id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete classroom");
      }

      return { class_id };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
