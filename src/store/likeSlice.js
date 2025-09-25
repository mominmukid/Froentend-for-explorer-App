// src/store/commentSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const baseUrl = import.meta.env.VITE_BASE_URL;
import { STATUS } from "../utils/status";

// initial state
const initialState = {
  likes: [],
  likesStatus: true,
};

const likeSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addAsyncCommentLike.fulfilled, (state) => {
        state.likesStatus = !state.likesStatus;
      })
      .addCase(fetchAsyncCommentLike.fulfilled, (state) => {
        state.likesStatus = !state.likesStatus;
      });
  },
});

export const addAsyncCommentLike = createAsyncThunk(
  "comments/add",
  async (id, { rejectWithValue }) => {
    try {
      if (!id) return;
      const response = await fetch(`${baseUrl}/like/togglecomment/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to add comment");
      }
      return; // the new comment object
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAsyncCommentLike = createAsyncThunk(
  "comments/fetch",
  async (id, { rejectWithValue }) => {
    if (!id) return;
    try {
      const response = await fetch(`${baseUrl}/like/getcommentlikes/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to add comment");
      }
      const data = await response.json();

      return data.data; // the new comment object
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getVideoLikes = createAsyncThunk(
  "/video/like",
  async (id, { rejectWithValue }) => {
    if (id === undefined) return;
    try {
      const response = await fetch(`${baseUrl}/like/getvideolikes/${id}`, {
        method: "GET",
        credentials: "include", // ✅ sends cookies along with the request
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch history");
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export default likeSlice.reducer;
