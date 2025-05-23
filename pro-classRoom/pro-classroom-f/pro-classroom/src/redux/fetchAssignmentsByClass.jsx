import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AllAssidnmentclass } from "@/redux/api/AllAssidnmentclass";

export const fetchAssignmentsByClass = createAsyncThunk(
  "assignmentsByClass/fetch",
  async (class_id, { rejectWithValue }) => {
    try {
      console.log("Fetching assignments for class ID:", class_id);
      const data = await AllAssidnmentclass(class_id);
      // console.log("Fetched assignment data:", data);
      return data;
    } catch (error) {
      console.error("Error fetching assignments:", error.message);
      return rejectWithValue(error.message);
    }
  }
);

const AssignmentByClassSlice = createSlice({
  name: "assignmentsByClass",
  initialState: {
    assignments: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearAssignments(state) {
      console.log("Clearing assignments state");
      state.assignments = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssignmentsByClass.pending, (state) => {
        // console.log("fetchAssignmentsByClass.pending");
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAssignmentsByClass.fulfilled, (state, action) => {
        // console.log("fetchAssignmentsByClass.fulfilled:", action.payload);
        state.loading = false;
        state.assignments = action.payload;
      })
      .addCase(fetchAssignmentsByClass.rejected, (state, action) => {
        // console.log("fetchAssignmentsByClass.rejected:", action.payload);
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAssignments } = AssignmentByClassSlice.actions;
export default AssignmentByClassSlice.reducer;
