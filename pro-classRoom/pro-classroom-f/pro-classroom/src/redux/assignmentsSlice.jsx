// src/redux/slices/assignmentsSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { Allassignment } from "./api/Allassignment"; // Import both async thunks
import { deleteAssignmentApi } from "./api/delete/deleteAssignmentApi";
const initialState = {
  assignments: [],
  loading: false,
  error: null,
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    setAssignments: (state, action) => {
      state.assignments = action.payload;
    },
    // Optionally, you can handle deleting assignment from the Redux state
    deleteAssignmentFromState: (state, action) => {
      const assignmentId = action.payload;
      state.assignments = state.assignments.filter(
        (assignment) => assignment.assignmentId !== assignmentId
      );
    },
  },
  extraReducers: (builder) => {
    // Handling the fetching of all assignments
    builder
      .addCase(Allassignment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(Allassignment.fulfilled, (state, action) => {
        state.loading = false;
        state.assignments = action.payload || []; // Store the fetched assignments
      })
      .addCase(Allassignment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch assignments";
      })

      // Handling the delete assignment API
      .addCase(deleteAssignmentApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAssignmentApi.fulfilled, (state, action) => {
        state.loading = false;
        const assignmentId = action.payload.assignmentId;
        // Remove the deleted assignment from the state
        state.assignments = state.assignments.filter(
          (assignment) => assignment.assignmentId !== assignmentId
        );
      })
      .addCase(deleteAssignmentApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete assignment";
      });
  },
});

export const { setAssignments, deleteAssignmentFromState } =
  assignmentsSlice.actions;

export default assignmentsSlice.reducer;
