import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../utils/status";

const baseUrl = import.meta.env.VITE_BASE_URL;

const initialState = {
  
};

// Async thunk

const subscriptionSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
      builder
        
        .addCase(getChannelSubscibres.fulfilled, (state, action) => {
          state.subscription = action.payload;
        });
      },
});

export const userSubscribeTochannel = createAsyncThunk("subscribe/channel", async (id) => {
  const res = await fetch(`${baseUrl}/subscribe/subscribed/${id}`, {
    method: "POST",
    credentials: "include", // ✅ sends cookies along with the request
  });
  const data = await res.json();
  return data.data.subscriber;
});

export const getChannelSubscibres = createAsyncThunk("get/channel/subscribers", async (owner) => {
  const res = await fetch(`${baseUrl}/subscribe/channelsubscribers/${owner}`, {
    method: "GET",
     headers: {
          "Content-Type": "application/json",
        },
    credentials: "include", // ✅ sends cookies along with the request
  });
  const data = await res.json();
  return data.data;
});

export const getUserSubscribers = createAsyncThunk("get/user/subscribers", async (_id) => {
  const res = await fetch(`${baseUrl}/subscribe/usersubscribechannel/${_id}`, {
    method: "GET",
     headers: {
          "Content-Type": "application/json",
        },
    credentials: "include", // ✅ sends cookies along with the request
  });
  const data = await res.json();
  return data.data;
});

export const getSubscriberVideos = createAsyncThunk("get/subscriber/video", async (_id) => {
  const res = await fetch(`${baseUrl}/videos/getvideo/byuserid/${_id}`, {
    method: "GET",
     headers: {
          "Content-Type": "application/json",
        },
    credentials: "include", // ✅ sends cookies along with the request
  });
  const data = await res.json();
  return data.data;
});



export default subscriptionSlice.reducer;
