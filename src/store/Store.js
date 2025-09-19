import { configureStore } from "@reduxjs/toolkit";
import videoReducer from "./VideoSlice";
import videofeatureReducer from "./VideoFeatureSlice";
import commentReducer from "./CommentSlice";
import userReducer from "./UserSlice";

const store = configureStore({
  reducer: {
    video: videoReducer,
   videoframe: videofeatureReducer ,
   comment: commentReducer,
    user: userReducer,
  },
});

export default store;
