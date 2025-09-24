import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../utils/status";

const baseUrl = import.meta.env.VITE_BASE_URL;

const initialState = {
  videos: [],
  userVideos: [],
  videoStatus: STATUS.IDLE,
  videoSingle: {},
  videoSingleStatus: STATUS.IDLE,
};

// Async thunk

const videoSlice = createSlice({
  name: "videoframe",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncVideos.pending, (state) => {
        state.videoStatus = STATUS.LOADING;
      })
      .addCase(fetchAsyncVideos.fulfilled, (state, action) => {
        state.videos = action.payload;
        state.videoStatus = STATUS.SUCCEEDED;
      })
      .addCase(fetchAsyncVideos.rejected, (state) => {
        state.videoStatus = STATUS.FAILED;
      })

      // for single video
      .addCase(fetchAsyncVideoSingle.pending, (state) => {
        state.videoSingleStatus = STATUS.LOADING;
      })

      .addCase(fetchAsyncVideoSingle.fulfilled, (state, action) => {
        state.videoSingle = action.payload;
        state.videoSingleStatus = STATUS.SUCCEEDED;
      })

      .addCase(fetchAsyncVideoSingle.rejected, (state) => {
        state.videoSingleStatus = STATUS.FAILED;
      })
      .addCase(getvideosUser.fulfilled, (state, action) => {
        state.userVideos = action.payload;
      });
  },
});

export const fetchAsyncVideos = createAsyncThunk(
  "videos/fetch",
  async (limit = 10) => {
    const response = await fetch(
      `${baseUrl}/videos/getall-videos?limit=${limit}`
    );
    const data = await response.json();
    return data.data;
  }
);

export const fetchAsyncVideoSingle = createAsyncThunk(
  "video-single/fetch",
  async (id) => {
    const response = await fetch(`${baseUrl}/videos/getvideo/${id}`);
    const data = await response.json();
    return data.data;
  }
);



export const uploadVideo = createAsyncThunk(
  "upload/video",
  async (
    { videoFile, title, description, category, thumbnail },
    { rejectWithValue }
  ) => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      if (videoFile) formData.append("video", videoFile[0]); // avatar file
      if (thumbnail) formData.append("thumbnel", thumbnail[0]); // cover image file
      const response = await fetch(`${baseUrl}/videos/publishvideo`, {
        method: "POST",
        body: formData,
        credentials: "include", // send cookies
        // 👈 no JSON.stringify
        // ⚠️ do NOT set Content-Type, browser adds multipart/form-data automatically
      });

      if (!response.ok) {
        throw new Error("Failed to login");
      }

      return;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getvideosUser = createAsyncThunk("user/videos/fetch", async () => {
  try {
    const response = await fetch(`${baseUrl}/users/user-videos`, {
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
    return error.message;
  }
});

export const updateVideo = createAsyncThunk(
  "update/user/video",
  async ({ id, video }, { rejectWithValue }) => {
    try {
  

      // prepare multipart form-data
      const formData = new FormData();
      formData.append("video", video); // must match multer field name

      const response = await fetch(`${baseUrl}/videos/updatevideo/${id}`, {
        method: "PATCH",
        credentials: "include", // send cookies
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update video");
      }
      return; // return response for reducer
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateThumnel = createAsyncThunk(
  "update/user/thumbnel",
  async ({ id, thumbnail }, { rejectWithValue }) => {
    try {
      

      // prepare multipart form-data
      const formData = new FormData();
      formData.append("Thumbnel", thumbnail); // must match multer field name

      const response = await fetch(`${baseUrl}/videos/updade-thumnel/${id}`, {
        method: "PATCH",
        credentials: "include", // send cookies
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update video");
      }
      return; // return response for reducer
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateVideoDetails = createAsyncThunk(
  "update/user/video-details",
  async ({ id, title, description }, { rejectWithValue }) => {
    try {
      // must match multer field name
      const response = await fetch(`${baseUrl}/videos/update-deatils/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // send cookies
        body: JSON.stringify({ title, description }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update video");
      }
      return;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const setVideoViews = createAsyncThunk(
  "video/views",
  async ( id , { rejectWithValue }) => {
    try {
      // must match multer field name
      const response = await fetch(`${baseUrl}/videos/set-views/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // send cookies
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update video");
      }
      return;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getAllVideos = (state) => state.videoframe.videos;
export const getUserVideos = (state) => state.videoframe.userVideos;
export const getVideoStatus = (state) => state.videoframe.videoStatus;
export const getSingleVideo = (state) => state.videoframe.videoSingle;
export const getSingleVideoStatus = (state) =>
  state.videoframe.videoSingleStatus;
export default videoSlice.reducer;
