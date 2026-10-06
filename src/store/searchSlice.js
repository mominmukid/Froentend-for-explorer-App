import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/apiConfig";
import { STATUS } from "../utils/status";

const initialState = {
  searchVideos: [],
  searchVideosStatus: STATUS.IDLE,
};

// Thunk for searching videos
export const searchAllVideos = createAsyncThunk(
  "search/allvideos",
  async ({ searchTerm, page = 1, limit = 20 }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${BASE_URL}/videos/getall-videos?query=${encodeURIComponent(
          searchTerm || ""
        )}&page=${page}&limit=${limit}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch videos");
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message || "Something went wrong");
    }
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    clearSearch: (state) => {
      state.searchVideos = [];
      state.searchVideosStatus = STATUS.IDLE;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchAllVideos.pending, (state) => {
        state.searchVideosStatus = STATUS.LOADING;
      })
      .addCase(searchAllVideos.fulfilled, (state, action) => {
        state.searchVideos = action.payload || [];
        state.searchVideosStatus = STATUS.SUCCEEDED;
      })
      .addCase(searchAllVideos.rejected, (state) => {
        state.searchVideosStatus = STATUS.FAILED;
      });
  },
});

export const { clearSearch } = searchSlice.actions;
export const selectSearchVideos = (state) => state.search.searchVideos;
export const selectSearchStatus = (state) => state.search.searchVideosStatus;
export default searchSlice.reducer;
