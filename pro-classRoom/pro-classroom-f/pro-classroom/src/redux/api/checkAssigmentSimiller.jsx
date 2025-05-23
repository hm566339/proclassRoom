import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const checkAssigmentSimiller = createAsyncThunk(
  "similarity/check",
  async (filePaths, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authorization token not found");
      }

      const files = Array.isArray(filePaths) ? filePaths : [filePaths];

      // Extract filenames from paths
      const filenames = files.map((path) => {
        const normalized = path.replaceAll("\\", "/");
        const parts = normalized.split("/");
        return parts[parts.length - 1];
      });

      const response = await fetch(`http://localhost:8581/compare-names`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(filenames),
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        throw new Error("Failed to compare assignments");
      }

      const data = await response.json();
      console.log("Parsed response data:", data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const similaritySlice = createSlice({
  name: "similarity",
  initialState: {
    result: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkAssigmentSimiller.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.result = null;
      })
      .addCase(checkAssigmentSimiller.fulfilled, (state, action) => {
        state.loading = false;
        state.result = action.payload;
        console.log("Similarity API Results:", action.payload);
      })
      .addCase(checkAssigmentSimiller.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.error("Similarity API Error:", action.payload);
      });
  },
});

export default similaritySlice.reducer;
