import React, { useEffect, useState } from "react";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import { AiFillLike } from "react-icons/ai";
import timeAgo from "../../utils/uploadedTime";
import { getUserdetils } from "../../store/UserSlice";
import { useDispatch } from "react-redux";
import { deleteComment, updateComment } from "../../store/CommentSlice";
import { toast } from "react-toastify";
import { addAsyncCommentLike, fetchAsyncCommentLike } from '../../store/likeSlice'

function CommentCard({ comment: { content, createdAt, _id, owner, likes = [] } }) {
   const timeofComment = timeAgo(createdAt);
   const [loading, setLoading] = useState(false);
   const [ownerData, setOwnerData] = useState(null);
   const [isEditing, setIsEditing] = useState(false);
   const [editedContent, setEditedContent] = useState(content);
   // Like state
   const [isLiked, setIsLiked] = useState(false);
   const [likeCount, setLikeCount] = useState(likes?.length || 0);
   const [isLoggedin, setIsLoggedin] = useState(false)

   const dispatch = useDispatch();
   const user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;



   useEffect(() => {
      const getuserDitails = async (ownerId) => {
         if (!ownerId) return;
         try {
            setLoading(true);
            const resultAction = await dispatch(getUserdetils(ownerId));
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
   }, [owner, dispatch]);

   // Initialize like status
   useEffect(() => {
      if (user && likes?.includes(user._id)) {
         setIsLiked(true);
      }
      if (user) {
         setIsLoggedin(true);
      }
   }, [dispatch]);

   const handleDelete = async () => {
      try {
         if (!_id) return;
         setLoading(true);
         const res = await dispatch(deleteComment(_id));
         if (deleteComment.fulfilled.match(res)) {
            toast.success("Comment deleted successfully", {
               autoClose: 500,
               theme: "dark",
            });
         }
      } catch (error) {
         console.log(error);
         toast.error("Comment deletion failed. Please try again.", {
            autoClose: 2000,
            theme: "dark",
         });
      } finally {
         setLoading(false);
      }
   };

   const handleEditToggle = () => {
      setIsEditing(!isEditing);
   };

   const handleSave = async () => {
      if (!editedContent) setIsEditing(false);
      if (!_id) return;
      try {
         setLoading(true);
         await dispatch(updateComment({ _id, editedContent }));
         toast.success("Comment updated", { autoClose: 500 });
      } catch (error) {
         console.log(error);
         toast.error("Update failed", { autoClose: 2000 });
      } finally {
         setLoading(false);
         setIsEditing(false);
      }
   };

   // Like button handler
   const handleLike = async () => {
      try {
         if (!_id) return;
         if (!user) return;
         if (!isLoggedin) return;
         setLoading(true);
         const res = await dispatch(addAsyncCommentLike(_id));
         if (addAsyncCommentLike.fulfilled.match(res)) {
            const loggedInUser = res.payload;

            if (loggedInUser && loggedInUser.length >= 0) {
               // check if current user has liked the video
               const liked = loggedInUser.some((like) => like.likeBy.includes(user._id));
               setIsLiked(liked);
            } else {
               setIsLiked(false);
            }
         }
      } catch (error) {
         console.log(error)
      } finally {
         setLoading(false);
      }
   }

   useEffect(() => {
      const fetchCommentLike = async () => {
         try {
            if (!user) return;
            if (!_id) return;
            const res = await dispatch(fetchAsyncCommentLike(_id));
            if (fetchAsyncCommentLike.fulfilled.match(res)) {
               const loggedInUser = res.payload;
               if (loggedInUser.length > 0) {
                  setLikeCount(loggedInUser.length);
                  loggedInUser.map((like) => {
                     const liked = like.likeBy.includes(user._id)
                     if (liked) {
                        setIsLiked(true);
                     }
                  })
               }

            }

         } catch (error) {
            console.log(error);

         } finally {
            setLoading(false);
         }
      }
      fetchCommentLike()
   }, [dispatch])



   return (
      <div className="flex items-start gap-3 bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
         {/* Avatar */}
         <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
            {loading ? (
               <ImSpinner2 className="animate-spin text-gray-600" size={18} />
            ) : ownerData?.avatar ? (
               <img
                  src={ownerData.avatar}
                  alt={ownerData.username || "User"}
                  className="w-full h-full object-cover"
               />
            ) : (
               <span className="text-white font-bold">
                  {ownerData?.username?.charAt(0).toUpperCase() || "U"}
               </span>
            )}
         </div>

         {/* Comment Details */}
         <div className="flex-1">
            <div className="flex justify-between items-center">
               <p className="text-sm font-semibold">
                  {loading ? "Loading..." : ownerData?.username || "Unknown User"}
               </p>
               <span className="text-xs text-gray-500">{timeofComment}</span>
            </div>

            {/* Content */}
            {isEditing ? (
               <textarea
                  className="w-full text-sm mt-1 p-2 border rounded dark:bg-gray-700 dark:text-gray-200"
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
               />
            ) : (
               <p className="text-sm mt-1 text-gray-800 dark:text-gray-200">
                  {editedContent}
               </p>
            )}

            {/* Actions */}
            <div className="flex gap-4 mt-2 text-xs items-center">
               {/* Like button */}
               <button
                  onClick={handleLike}
                  className="flex items-center gap-1 text-gray-600 hover:text-blue-600"
               >
                  <AiFillLike
                     size={16}
                     className={isLiked ? "text-blue-600" : "text-gray-500"}
                  />
                  {likeCount}
               </button>

               {/* Show edit/delete only if current user is owner */}
               {user?._id === owner && (
                  <>
                     {isEditing ? (
                        <>
                           <button
                              onClick={() => handleSave()}
                              className="flex items-center gap-1 text-green-600 hover:text-green-800"
                           >
                              Save
                           </button>
                           <button
                              onClick={handleEditToggle}
                              className="flex items-center gap-1 text-gray-600 hover:text-gray-800"
                           >
                              Cancel
                           </button>
                        </>
                     ) : (
                        <>
                           <button
                              onClick={handleEditToggle}
                              className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                           >
                              <FaEdit size={14} /> Edit
                           </button>
                           <button
                              onClick={handleDelete}
                              className="flex items-center gap-1 text-red-600 hover:text-red-800"
                           >
                              <FaTrashAlt size={14} /> Delete
                           </button>
                        </>
                     )}
                  </>
               )}
            </div>
         </div>
      </div>
   );
}

export default CommentCard;
