import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { RiShareForwardLine } from "react-icons/ri";
import SuggestedVideo from "./SuggestedVideo";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllVideos,
  fetchAsyncVideos,
  setVideoViews,
} from "../../store/VideoFeatureSlice";
import { setuserLike, getUserdetils } from "../../store/UserSlice";
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
import Share from "../share/Share";

function Videoplayer({
  singleVideo: { _id, title, videoFile, description, viewsCount, createdAt, owner },
}) {
  const dispatch = useDispatch();
  const rawVideos = useSelector(getAllVideos);
  const commentStatus = useSelector((state) => state.comment.commentStatus);
  const commentsFromRedux = useSelector(getAllComments);

  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscribeCount, setSubscribeCount] = useState(0);
  const [ownerData, setOwnerData] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedin, setIsLoggedin] = useState(false);

  const [loadingSuggested, setLoadingSuggested] = useState(true);
  const [showDesc, setShowDesc] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [videoComments, setVideoComments] = useState([]);
  const [commentLoading, setCommentLoading] = useState(false);
  const [submittingComment, setSubmittingComment] = useState(false);

  const playerRef = useRef(null);
  const videoRef = useRef(null);

  // Focus and scroll to video player on mount/video change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    if (playerRef.current) {
      playerRef.current.scrollIntoView({ behavior: "instant", block: "start" });
    }
    if (videoRef.current) {
      videoRef.current.focus?.();
    }
  }, [_id]);

  // Sync user from localStorage/state
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const parsed = JSON.parse(userData);
        const userObj = parsed?.user || parsed;
        if (userObj?._id) {
          setCurrentUser(userObj);
          setIsLoggedin(true);
        } else {
          setCurrentUser(null);
          setIsLoggedin(false);
        }
      } catch {
        setCurrentUser(null);
        setIsLoggedin(false);
      }
    } else {
      setCurrentUser(null);
      setIsLoggedin(false);
    }
  }, [_id]);

  // Record view count once on mount for this video
  useEffect(() => {
    if (_id) {
      dispatch(setVideoViews(_id));
    }
  }, [_id, dispatch]);

  // Fetch channel subscribers
  useEffect(() => {
    if (!owner) return;
    const fetchSubscribers = async () => {
      try {
        const resultActions = await dispatch(getChannelSubscibres(owner));
        if (getChannelSubscibres.fulfilled.match(resultActions)) {
          const subscribedChannels = resultActions.payload || [];
          const subscribed = Array.isArray(subscribedChannels)
            ? subscribedChannels.some((subId) => String(subId) === String(currentUser?._id))
            : false;
          setIsSubscribed(subscribed);
          setSubscribeCount(subscribedChannels.length);
        }
      } catch (err) {
        console.error("Error fetching subscribers:", err);
      }
    };
    fetchSubscribers();
  }, [owner, currentUser?._id, dispatch]);

  // Fetch suggested videos
  useEffect(() => {
    const fetchData = async () => {
      setLoadingSuggested(true);
      try {
        await dispatch(fetchAsyncVideos(15));
      } finally {
        setLoadingSuggested(false);
      }
    };
    fetchData();
  }, [dispatch]);

  // Fetch owner details
  useEffect(() => {
    if (!owner) return;
    if (typeof owner === "object" && owner?.username) {
      setOwnerData(owner);
      return;
    }
    const fetchOwnerDetails = async () => {
      try {
        const resultAction = await dispatch(getUserdetils(owner));
        if (getUserdetils.fulfilled.match(resultAction)) {
          setOwnerData(resultAction.payload);
        }
      } catch (error) {
        console.error("Error fetching owner:", error);
      }
    };
    fetchOwnerDetails();
  }, [dispatch, owner]);

  // Fetch comments
  useEffect(() => {
    if (!_id) return;
    const loadComments = async () => {
      setCommentLoading(true);
      try {
        const resultAction = await dispatch(fetchAsyncComments(_id));
        if (fetchAsyncComments.fulfilled.match(resultAction)) {
          const payload = resultAction.payload;
          const list = Array.isArray(payload)
            ? payload
            : Array.isArray(payload?.docs)
            ? payload.docs
            : Array.isArray(payload?.comments)
            ? payload.comments
            : Array.isArray(payload?.data)
            ? payload.data
            : [];
          setVideoComments(list);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setCommentLoading(false);
      }
    };
    loadComments();
  }, [_id, commentStatus, dispatch]);

  // Sync redux comments when updated
  useEffect(() => {
    if (commentsFromRedux) {
      const list = Array.isArray(commentsFromRedux)
        ? commentsFromRedux
        : Array.isArray(commentsFromRedux?.docs)
        ? commentsFromRedux.docs
        : Array.isArray(commentsFromRedux?.comments)
        ? commentsFromRedux.comments
        : Array.isArray(commentsFromRedux?.data)
        ? commentsFromRedux.data
        : [];
      setVideoComments(list);
    }
  }, [commentsFromRedux]);

  // Fetch video likes count & user like state
  const loadLikes = useCallback(async () => {
    if (!_id) return;
    try {
      const res = await dispatch(getVideoLikes(_id));
      if (getVideoLikes.fulfilled.match(res)) {
        const likedData = res.payload || [];
        setLikes(likedData.length);
        if (currentUser?._id) {
          const liked = likedData.some((item) => {
            const likeBy = item?.likeBy || item?.likedBy;
            return Array.isArray(likeBy)
              ? likeBy.includes(currentUser._id)
              : String(likeBy) === String(currentUser._id);
          });
          setIsLiked(liked);
        }
      }
    } catch (error) {
      console.error("Error fetching video likes:", error);
    }
  }, [_id, currentUser?._id, dispatch]);

  useEffect(() => {
    loadLikes();
  }, [loadLikes]);

  // Handle like toggle
  const handleLike = async () => {
    if (!isLoggedin) {
      toast.info("Please login to like this video", { autoClose: 2000, theme: "dark" });
      return;
    }
    if (!_id) return;

    // Optimistic UI update
    setIsLiked((prev) => !prev);
    setLikes((prev) => (isLiked ? Math.max(0, prev - 1) : prev + 1));

    try {
      await dispatch(setuserLike(_id));
      await loadLikes();
    } catch (error) {
      console.error(error);
      loadLikes();
    }
  };

  // Handle subscription toggle
  const handleSubscription = async () => {
    if (!isLoggedin) {
      toast.info("Please login to subscribe", { autoClose: 2000, theme: "dark" });
      return;
    }
    const channelId = typeof owner === "object" ? owner?._id : owner;
    if (!channelId) return;

    try {
      const resultAction = await dispatch(userSubscribeTochannel(channelId));
      if (userSubscribeTochannel.fulfilled.match(resultAction)) {
        const subscribedUsers = resultAction.payload || [];
        const subscribed = Array.isArray(subscribedUsers)
          ? subscribedUsers.some((u) => String(u).includes(String(currentUser?._id)))
          : false;
        setIsSubscribed(subscribed);
        setSubscribeCount(subscribedUsers.length);
        toast.success(subscribed ? "Subscribed to channel!" : "Unsubscribed from channel", {
          autoClose: 1500,
          theme: "dark",
        });
      }
    } catch (error) {
      console.error("Subscription error:", error);
    }
  };

  // Handle comment submit
  const handleAddComment = async (e) => {
    e?.preventDefault();
    if (!isLoggedin) {
      toast.info("Please login to comment", { autoClose: 2000, theme: "dark" });
      return;
    }
    const trimmed = newComment.trim();
    if (!trimmed || !_id) return;

    try {
      setSubmittingComment(true);
      const resultAction = await dispatch(addAsyncComment({ _id, newComment: trimmed }));
      if (addAsyncComment.fulfilled.match(resultAction)) {
        setNewComment("");
        toast.success("Comment posted!", { autoClose: 1000, theme: "dark" });
        const createdData = resultAction.payload;

        // Construct full comment with current user as owner so Edit/Delete options are active
        const createdComment = {
          _id: createdData?._id || "c-" + Date.now(),
          content: trimmed,
          createdAt: createdData?.createdAt || new Date().toISOString(),
          updatedAt: createdData?.updatedAt || new Date().toISOString(),
          owner: (createdData?.owner && typeof createdData.owner === "object") ? createdData.owner : currentUser,
          likes: createdData?.likes || [],
          likesCount: 0,
          isLiked: false,
        };

        // Embed newly created comment ON TOP of list immediately
        setVideoComments((prev) => [
          createdComment,
          ...(Array.isArray(prev) ? prev.filter((c) => c._id !== createdComment._id) : []),
        ]);

        // Background sync
        dispatch(fetchAsyncComments(_id));
      } else {
        toast.error(resultAction.payload || "Failed to post comment");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to post comment");
    } finally {
      setSubmittingComment(false);
    }
  };

  const formattedDate = useMemo(() => {
    if (!createdAt) return "Recently";
    try {
      return new Date(createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return "Recently";
    }
  }, [createdAt]);

  const shareUrl = typeof window !== "undefined" ? window.location.href : `https://wideview.netlify.app/video/${_id}`;

  const otherVideos = useMemo(() => {
    return (rawVideos || []).filter((v) => v._id !== _id);
  }, [rawVideos, _id]);

  return (
    <div className="text-gray-900 dark:text-white min-h-screen flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto px-2 sm:px-4 py-2">
      {/* Left Column: Player, Video Details, Comments */}
      <div className="flex-1 min-w-0">
        {/* Video Player Box */}
        <div ref={playerRef} className="w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/10">
          <video
            ref={videoRef}
            tabIndex={0}
            src={videoFile}
            controls
            autoPlay
            className="w-full h-full object-contain bg-black focus:outline-none"
          />
        </div>

        {/* Video Title */}
        <h1 className="text-lg sm:text-2xl font-bold mt-4 line-clamp-2 leading-tight">
          {title}
        </h1>

        {/* Channel Info & Action Buttons Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-3 pb-3 border-b border-gray-200 dark:border-gray-800">
          {/* Creator Profile */}
          <div className="flex items-center gap-3">
            <img
              src={ownerData?.avatar || "/Images/profile.png"}
              alt="Owner"
              onError={(e) => {
                e.currentTarget.src = "/Images/profile.png";
              }}
              className="w-11 h-11 rounded-full object-cover border border-gray-200 dark:border-gray-700"
            />
            <div>
              <div className="font-semibold text-sm sm:text-base leading-tight">
                {ownerData?.username || "Creator Channel"}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {subscribeCount} {subscribeCount === 1 ? "subscriber" : "subscribers"}
              </div>
            </div>

            {/* Subscribe Button */}
            <button
              onClick={handleSubscription}
              className={`ml-3 px-4 py-2 text-sm font-semibold rounded-full transition cursor-pointer ${
                isSubscribed
                  ? "bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700"
                  : "bg-red-600 hover:bg-red-700 text-white shadow-sm"
              }`}
            >
              {isSubscribed ? "Subscribed" : "Subscribe"}
            </button>
          </div>

          {/* Like & Share Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-medium text-sm transition cursor-pointer ${
                isLiked
                  ? "bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400 border border-red-200 dark:border-red-900"
                  : "bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200"
              }`}
              title="Like video"
            >
              {isLiked ? (
                <AiFillLike className="text-lg text-red-600 dark:text-red-400" />
              ) : (
                <AiOutlineLike className="text-lg" />
              )}
              <span>{likes}</span>
            </button>

            <button
              onClick={() => setShowShare(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full font-medium text-sm transition cursor-pointer"
            >
              <RiShareForwardLine className="text-lg" />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Video Description Box */}
        <div className="mt-3 p-3.5 bg-gray-100 dark:bg-gray-800/80 rounded-2xl text-sm transition">
          <div className="flex items-center gap-2 font-semibold text-gray-700 dark:text-gray-300 text-xs mb-1">
            <span>{viewsCount || 0} views</span>
            <span>•</span>
            <span>{formattedDate}</span>
          </div>

          <p
            className={`text-gray-800 dark:text-gray-200 whitespace-pre-line leading-relaxed ${
              !showDesc && "line-clamp-2"
            }`}
          >
            {description || "No description provided for this video."}
          </p>

          {description && description.length > 100 && (
            <button
              onClick={() => setShowDesc(!showDesc)}
              className="mt-2 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer block"
            >
              {showDesc ? "Show less" : "...more"}
            </button>
          )}
        </div>

        {/* Comments Section */}
        <section className="mt-6">
          <h2 className="text-lg font-bold mb-4">
            Comments ({videoComments?.length || 0})
          </h2>

          {/* Add comment input */}
          <form onSubmit={handleAddComment} className="flex gap-2 sm:gap-3 mb-6">
            <img
              src={currentUser?.avatar || "/Images/profile.png"}
              alt="You"
              onError={(e) => {
                e.currentTarget.src = "/Images/profile.png";
              }}
              className="w-10 h-10 rounded-full object-cover hidden sm:block border border-gray-200 dark:border-gray-700"
            />
            <div className="flex-1 flex gap-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder={isLoggedin ? "Add a public comment..." : "Login to write a comment"}
                disabled={!isLoggedin || submittingComment}
                className="flex-1 px-4 py-2.5 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800/90 text-sm focus:outline-none focus:border-blue-500 transition"
              />
              <button
                type="submit"
                disabled={!isLoggedin || !newComment.trim() || submittingComment}
                className="px-5 py-2.5 bg-gradient-to-r from-[#8b04a4] via-[#fd3243] to-[#e11755] text-white text-sm font-semibold rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-95 transition cursor-pointer shadow-xs"
              >
                {submittingComment ? "Posting..." : "Comment"}
              </button>
            </div>
          </form>

          {/* Comment list */}
          <div className="space-y-3">
            {commentLoading ? (
              <div className="space-y-3 animate-pulse">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-3 p-3 bg-gray-100 dark:bg-gray-800 rounded-xl">
                    <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-700" />
                    <div className="flex-1 space-y-2">
                      <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/4" />
                      <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-3/4" />
                    </div>
                  </div>
                ))}
              </div>
            ) : videoComments && videoComments.length > 0 ? (
              videoComments.map((comment, idx) => (
                <CommentCard key={comment._id || comment.id || idx} comment={comment} />
              ))
            ) : (
              <p className="text-sm text-gray-500 dark:text-gray-400 py-6 text-center">
                No comments yet. Be the first to share your thoughts!
              </p>
            )}
          </div>
        </section>
      </div>

      {/* Right Column: Suggested Videos */}
      <aside className="w-full lg:w-80 lg:shrink-0 space-y-3">
        <h2 className="font-bold text-base mb-3 text-gray-900 dark:text-white">
          Suggested Videos
        </h2>
        <div className="space-y-3">
          {loadingSuggested ? (
            <div className="space-y-3 animate-pulse">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex gap-2">
                  <div className="w-36 aspect-video bg-gray-300 dark:bg-gray-700 rounded-lg" />
                  <div className="flex-1 space-y-2 py-1">
                    <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-full" />
                    <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : otherVideos.length > 0 ? (
            otherVideos.map((video) => (
              <SuggestedVideo key={video._id} video={video} />
            ))
          ) : (
            <p className="text-xs text-gray-500">No suggestions available.</p>
          )}
        </div>
      </aside>

      {/* Share Modal */}
      {showShare && (
        <Share setShowShare={setShowShare} links={shareUrl} />
      )}
    </div>
  );
}

export default Videoplayer;
