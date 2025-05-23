import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchClassroomsFromAPI = createAsyncThunk(
  "classroom/fetchClassrooms",
  async (_, thunkAPI) => {
    const token = localStorage.getItem("token");
    // console.log(token);

    const user = localStorage.getItem("user");

    try {
      const response = await fetch(`http://localhost:8581/class/${user}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch classrooms");

      const data = await response.json();
      return data;
      console.log(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
