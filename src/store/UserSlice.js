import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../utils/status";

const baseUrl = import.meta.env.VITE_BASE_URL;

const initialState = {
  user: {},
  userStatus: STATUS.IDLE,
};

// Async thunk

const userSclice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAsyncUser.pending, (state) => {
        state.videoStatus = STATUS.LOADING;
      })
      .addCase(loginAsyncUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.videoStatus = STATUS.SUCCEEDED;
      })
      .addCase(loginAsyncUser.rejected, (state) => {
        state.videoStatus = STATUS.FAILED;
      });
  },
});

export const loginAsyncUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseUrl}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Failed to login");
      }

      const data = await response.json();
      return data.data; // should include user info & token
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getUser = (state) => state.user.user;
export const getUserStatus = (state) => state.user.userStatus;

export default userSclice.reducer;
