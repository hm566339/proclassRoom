import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

// Helper to safely parse JSON
const safeJsonParse = (value) => {
  try {
    return value && value !== "undefined" ? JSON.parse(value) : null;
  } catch {
    return null;
  }
};

// Async thunk for login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      // console.log("[loginUser] Sending login request with:", {
      //   email,
      //   password,
      // });

      const response = await fetch(
        "http://localhost:8581/api/v1/aurth/signin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      // console.log("[loginUser] Response status:", response.status);

      const data = await response.json().catch(() => {
        throw new Error("Invailed user and password");
      });
      // const decode = data.token;
      // const user = jwtDecode(decode);
      // console.log(user);

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }
      try {
        localStorage.setItem("user", JSON.stringify(data.userId));
        localStorage.setItem("token", data.token);
      } catch (error) {
        console.error("Failed to write to localStorage:", error);
        // You might want to handle this error appropriately
      }
      return data;
    } catch (error) {
      console.error("[loginUser] Error occurred:", error.message);
      return rejectWithValue(error.message);
    }
  }
);

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: safeJsonParse(localStorage.getItem("user")),
    token: localStorage.getItem("token") || null,
    isAuthenticated: !!localStorage.getItem("token"),
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        // console.log("[loginUser.pending] Login started.");
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        // console.log("[loginUser.fulfilled] Login successful:", action.payload);
        state.userId = action.payload.userId;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log(
          "[loginUser.rejected] Login failed. Error:",
          action.payload
        );
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
