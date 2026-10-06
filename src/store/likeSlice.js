// src/store/likeSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL as baseUrl } from "../utils/apiConfig";

const initialState = {
  likes: [],
  likesStatus: true,
};

export const addAsyncCommentLike = createAsyncThunk(
  "likes/toggleCommentLike",
  async (id, { rejectWithValue }) => {
    try {
      if (!id) return;
      let response = await fetch(`${baseUrl}/like/togglecomment/${id}`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      // Fallback if backend uses /like/toggle/c/:id
      if (!response.ok && response.status === 404) {
        response = await fetch(`${baseUrl}/like/toggle/c/${id}`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to toggle comment like");
      }

      const data = await response.json();
      return data?.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAsyncCommentLike = createAsyncThunk(
  "likes/fetchCommentLikes",
  async (id, { rejectWithValue }) => {
    if (!id) return [];
    try {
      let response = await fetch(`${baseUrl}/like/getcommentlikes/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response.ok && response.status === 404) {
        response = await fetch(`${baseUrl}/like/comment/${id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
      }

      if (!response.ok) {
        return [];
      }
      const data = await response.json();
      return data?.data || [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getVideoLikes = createAsyncThunk(
  "likes/getVideoLikes",
  async (id, { rejectWithValue }) => {
    if (id === undefined) return [];
    try {
      let response = await fetch(`${baseUrl}/like/getvideolikes/${id}`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok && response.status === 404) {
        response = await fetch(`${baseUrl}/like/video/${id}`, {
          method: "GET",
          credentials: "include",
        });
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to fetch video likes");
      }

      const data = await response.json();
      return data?.data || [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const likeSlice = createSlice({
  name: "like",
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

export default likeSlice.reducer;
