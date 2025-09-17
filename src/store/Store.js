import { configureStore } from "@reduxjs/toolkit";
import videoReducer from "./VideoSlice";

const store = configureStore({
  reducer: {
    video: videoReducer,
  },
});

export default store;
