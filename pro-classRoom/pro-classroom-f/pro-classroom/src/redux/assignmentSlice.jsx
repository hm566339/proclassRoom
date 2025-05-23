// // src/redux/slices/assignmentsSlice.js
// import { createSlice } from "@reduxjs/toolkit";
// import { deleteAssignmentApi } from "../redux/api/delete/deleteAssignmentApi"; // Import the async action

// const initialState = {
//   assignments: [],
//   loading: false,
//   error: null,
// };

// const assignmentsSlice = createSlice({
//   name: "assignments",
//   initialState,
//   reducers: {
//     setAssignments: (state, action) => {
//       state.assignments = action.payload;
//     },
//     deleteAssignmentFromState: (state, action) => {
//       const assignmentId = action.payload;
//       state.assignments = state.assignments.filter(
//         (assignment) => assignment.assignmentId !== assignmentId
//       );
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(deleteAssignmentApi.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(deleteAssignmentApi.fulfilled, (state, action) => {
//         state.loading = false;
//         const assignmentId = action.payload.assignmentId; // Assuming the API returns the deleted assignment ID
//         // Remove the deleted assignment from the state
//         state.assignments = state.assignments.filter(
//           (assignment) => assignment.assignmentId !== assignmentId
//         );
//       })
//       .addCase(deleteAssignmentApi.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || "Failed to delete assignment";
//       });
//   },
// });

// export const { setAssignments, deleteAssignmentFromState } =
//   assignmentsSlice.actions;

// export default assignmentsSlice.reducer;
