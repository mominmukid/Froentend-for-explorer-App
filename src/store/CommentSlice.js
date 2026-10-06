// src/store/CommentSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL as baseUrl } from "../utils/apiConfig";

const initialState = {
  comments: [],
  commentStatus: true,
};

// Helper to extract comments array from whatever shape the backend returns
const extractCommentsArray = (payload) => {
  if (!payload) return [];
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload.docs)) return payload.docs;
  if (Array.isArray(payload.comments)) return payload.comments;
  if (Array.isArray(payload.data)) return payload.data;
  return [];
};

// Thunk to fetch comments for a video
export const fetchAsyncComments = createAsyncThunk(
  "comments/fetchVideoComments",
  async (videoId, { rejectWithValue }) => {
    try {
      let response = await fetch(
        `${baseUrl}/comment/getallvideocomment/${videoId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      // Fallback if backend route is /comment/:videoId
      if (!response.ok && response.status === 404) {
        response = await fetch(`${baseUrl}/comment/${videoId}`, {
          method: "GET",
          credentials: "include",
        });
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to fetch comments");
      }

      const data = await response.json();
      const raw = data?.data ?? data;
      return extractCommentsArray(raw);
    } catch (error) {
      console.error("fetchAsyncComments error:", error);
      return rejectWithValue(error.message || "Failed to fetch comments");
    }
  }
);

// Thunk to add a new comment
export const addAsyncComment = createAsyncThunk(
  "comments/addNewComment",
  async ({ _id, newComment }, { rejectWithValue }) => {
    try {
      const headers = { "Content-Type": "application/json" };
      const body = JSON.stringify({ content: newComment });

      // Try Chai aur Code original route: /comment/createcomnent/:id
      let response = await fetch(`${baseUrl}/comment/createcomnent/${_id}`, {
        method: "POST",
        headers,
        credentials: "include",
        body,
      });

      // Fallback if spelled /comment/createcomment/:id
      if (!response.ok && response.status === 404) {
        response = await fetch(`${baseUrl}/comment/createcomment/${_id}`, {
          method: "POST",
          headers,
          credentials: "include",
          body,
        });
      }

      // Fallback if route is /comment/:id
      if (!response.ok && response.status === 404) {
        response = await fetch(`${baseUrl}/comment/${_id}`, {
          method: "POST",
          headers,
          credentials: "include",
          body,
        });
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to add comment");
      }

      const data = await response.json();
      return data?.data || data;
    } catch (error) {
      console.error("addAsyncComment error:", error);
      return rejectWithValue(error.message || "Failed to add comment");
    }
  }
);

// Thunk to update a comment
export const updateComment = createAsyncThunk(
  "comments/updateExistingComment",
  async ({ _id, editedContent }, { rejectWithValue }) => {
    try {
      const headers = { "Content-Type": "application/json" };
      const body = JSON.stringify({ content: editedContent });

      let response = await fetch(`${baseUrl}/comment/updatecomment/${_id}`, {
        method: "PATCH",
        credentials: "include",
        headers,
        body,
      });

      if (!response.ok && response.status === 404) {
        response = await fetch(`${baseUrl}/comment/c/${_id}`, {
          method: "PATCH",
          credentials: "include",
          headers,
          body,
        });
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to update comment");
      }

      const data = await response.json();
      return data?.data || { _id, content: editedContent };
    } catch (error) {
      console.error("Update comment error:", error);
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

// Thunk to delete a comment
export const deleteComment = createAsyncThunk(
  "comments/deleteExistingComment",
  async (_id, { rejectWithValue }) => {
    try {
      let response = await fetch(`${baseUrl}/comment/deletecomment/${_id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok && response.status === 404) {
        response = await fetch(`${baseUrl}/comment/c/${_id}`, {
          method: "DELETE",
          credentials: "include",
        });
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to delete comment");
      }

      return _id;
    } catch (error) {
      console.error("Delete comment error:", error);
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncComments.fulfilled, (state, action) => {
        state.comments = extractCommentsArray(action.payload);
      })
      .addCase(fetchAsyncComments.rejected, (state) => {
        state.comments = [];
      })
      .addCase(addAsyncComment.fulfilled, (state, action) => {
        state.commentStatus = !state.commentStatus;
        if (action.payload && typeof action.payload === "object" && action.payload._id) {
          state.comments = [action.payload, ...state.comments];
        }
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        state.commentStatus = !state.commentStatus;
        if (action.payload?._id) {
          state.comments = state.comments.map((c) =>
            c._id === action.payload._id ? { ...c, ...action.payload } : c
          );
        }
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.commentStatus = !state.commentStatus;
        if (action.payload) {
          state.comments = state.comments.filter((c) => c._id !== action.payload);
        }
      });
  },
});

export const getAllComments = (state) => state.comment.comments;

export default commentSlice.reducer;
