import { createAsyncThunk } from "@reduxjs/toolkit";

export const postClassroomToAPI = createAsyncThunk(
  "classroom/postClassroom",
  async (classroomData, thunkAPI) => {
    const token = localStorage.getItem("token");
    // console.log(token);

    try {
      const response = await fetch("http://localhost:8581/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(classroomData),
      });

      if (!response.ok) throw new Error("Failed to post classroom");

      const data = await response.json();
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
