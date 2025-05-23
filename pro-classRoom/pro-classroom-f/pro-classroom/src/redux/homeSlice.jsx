import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  home: [],
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    addHome: (state, action) => {
      state.home.push(action.payload);
    },
    clearHome: (state) => {
      state.classrooms = [];
    },
  },
});

export const { addClassroom, clearClassroom } = classroomSlice.actions;
export default classroomSlice.reducer;
