import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../utils/status";

const baseUrl = import.meta.env.VITE_BASE_URL;

const initialState = {
  videos: [],
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

export const getAllVideos = (state) => state.videoframe.videos;
export const getVideoStatus = (state) => state.videoframe.videoStatus;
export const getSingleVideo = (state) => state.videoframe.videoSingle;
export const getSingleVideoStatus = (state) =>
  state.videoframe.videoSingleStatus;
export default videoSlice.reducer;
