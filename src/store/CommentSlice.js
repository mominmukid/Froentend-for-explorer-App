// src/store/commentSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const baseUrl = import.meta.env.VITE_BASE_URL;
import { STATUS } from "../utils/status";

// initial state
const initialState = {
  comments: [],
  commentStatus: true,
};
export const fetchAsyncComments = createAsyncThunk(
  "comments/fetch",
  async (videoId) => {
    const response = await fetch(
      `${baseUrl}/comment/getallvideocomment/${videoId}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const data = await response.json();
    return data.data; // should be an array of comments
  }
);

// thunk to add a new comment
export const addAsyncComment = createAsyncThunk(
  "comments/add",
  async ({ _id, newComment }, { rejectWithValue }) => {

    try {
      const response = await fetch(`${baseUrl}/comment/createcomnent/${_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ content: newComment }),
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

export const updateComment = createAsyncThunk(
  "comments/update",
  async ({ _id, editedContent }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseUrl}/comment/updatecomment/${_id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: editedContent }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update comment");
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Update comment error:", error);
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

export const deleteComment = createAsyncThunk(
  "comments/delete",
  async (_id, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseUrl}/comment/deletecomment/${_id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update comment");
      }

      return;
    } catch (error) {
      console.error("Update comment error:", error);
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
        state.comments = action.payload;
      })
      .addCase(deleteComment.fulfilled, (state) => {
        state.commentStatus = !state.commentStatus;
      })
      .addCase(addAsyncComment.fulfilled, (state) => {
        state.commentStatus = !state.commentStatus;
      });
  },
});

// selectors
export const getAllComments = (state) => state.comment.comments;
// export const getCommentStatus = (state) => state.comment.commentStatus;

export default commentSlice.reducer;
