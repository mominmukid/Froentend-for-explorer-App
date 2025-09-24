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
  userStatus: STATUS.IDLE,
  rgisterSatus: STATUS.IDLE,
};

// Async thunk

const userSclice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = {}; // ✅ reset the entire user object
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsyncUser.pending, (state) => {
        state.userStatus = STATUS.LOADING;
      })
      .addCase(loginAsyncUser.fulfilled, (state, action) => {
        state.user = action.payload;
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
      });
  },
});

export const loginAsyncUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseUrl}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Failed to login");
      }

      const data = await response.json();
      return data.data; // should include user info & token
    } catch (error) {
      return rejectWithValue(error.message);
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
      if (avatar) formData.append("avatar", avatar[0]); // avatar file
      if (coverImage) formData.append("coverImage", coverImage[0]); // cover image file
      const response = await fetch(`${baseUrl}/users/register`, {
        method: "POST",
        body: formData,
        // 👈 no JSON.stringify
        // ⚠️ do NOT set Content-Type, browser adds multipart/form-data automatically
      });

      if (!response.ok) {
        throw new Error("Failed to login");
      }

      const data = await response.json();
      return data.data; // should include user info & token
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const setuserHistory = createAsyncThunk(
  "set/user/history",
  async (id) => {
    await fetch(`${baseUrl}/users/set-watch-history/${id}`, {
      method: "POST",
      credentials: "include", // ✅ sends cookies along with the request
    });

    return;
  }
);

export const getUserHistory = createAsyncThunk(
  "user/history",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseUrl}/users/watch-history`, {
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
      return rejectWithValue(error.message);
    }
  }
);

export const clerWatchHistory = createAsyncThunk(
  "user/history/clear",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseUrl}/users/delete-watch-history`, {
        method: "DELETE",
        credentials: "include", // ✅ sends cookies along with the request
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch history");
      }
      return [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const setuserLike = createAsyncThunk("set/user/history", async (id) => {
  const res = await fetch(`${baseUrl}/like/togglelike/${id}`, {
    method: "POST",
    credentials: "include", // ✅ sends cookies along with the request
  });
  const data = await res.json();

  return data.data;
});

export const getUserLikedVideos = createAsyncThunk(
  "user/liked/videos",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://api-explorer-app.onrender.com/api/v1/like/getlikedvideos",
        {
          withCredentials: true, // ✅ send cookies (JWT) automatically
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return response.data.data;
    } catch (error) {
      // Axios error handling
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to fetch liked videos"
      );
    }
  }
);

export const updateUserAvatar = createAsyncThunk(
  "update/user/avatar",
  async (file, { rejectWithValue }) => {
    try {
      // ✅ prepare multipart form-data
      const formData = new FormData();
      formData.append("avatar", file); // 👈 must match `req.file` field name in multer

      const response = await fetch(`${baseUrl}/users/update-avatar`, {
        method: "PATCH",
        credentials: "include", // send cookies
        body: formData, // ✅ send image file
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update avatar");
      }

      const data = await response.json();
      return data.data; // updated user object
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const updateUserBanner = createAsyncThunk(
  "update/user/banner",
  async (file, { rejectWithValue }) => {
    try {
      // ✅ prepare multipart form-data
      const formData = new FormData();
      formData.append("coverImage", file); // 👈 must match `req.file` field name in multer

      const response = await fetch(`${baseUrl}/users/update-coverimage  `, {
        method: "PATCH",
        credentials: "include", // send cookies
        body: formData, // ✅ send image file
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update avatar");
      }

      const data = await response.json();
      return data.data; // updated user object
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUserFullname = createAsyncThunk(
  "update/user/fullname",
  async (fullname) => {
    const res = await fetch(`${baseUrl}/users/update-account-details`, {
      method: "PATCH",
      credentials: "include", // ✅ sends cookies along with the request
      body: JSON.stringify({ fullname }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data.data;
  }
);

export const getUserdetils = createAsyncThunk(
  "user/userdata",
  async (owner, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseUrl}/users/get-User/${owner}`, {
        method: "GET",
        credentials: "include",
        // ✅ sends cookies along with the request
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch history");
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getUser = (state) => state.user.user;
export const getUserLikedVideo = (state) => state.user.likedVideos;
export const getLike = (state) => state.user.like;
export const getUserhistory = (state) => state.user.watchHistory;
export const getUserStatus = (state) => state.user.userStatus;
export const getRagisterStatus = (state) => state.user.rgisterSatus;

export const { clearUser } = userSclice.actions;
export default userSclice.reducer;
