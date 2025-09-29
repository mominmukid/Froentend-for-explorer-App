import { configureStore } from "@reduxjs/toolkit";
import videoReducer from "./VideoSlice";
import videofeatureReducer from "./VideoFeatureSlice";
import commentReducer from "./CommentSlice";
import userReducer from "./UserSlice";
import subscriptionReducer from "./subscriptionSlice";
import likeReducer from "./likeSlice";
import playlistReducer from "./playlistSlice";

const store = configureStore({
  reducer: {
    video: videoReducer,
    videoframe: videofeatureReducer,
    comment: commentReducer,
    user: userReducer,
    subscription: subscriptionReducer,
    like: likeReducer,
    palylist: playlistReducer,
  },
});

export default store;
