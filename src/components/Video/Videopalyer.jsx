import React, { useState, useEffect } from "react";
import { AiFillLike } from "react-icons/ai";
import { RiShareForwardLine } from "react-icons/ri";
import SuggestedVideo from "./SuggestedVideo";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllVideos,
  fetchAsyncVideos,
  setVideoViews,
} from "../../store/VideoFeatureSlice";
import { setuserLike, getLike, getUserdetils } from "../../store/UserSlice";
import Loader from "../../Pages/Loader";
import { toast } from "react-toastify";
import {
  userSubscribeTochannel,
  getChannelSubscibres,
} from "../../store/subscriptionSlice";
import {
  fetchAsyncComments,
  getAllComments,
  addAsyncComment,
} from "../../store/CommentSlice";
import CommentCard from "../comments/CommentCard";
import { getVideoLikes } from "../../store/likeSlice";
import Share from "../share/Share"
import LoginPopUp from '../loginpupUp/LoginPopUp'

function Videoplayer({
  singleVideo: { _id, title, videoFile, description, views, createdAt, owner },
}) {
  const dispatch = useDispatch();
  const videos = useSelector(getAllVideos);
  const userLike = useSelector(getLike);
  const commentStatus = useSelector((state) => state.comment.commentStatus);
  const [likes, setlikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscribeCount, setSubscribeCount] = useState(0);
  const [ownerData, setOwnerData] = useState(null);
  const [user, setuser] = useState({});


  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsed = JSON.parse(userData);
      if (parsed?.user) {
        setuser(parsed.user);
        setIsLoggedin(true);
      } else {
        setuser(null);
        setIsLoggedin(false);
      }
    } else {
      setuser(null);
      setIsLoggedin(false);
    }
  }, [_id, title]);

  const [loading, setLoading] = useState(true);
  const [showDesc, setShowDesc] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [videoComment, setVideoComment] = useState(
    useSelector(getAllComments)
  );
  const [commentLoading, setCommentLoading] = useState(false);

  // Fetch subscribers & views
  useEffect(() => {
    if (!owner) return;
    const fetchSubscribers = async () => {
      if (_id) {
        const resultActions = await dispatch(getChannelSubscibres(owner));
        if (getChannelSubscibres.fulfilled.match(resultActions)) {
          const subscribedChannels = resultActions.payload;
          const subscribed = Array.isArray(subscribedChannels)
            ? subscribedChannels.includes(user?._id)
            : false;
          setIsSubscribed(subscribed);
          setSubscribeCount(subscribedChannels.length);
        }
        await dispatch(setVideoViews(_id));
      }
    };
    fetchSubscribers();

  }, [userLike, _id, dispatch, owner]);

  // Fetch all videos
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(fetchAsyncVideos());
      setLoading(false);
    };
    fetchData();
  }, [dispatch]);

  // Fetch owner details
  useEffect(() => {
    const getuserDitails = async (owner) => {
      try {
        if (!owner) return;
        setLoading(true);
        const resultAction = await dispatch(getUserdetils(owner));
        if (getUserdetils.fulfilled.match(resultAction)) {
          setOwnerData(resultAction.payload);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getuserDitails(owner);
  }, [dispatch, owner]);

  // Fetch comments
  useEffect(() => {
    const getAllCommentsData = async (id) => {
      try {
        setCommentLoading(true);
        if (!id) return;
        const resultAction = await dispatch(fetchAsyncComments(id));
        if (fetchAsyncComments.fulfilled.match(resultAction)) {
          setVideoComment(resultAction.payload);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setCommentLoading(false);
      }
    };
    getAllCommentsData(_id);
  }, [_id, dispatch, commentStatus]);

  // Handle like
  const handleLike = async () => {
    if (!isLoggedin) {
      toast.info("Please login to like");
      return;
    };
    try {
      if (!_id) return;
      await dispatch(setuserLike(_id));
    } catch (error) {
      console.log(error);

    }
  };

  // Handle subscription
  const handleSubscription = async (id) => {
     if (!isLoggedin) {
      toast.info("Please login to subscribe");
      return;
    };
    if (!id ) return;
    const resultAction = await dispatch(userSubscribeTochannel(id));
    if (userSubscribeTochannel.fulfilled.match(resultAction)) {
      const subscribedUsers = resultAction.payload;
      const subscribed = subscribedUsers.some((u) => u.includes(user._id));
      setIsSubscribed(subscribed);
    }
  };

  // Handle comment
  const handleAddComment = async () => {
     if (!isLoggedin) {
      toast.info("Please login to comment");
      return;
    };
    if ( newComment.trim() === "" || !_id) return;
    try {
      setLoading(true);
      await dispatch(addAsyncComment({ _id, newComment }));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setNewComment("");
    }
  };

  // Fetch video likes
  useEffect(() => {
    const fetchVideoLike = async () => {
      if ( !_id) return;
      try {
        const res = await dispatch(getVideoLikes(_id));
        if (getVideoLikes.fulfilled.match(res)) {
          const likedData = res.payload;
          setlikes(likedData.length);
          const liked = likedData.some((like) => like.likeBy.includes(user._id));
          setIsLiked(liked);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchVideoLike();
  }, [dispatch, user, _id, handleLike]);

  const date = new Date(createdAt);

  return (
    <div className="text-gray-900 dark:text-white min-h-screen flex flex-col lg:flex-row gap-6 ">
      {/* Video Section */}
      <div className="flex-1">
        <div className="w-full sm:w-[1000px] h-[33vh] sm:h-[450px] rounded-xl overflow-hidden bg-black shadow-lg ">
          <video
            src={videoFile}
            controls
            className="w-full h-full object-cover rounded-xl bg-black"
          />
        </div>


        {/* Video Info */}
        <div className="flex justify-between items-center mt-2 mb-2">
          <div className="flex-1">
            <h1 className="text-sm sm:text-xl font-bold mt-3">{title}</h1>
            <div className="text-sm text-gray-700 dark:text-gray-300 flex gap-2">
              <p>{views} views</p>
              <p>
                {date.toLocaleString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
          <div>
            {!isSubscribed ? (
              <button
                className="px-4 py-2 bg-red-600 hover:bg-red-700 font-semibold text-white rounded-full"
                onClick={() => handleSubscription(owner)}
              >
                Subscribe
              </button>
            ) : (
              <button
                className="px-4 py-2 bg-gray-700 hover:bg-gray-800 font-semibold text-white rounded-full"
                onClick={() => handleSubscription(owner)}
              >
                Subscribed
              </button>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap md:flex justify-between items-center gap-4 mt-3">
          <div className="flex items-center gap-4">
            <img
              src={ownerData?.avatar || "public/Images/profile.png"}
              alt="public/Images/profile.png"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <div>{ownerData?.username || "Channel name"}</div>
              <div className="text-[12px]">{subscribeCount} Subscribers</div>
            </div>
          </div>

          <div className="flex gap-2 mt-4 md:mt-0">
            <button
              className="flex items-center gap-1 px-6 py-2 bg-gray-300 dark:bg-gray-900 rounded-full hover:bg-gray-400 dark:hover:bg-gray-700"
              onClick={handleLike}
            >
              <AiFillLike className={`${isLiked ? "text-blue-600" : "text-gray-500"} text-[1.2rem]`} />
              {likes}
            </button>

            <button
              onClick={() => setShowShare(true)}
              className="flex items-center gap-1 px-5 py-2 bg-gray-300 dark:bg-gray-900 rounded-full hover:bg-gray-400 dark:hover:bg-gray-700"
            >
              <RiShareForwardLine /> Share
            </button>
          </div>
        </div>

        {/* Description */}
        <div className="mt-4">
          <button
            onClick={() => setShowDesc(!showDesc)}
            className="text-blue-600 hover:underline cursor-pointer text-sm"
          >
            {showDesc ? "Hide Description" : "Show Description"}
          </button>
          {showDesc && (
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-800 p-3 rounded-lg">
              {description}
            </p>
          )}
        </div>

        {/* Comment Section */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-3">
            Comments ({videoComment?.length || 0})
          </h2>

          <div className="flex  sm:flex-row items-center gap-2 mb-4">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 px-3 py-2 rounded-lg border dark:border-gray-700 min-w-40 dark:bg-gray-900 outline-none"
            />
            <button
              onClick={handleAddComment}
              className="px-4 py-2 bg-gradient-to-r from-[#8b04a4] via-[#fd3243] to-[#e11755] text-white rounded-lg"
            >
              Post
            </button>
          </div>

          <div className="space-y-3">
            {commentLoading ? (
              <Loader />
            ) : videoComment && videoComment.length > 0 ? (
              videoComment.map((comment) => (
                <CommentCard key={comment._id} comment={comment} />
              ))
            ) : (
              <p className="text-sm text-gray-500">No comments yet.</p>
            )}
          </div>
        </div>
      </div>

      {/* Suggested Videos */}
      <div className="w-full lg:w-80 space-y-4">
        <h2 className="font-semibold mb-2">Suggested Videos</h2>
        <div className="space-y-2">
          {loading ? <Loader /> : videos?.map((video) => <SuggestedVideo key={video._id} video={video} />)}
        </div>
      </div>
      {showShare && (<Share setShowShare={setShowShare} links={`https://wideview.netlify.app/video/${_id}`} />)}
      {/* {showLogin && <LoginPopUp setSetShowLogin={setSetShowLogin} />} */}
    </div>
  );
}

export default Videoplayer;
