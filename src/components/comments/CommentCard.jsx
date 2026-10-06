import React, { useState, useMemo, useEffect } from "react";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import timeAgo from "../../utils/uploadedTime";
import { getUserdetils } from "../../store/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment, updateComment } from "../../store/CommentSlice";
import { toast } from "react-toastify";
import { addAsyncCommentLike } from "../../store/likeSlice";
import LoginPopUp from "../loginpupUp/LoginPopUp";

// In-memory cache for unpopulated user profiles to prevent repeated API calls
const userProfileCache = new Map();

function CommentCard({ comment, onCommentDeleted, onCommentUpdated }) {
  if (!comment) return null;

  const {
    content,
    createdAt,
    updatedAt,
    _id,
    owner,
    likes = [],
  } = comment;

  const rawDate = createdAt || updatedAt || comment?.time || comment?.timestamp;
  const timeofComment = timeAgo(rawDate);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(
    content || comment?.comment || comment?.text || ""
  );
  const [isSaving, setIsSaving] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const dispatch = useDispatch();

  // Get current user from Redux or localStorage
  const reduxUser = useSelector((state) => state.user.user);
  const currentUser = useMemo(() => {
    if (reduxUser?._id || reduxUser?.username) return reduxUser;
    try {
      const raw = localStorage.getItem("user");
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      return parsed?.user || parsed || null;
    } catch {
      return null;
    }
  }, [reduxUser]);

  const isLoggedin = Boolean(currentUser?._id);

  // 1. Resolve owner details without unnecessary API calls
  const inlineOwner = useMemo(() => {
    if (!owner) return null;
    if (Array.isArray(owner) && owner.length > 0) return owner[0];
    if (typeof owner === "object" && (owner.username || owner._id || owner.fullname)) return owner;
    return null;
  }, [owner]);

  const rawOwnerId = useMemo(() => {
    if (inlineOwner?._id) return inlineOwner._id;
    if (typeof owner === "string") return owner;
    return null;
  }, [inlineOwner, owner]);

  const [cachedOwner, setCachedOwner] = useState(() => {
    if (inlineOwner) return inlineOwner;
    if (rawOwnerId && userProfileCache.has(rawOwnerId)) {
      return userProfileCache.get(rawOwnerId);
    }
    return null;
  });

  // Only fetch if owner was not populated and not already cached
  useEffect(() => {
    if (inlineOwner || cachedOwner || !rawOwnerId) return;

    let isMounted = true;
    dispatch(getUserdetils(rawOwnerId)).then((res) => {
      if (isMounted && res.payload) {
        userProfileCache.set(rawOwnerId, res.payload);
        setCachedOwner(res.payload);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [inlineOwner, cachedOwner, rawOwnerId, dispatch]);

  const resolvedOwner = inlineOwner || cachedOwner;
  const username = resolvedOwner?.username || resolvedOwner?.fullname || "User";
  const avatar = resolvedOwner?.avatar;

  // Check if current user owns this comment
  const isOwner = useMemo(() => {
    if (!currentUser?._id) return false;
    const currentId = String(currentUser._id);
    const ownerId = rawOwnerId
      ? String(rawOwnerId)
      : typeof owner === "object"
      ? String(owner?._id || owner?.id || "")
      : String(owner || "");
    return Boolean(ownerId && currentId === ownerId);
  }, [currentUser?._id, rawOwnerId, owner]);

  // 2. Resolve Like status and count using data already in the comment object
  const initialLikesCount = useMemo(() => {
    if (typeof comment.likesCount === "number") return comment.likesCount;
    if (Array.isArray(likes)) return likes.length;
    return 0;
  }, [comment.likesCount, likes]);

  const initialIsLiked = useMemo(() => {
    if (typeof comment.isLiked === "boolean") return comment.isLiked;
    if (!currentUser?._id || !Array.isArray(likes)) return false;
    return likes.some((l) => {
      const id = typeof l === "object" ? l?.likeBy || l?.likedBy || l?._id : l;
      return String(id) === String(currentUser._id);
    });
  }, [comment.isLiked, currentUser?._id, likes]);

  const [likeCount, setLikeCount] = useState(initialLikesCount);
  const [isLiked, setIsLiked] = useState(initialIsLiked);

  // Synchronize when comment prop updates
  useEffect(() => {
    setEditedContent(content || comment?.comment || comment?.text || "");
    setLikeCount(initialLikesCount);
    setIsLiked(initialIsLiked);
  }, [content, comment, initialLikesCount, initialIsLiked]);

  // Handle Like toggle (Only 1 API call on click, zero on mount!)
  const handleLike = async () => {
    if (!isLoggedin) {
      setShowLogin(true);
      toast.info("Please sign in to like comments");
      return;
    }
    if (!_id) return;

    // Optimistic toggle
    const newIsLiked = !isLiked;
    const newCount = newIsLiked ? likeCount + 1 : Math.max(0, likeCount - 1);
    setIsLiked(newIsLiked);
    setLikeCount(newCount);

    try {
      await dispatch(addAsyncCommentLike(_id)).unwrap();
    } catch {
      // Revert if API fails
      setIsLiked(!newIsLiked);
      setLikeCount(likeCount);
      toast.error("Failed to update like");
    }
  };

  // Handle Edit/Update
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setEditedContent(content || comment?.comment || comment?.text || "");
  };

  const handleSave = async () => {
    const trimmed = editedContent.trim();
    if (!trimmed || !_id) {
      setIsEditing(false);
      return;
    }

    try {
      setIsSaving(true);
      const res = await dispatch(
        updateComment({ _id, editedContent: trimmed })
      );

      if (updateComment.fulfilled.match(res)) {
        toast.success("Comment updated!", { autoClose: 1000, theme: "dark" });
        setIsEditing(false);
        if (typeof onCommentUpdated === "function") {
          onCommentUpdated({ ...comment, content: trimmed });
        }
      } else {
        toast.error(res.payload || "Failed to update comment");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update comment");
    } finally {
      setIsSaving(false);
    }
  };

  // Handle Delete
  const handleDelete = async () => {
    if (!_id) return;
    try {
      const res = await dispatch(deleteComment(_id));
      if (deleteComment.fulfilled.match(res)) {
        toast.success("Comment deleted", { autoClose: 1000, theme: "dark" });
        if (typeof onCommentDeleted === "function") {
          onCommentDeleted(_id);
        }
      } else {
        toast.error(res.payload || "Failed to delete comment");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete comment");
    }
  };

  return (
    <div className="flex items-start gap-3 bg-white dark:bg-gray-800/80 border border-gray-100 dark:border-gray-700/60 p-4 rounded-2xl shadow-xs transition hover:shadow-sm">
      {/* Avatar */}
      <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 shrink-0 flex items-center justify-center overflow-hidden">
        {avatar ? (
          <img
            src={avatar}
            alt={username}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "/Images/profile.png";
            }}
          />
        ) : (
          <span className="text-gray-500 dark:text-gray-300 font-bold text-sm">
            {username.charAt(0).toUpperCase()}
          </span>
        )}
      </div>

      {/* Comment Body */}
      <div className="flex-1 min-w-0">
        {/* Header: Username + Time */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            {username}
          </span>
          <span className="text-[11px] text-gray-400 dark:text-gray-500">
            {timeofComment}
          </span>
        </div>

        {/* Content / Editor */}
        {isEditing ? (
          <div className="mt-2 space-y-2">
            <textarea
              className="w-full text-sm p-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-blue-500 transition resize-none"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              rows={2}
              autoFocus
            />
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                disabled={isSaving || !editedContent.trim()}
                className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold transition disabled:opacity-50 cursor-pointer"
              >
                {isSaving ? "Saving..." : "Save"}
              </button>
              <button
                onClick={handleEditToggle}
                disabled={isSaving}
                className="px-3.5 py-1.5 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg text-xs font-semibold transition cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <p className="text-sm mt-1.5 text-gray-700 dark:text-gray-200 leading-relaxed whitespace-pre-line break-words">
            {editedContent || content || comment?.comment || comment?.text || ""}
          </p>
        )}

        {/* Actions Row */}
        {!isEditing && (
          <div className="flex gap-4 mt-2.5 text-xs items-center text-gray-500 dark:text-gray-400">
            {/* Like Button */}
            <button
              onClick={handleLike}
              className={`flex items-center gap-1.5 transition cursor-pointer hover:text-blue-500 ${
                isLiked ? "text-blue-600 dark:text-blue-400 font-semibold" : ""
              }`}
              title="Like comment"
            >
              <AiFillLike
                size={15}
                className={isLiked ? "text-blue-600 dark:text-blue-400" : ""}
              />
              <span>{likeCount}</span>
            </button>

            {/* Owner Actions: Edit & Delete */}
            {isOwner && (
              <>
                <button
                  onClick={handleEditToggle}
                  className="flex items-center gap-1 hover:text-blue-500 transition cursor-pointer"
                >
                  <FaEdit size={12} />
                  <span>Edit</span>
                </button>
                <button
                  onClick={handleDelete}
                  className="flex items-center gap-1 hover:text-red-500 transition cursor-pointer"
                >
                  <FaTrashAlt size={12} />
                  <span>Delete</span>
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {showLogin && <LoginPopUp setSetShowLogin={setShowLogin} />}
    </div>
  );
}

export default CommentCard;
