import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { submitAssignment } from "@/redux/api/submitAssignment"; // Assuming you have this API for submitting assignments
import { ListOfAssignmentApi } from "@/redux/api/ListOfAssignmentApi"; // List of assignments API

// Thunks for async actions
export const fetchAssignments = createAsyncThunk(
  "assignments/fetchAssignments",
  async () => {
    const response = await ListOfAssignmentApi(); // Fetch assignments
    return response;
  }
);

export const submitAssignmentAction = createAsyncThunk(
  "assignments/submitAssignment",
  async (assignmentData) => {
    const response = await submitAssignment(assignmentData); // Submit assignment
    return response;
  }
);

// Slice
const assignmentSubmissionSlice = createSlice({
  name: "assignmentSubmission",
  initialState: {
    assignments: [],
    loading: false,
    error: null,
    submissionStatus: "idle", // idle, loading, success, failed
  },
  reducers: {
    // Optionally add additional reducers for state manipulations if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssignments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAssignments.fulfilled, (state, action) => {
        state.loading = false;
        state.assignments = action.payload; // Set assignments
      })
      .addCase(fetchAssignments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(submitAssignmentAction.pending, (state) => {
        state.submissionStatus = "loading";
      })
      .addCase(submitAssignmentAction.fulfilled, (state) => {
        state.submissionStatus = "success";
      })
      .addCase(submitAssignmentAction.rejected, (state, action) => {
        state.submissionStatus = "failed";
        state.error = action.error.message;
      });
  },
});

export default assignmentSubmissionSlice.reducer;
