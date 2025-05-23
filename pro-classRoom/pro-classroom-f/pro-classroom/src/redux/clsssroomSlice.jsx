import { createSlice } from "@reduxjs/toolkit";
import { postClassroomToAPI } from "@/redux/api/postClassroomToAPI";
import { fetchClassroomsFromAPI } from "@/redux/api/fetchClassroomsFromAPI ";

const classroomSlice = createSlice({
  name: "classroom",
  initialState: {
    classrooms: [],
    loading: false,
    error: null,
  },
  reducers: {
    addClassroom: (state, action) => {
      state.classrooms.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postClassroomToAPI.pending, (state) => {
        state.loading = true;
      })
      .addCase(postClassroomToAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.classrooms.push(action.payload);
      })
      .addCase(postClassroomToAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchClassroomsFromAPI.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClassroomsFromAPI.fulfilled, (state, action) => {
        state.loading = false;
        state.classrooms = action.payload;
      })
      .addCase(fetchClassroomsFromAPI.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addClassroom } = classroomSlice.actions;
export default classroomSlice.reducer;
