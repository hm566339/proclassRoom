import { createAsyncThunk } from "@reduxjs/toolkit";

export const deleteAssignmentApi = createAsyncThunk(
  "assignments/deleteAssignment",
  async (assignmentId, { rejectWithValue }) => {
    const token = localStorage.getItem("token");

    if (!token) {
      return rejectWithValue("No token found");
    }

    try {
      const response = await fetch(`http://localhost:8581/${assignmentId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete assignment");
      }

      return { assignmentId };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
