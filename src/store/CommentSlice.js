// src/store/commentSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const baseUrl = import.meta.env.VITE_BASE_URL;
import { STATUS } from "../utils/status";

// initial state
const initialState = {
  comments: [], // all comments for a video
  commentsStatus: STATUS.IDLE, // status for fetching comments
  addCommentStatus: STATUS.IDLE, // status for adding new comment
};

// thunk to fetch comments for a video
export const fetchAsyncComments = createAsyncThunk(
  "comments/fetch",
  async (videoId) => {
    const response = await fetch(`${baseUrl}/comment/getallvideocomment/${videoId}`);
    const data = await response.json();
    console.log(data);
    
    return data.data; // should be an array of comments
  }
);

// thunk to add a new comment
export const addAsyncComment = createAsyncThunk(
  "comments/add",
  async ({ videoId, content }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${baseUrl}comment/createcomnent/${videoId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add comment");
      }

      const data = await response.json();
      return data; // the new comment object
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch comments
      .addCase(fetchAsyncComments.pending, (state) => {
        state.commentsStatus = STATUS.LOADING;
      })
      .addCase(fetchAsyncComments.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.commentsStatus = STATUS.SUCCEEDED;
      })
      .addCase(fetchAsyncComments.rejected, (state) => {
        state.commentsStatus = STATUS.FAILED;
      })

      // add comment
      .addCase(addAsyncComment.pending, (state) => {
        state.addCommentStatus = STATUS.LOADING;
      })
      .addCase(addAsyncComment.fulfilled, (state, action) => {
        state.comments.push(action.payload); // append new comment
        state.addCommentStatus = STATUS.SUCCEEDED;
      })
      .addCase(addAsyncComment.rejected, (state) => {
        state.addCommentStatus = STATUS.FAILED;
      });
  },
});

// selectors
export const getAllComments = (state) => state.comment.comments;
export const getCommentsStatus = (state) => state.comment.commentsStatus;
export const getAddCommentStatus = (state) => state.comment.addCommentStatus;

export default commentSlice.reducer;
