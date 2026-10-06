import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../utils/status";
import { BASE_URL, UPLOAD_URL } from "../utils/apiConfig";
import axios from "axios";

const getUserFromStorage = () => {
  try {
    const raw = localStorage.getItem("user");
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed?.user || parsed || null;
  } catch {
    return null;
  }
};

const initialUser = getUserFromStorage();

const initialState = {
  user: initialUser || {},
  likedVideos: [],
  like: {},
  watchHistory: [],
  error: null,
  userStatus: true,
  rgisterSatus: STATUS.IDLE,
  isLoogedIn: Boolean(initialUser?._id || initialUser?.email),
};

// Async thunks
export const loginAsyncUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/users/login`,
        { email, password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const loginUserWithGoogle = createAsyncThunk(
  "auth/googleLogin",
  async (code, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/users/googlelogin?code=${code}`,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

const getDefaultFile = async (url, filename, mimeType) => {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to load default file");
    const blob = await res.blob();
    return new File([blob], filename, { type: mimeType || blob.type || "image/png" });
  } catch {
    const dummyBlob = new Blob([""], { type: mimeType || "image/png" });
    return new File([dummyBlob], filename, { type: mimeType || "image/png" });
  }
};

export const ragisterAsyncUser = createAsyncThunk(
  "auth/register",
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

      // Avatar fallback to default file if not provided
      if (avatar && avatar[0]) {
        formData.append("avatar", avatar[0]);
      } else if (avatar instanceof File) {
        formData.append("avatar", avatar);
      } else {
        const defaultAvatar = await getDefaultFile("/Images/profile.png", "default_avatar.png", "image/png");
        formData.append("avatar", defaultAvatar);
      }

      // Cover image fallback to default file if not provided
      if (coverImage && coverImage[0]) {
        formData.append("coverImage", coverImage[0]);
      } else if (coverImage instanceof File) {
        formData.append("coverImage", coverImage);
      } else {
        const defaultCover = await getDefaultFile("/Images/alt.avif", "default_cover.avif", "image/avif");
        formData.append("coverImage", defaultCover);
      }

      const response = await axios.post(`${UPLOAD_URL}/users/register`, formData, {
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
      await axios.post(`${BASE_URL}/users/set-watch-history/${id}`, null, {
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
      const response = await axios.get(`${BASE_URL}/users/watch-history`, {
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
      await axios.delete(`${BASE_URL}/users/delete-watch-history`, {
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
  "set/user/like",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/like/togglelike/${id}`,
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
      const response = await axios.get(`${BASE_URL}/like/getuserlikedvideos`, {
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
        `${UPLOAD_URL}/users/update-avatar`,
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
        `${UPLOAD_URL}/users/update-coverimage`,
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
        `${BASE_URL}/users/update-account-details`,
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
      const response = await axios.get(`${BASE_URL}/users/get-User/${owner}`, {
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
      const response = await axios.get(`${BASE_URL}/users/logout`, {
        withCredentials: true,
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to logout"
      );
    }
  }
);

export const updateUserPassword = createAsyncThunk(
  "update/user/Password",
  async ({ newPassword, oldPassword }, { rejectWithValue }) => {
    try {
      await axios.post(
        `${BASE_URL}/users/change-password`,
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
          "Failed to update password"
      );
    }
  }
);

// Slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = {};
      state.isLoogedIn = false;
      state.likedVideos = [];
      state.watchHistory = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Login with credentials
      .addCase(loginAsyncUser.pending, (state) => {
        state.userStatus = STATUS.LOADING;
      })
      .addCase(loginAsyncUser.fulfilled, (state, action) => {
        state.user = action.payload?.user || action.payload || {};
        state.isLoogedIn = true;
        state.userStatus = STATUS.SUCCEEDED;
      })
      .addCase(loginAsyncUser.rejected, (state) => {
        state.userStatus = STATUS.FAILED;
      })

      // Login with Google
      .addCase(loginUserWithGoogle.pending, (state) => {
        state.userStatus = STATUS.LOADING;
      })
      .addCase(loginUserWithGoogle.fulfilled, (state, action) => {
        state.user = action.payload?.user || action.payload || {};
        state.isLoogedIn = true;
        state.userStatus = STATUS.SUCCEEDED;
      })
      .addCase(loginUserWithGoogle.rejected, (state) => {
        state.userStatus = STATUS.FAILED;
      })

      // Register
      .addCase(ragisterAsyncUser.pending, (state) => {
        state.rgisterSatus = STATUS.LOADING;
      })
      .addCase(ragisterAsyncUser.fulfilled, (state, action) => {
        state.user = action.payload?.user || action.payload || {};
        state.rgisterSatus = STATUS.SUCCEEDED;
      })
      .addCase(ragisterAsyncUser.rejected, (state) => {
        state.rgisterSatus = STATUS.FAILED;
      })

      // Watch History
      .addCase(getUserHistory.fulfilled, (state, action) => {
        state.watchHistory = action.payload || [];
      })
      .addCase(clerWatchHistory.fulfilled, (state, action) => {
        state.watchHistory = action.payload || [];
      })

      // Likes
      .addCase(setuserLike.fulfilled, (state, action) => {
        state.like = action.payload;
      })
      .addCase(getUserLikedVideos.fulfilled, (state, action) => {
        state.likedVideos = action.payload || [];
      })

      // Profile updates
      .addCase(updateUserAvatar.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(updateUserBanner.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(updateUserFullname.fulfilled, (state, action) => {
        state.user = action.payload;
      })

      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = {};
        state.isLoogedIn = false;
        state.userStatus = !state.userStatus;
        state.likedVideos = [];
        state.watchHistory = [];
      });
  },
});

export const getUser = (state) => state.user.user;
export const getUserLikedVideo = (state) => state.user.likedVideos;
export const getLike = (state) => state.user.like;
export const getUserhistory = (state) => state.user.watchHistory;
export const getUserStatus = (state) => state.user.userStatus;
export const getRagisterStatus = (state) => state.user.rgisterSatus;

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
