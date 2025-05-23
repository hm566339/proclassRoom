import { createAsyncThunk } from "@reduxjs/toolkit";

export const ApiEnrollClass = createAsyncThunk(
  "classroom/fetchClassrooms",
  async (_, thunkAPI) => {
    const token = localStorage.getItem("token");
    // console.log(token);

    const user = localStorage.getItem("user");

    try {
      const response = await fetch(`http://localhost:8581/student/${user}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      //   console.log(response);

      if (!response.ok) throw new Error("Failed to fetch classrooms");

      const data = await response.json();
      //   console.log(data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
