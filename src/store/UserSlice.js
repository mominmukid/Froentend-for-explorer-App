import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../utils/status";
import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

const initialState = {
  user: {},
  likedVideos: [],
  like: {},
  watchHistory: [],
  error: null,
  userStatus: true,
  rgisterSatus: STATUS.IDLE,
  isLoogedIn: false,
};

// Async thunks

export const loginAsyncUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${baseUrl}/users/login`,
        { email, password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      return response.data.data; // user info & token
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const loginUserWithGoogle = createAsyncThunk(
  "auth/login",
  async (code, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${baseUrl}/users/googlelogin?code=${code}`,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response.data.data);
      return response.data.data; // user info & token
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const ragisterAsyncUser = createAsyncThunk(
  "auth/ragister",
  async (
    { email, password, fullname, username, avatar, coverImage },
    { rejectWithValue }
  ) => {
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      if (fullname) formData.append("fullname", fullname);
      if (username) formData.append("username", username);
      if (avatar) formData.append("avatar", avatar[0]);
      if (coverImage) formData.append("coverImage", coverImage[0]);

      const response = await axios.post(`${baseUrl}/users/register`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const setuserHistory = createAsyncThunk(
  "set/user/history",
  async (id, { rejectWithValue }) => {
    try {
      await axios.post(`${baseUrl}/users/set-watch-history/${id}`, null, {
        withCredentials: true,
      });
      return;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const getUserHistory = createAsyncThunk(
  "user/history",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}/users/watch-history`, {
        withCredentials: true,
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch history"
      );
    }
  }
);

export const clerWatchHistory = createAsyncThunk(
  "user/history/clear",
  async (_, { rejectWithValue }) => {
    try {
      await axios.delete(`${baseUrl}/users/delete-watch-history`, {
        withCredentials: true,
      });
      return [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to clear history"
      );
    }
  }
);

export const setuserLike = createAsyncThunk(
  "set/user/history",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${baseUrl}/like/togglelike/${id}`,
        null,
        { withCredentials: true }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to toggle like"
      );
    }
  }
);

export const getUserLikedVideos = createAsyncThunk(
  "user/liked/videos",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}/like/getuserlikedvideos`, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch liked videos"
      );
    }
  }
);

export const updateUserAvatar = createAsyncThunk(
  "update/user/avatar",
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("avatar", file);

      const response = await axios.patch(
        `${baseUrl}/users/update-avatar`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to update avatar"
      );
    }
  }
);

export const updateUserBanner = createAsyncThunk(
  "update/user/banner",
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("coverImage", file);

      const response = await axios.patch(
        `${baseUrl}/users/update-coverimage`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to update banner"
      );
    }
  }
);

export const updateUserFullname = createAsyncThunk(
  "update/user/fullname",
  async (fullname, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${baseUrl}/users/update-account-details`,
        { fullname },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to update fullname"
      );
    }
  }
);

export const getUserdetils = createAsyncThunk(
  "user/userdata",
  async (owner, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}/users/get-User/${owner}`, {
        withCredentials: true,
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch user details"
      );
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}/users/logout`, {
        withCredentials: true,
      });

      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch user details"
      );
    }
  }
);

export const updateUserPassword = createAsyncThunk(
  "update/user/Password",
  async ({ newPassword, oldPassword }, { rejectWithValue }) => {
    console.log(newPassword, oldPassword);

    try {
      await axios.post(
        `${baseUrl}/users/change-password`,
        { newPassword, oldPassword },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      return;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to update fullname"
      );
    }
  }
);

// Slice
const userSclice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsyncUser.pending, (state) => {
        state.userStatus = STATUS.LOADING;
      })
      .addCase(loginAsyncUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoogedIn = true;
        state.userStatus = STATUS.SUCCEEDED;
      })
      .addCase(loginAsyncUser.rejected, (state) => {
        state.userStatus = STATUS.FAILED;
      })
      .addCase(ragisterAsyncUser.pending, (state) => {
        state.rgisterSatus = STATUS.LOADING;
      })
      .addCase(ragisterAsyncUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.rgisterSatus = STATUS.SUCCEEDED;
      })
      .addCase(ragisterAsyncUser.rejected, (state) => {
        state.rgisterSatus = STATUS.FAILED;
      })
      .addCase(getUserHistory.fulfilled, (state, action) => {
        state.watchHistory = action.payload;
      })
      .addCase(clerWatchHistory.fulfilled, (state, action) => {
        state.watchHistory = action.payload;
      })
      .addCase(setuserLike.fulfilled, (state, action) => {
        state.like = action.payload;
      })
      .addCase(getUserLikedVideos.fulfilled, (state, action) => {
        state.likedVideos = action.payload;
      })
      .addCase(updateUserAvatar.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(updateUserBanner.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(updateUserFullname.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.userStatus = !state.userStatus;
        state.isLoogedIn = false;
      });
  },
});

export const getUser = (state) => state.user.user;
export const getUserLikedVideo = (state) => state.user.likedVideos;
export const getLike = (state) => state.user.like;
export const getUserhistory = (state) => state.user.watchHistory;
export const getUserStatus = (state) => state.user.userStatus;
export const getRagisterStatus = (state) => state.user.rgisterSatus;

export const { clearUser } = userSclice.actions;
export default userSclice.reducer;
