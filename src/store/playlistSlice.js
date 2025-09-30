// src/store/commentSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const baseUrl = import.meta.env.VITE_BASE_URL;
import { STATUS } from "../utils/status";

// initial state
const initialState = {
  playlistVideos: [],
  playlistVideosStatus: true,
};
export const fetchAsyncplaylist = createAsyncThunk(
  "feach/playlist",
  async () => {
    const response = await fetch(`${baseUrl}/playlist/getuserplaylists`, {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    return data.data; // should be an array of comments
  }
);

export const fetchAsyncplaylistById = createAsyncThunk(
  "feach/playlistbyid",
  async (id) => {
    const response = await fetch(`${baseUrl}/playlist/getpaly-listbyid/${id}`, {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    // console.log(data.data);
    return data.data; // should be an array of comments
  }
);

// thunk to add a new comment
export const createPlayList = createAsyncThunk(
  "playlist/create",
  async ({ name, description, thumbnail }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      if (thumbnail) {
        formData.append("Thumbnel", thumbnail); // file object
      }
      console.log(formData);

      const response = await fetch(`${baseUrl}/playlist/crete-playlist`, {
        method: "POST",
        credentials: "include",
        body: formData, // send FormData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create playlist");
      }

      const data = await response.json();
      return data; // the created playlist object
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updatePlayListDetils = createAsyncThunk(
  "playlist/update",
  async ({ id, newName, newDescription }, { rejectWithValue }) => {
    console.log(id, newName, newDescription);

    try {
      const response = await fetch(`${baseUrl}/playlist/updatedetails/${id}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newName, description: newDescription }),
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

export const removeVideoFromPlaylist = createAsyncThunk(
  "remove/video",
  async ({ playlistId, videoId }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${baseUrl}/playlist/remove-video/${playlistId}/${videoId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

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
export const deletePlaylist = createAsyncThunk(
  "remove/plylist",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${baseUrl}/playlist/deleteplaylist/${id}/`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

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

export const addVideoPlaylist = createAsyncThunk(
  "addvideo/plylist",
  async ({ selectedPlaylist, videoId }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${baseUrl}/playlist/addvideo-playlist/${selectedPlaylist}/${videoId}`,
        {
          method: "POST",
          credentials: "include",
        }
      );
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

const playlistSlice = createSlice({
  name: "playlish",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncplaylist.fulfilled, (state, action) => {
        state.playlistVideos = action.payload;
      })

      .addCase(updatePlayListDetils.fulfilled, (state) => {
        state.playlistVideosStatus = !state.playlistVideosStatus;
      });
  },
});

// selectors
export const getAllComments = (state) => state.comment.comments;
// export const getCommentStatus = (state) => state.comment.commentStatus;

export default playlistSlice.reducer;
