import { createSlice } from "@reduxjs/toolkit";
import { ListOfAssignmentApi } from "@/redux/api/ListOfAssignmentApi"; // Import the async thunk

const initialState = {
  assignments: [], // Renamed from classrooms to assignments
  loading: false,
  error: null,
};

const ListOfAssignmentSlice = createSlice({
  name: "ListOfAssignment", // Renamed to match 'ListOfAssignment'
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(ListOfAssignmentApi.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset errors
      })
      .addCase(ListOfAssignmentApi.fulfilled, (state, action) => {
        state.loading = false;
        state.assignments = action.payload; // Storing assignments data
      })
      .addCase(ListOfAssignmentApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch assignments"; // Error message
      });
  },
});

export default ListOfAssignmentSlice.reducer;
