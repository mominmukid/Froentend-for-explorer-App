import React, { useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { IoPersonCircleOutline } from "react-icons/io5";
import { RiShareForwardLine } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";
import SuggestedVideo from "./SuggestedVideo";
import { FaRegEdit } from "react-icons/fa";

function Videoplayer() {
   const [showDesc, setShowDesc] = useState(false);
   const [showShare, setShowShare] = useState(false);
   const [comments, setComments] = useState([
      { id: 1, user: "John Doe", text: "Great video! 🔥" },
      { id: 2, user: "Jane Smith", text: "Very helpful, thanks!" },
   ]);
   const [newComment, setNewComment] = useState("");

   // For editing comments
   const [editingCommentId, setEditingCommentId] = useState(null);
   const [editText, setEditText] = useState("");

   // Add new comment
   const handleAddComment = () => {
      if (newComment.trim() === "") return;
      const comment = {
         id: Date.now(),
         user: "You",
         text: newComment,
      };
      setComments([comment, ...comments]);
      setNewComment("");
   };

   // Delete comment
   const handleDeleteComment = (id) => {
      setComments(comments.filter((c) => c.id !== id));
   };

   // Start editing
   const handleEditStart = (comment) => {
      setEditingCommentId(comment.id);
      setEditText(comment.text);
   };

   // Save edit
   const handleEditSave = (id) => {
      setComments(
         comments.map((c) =>
            c.id === id ? { ...c, text: editText } : c
         )
      );
      setEditingCommentId(null);
      setEditText("");
   };

   return (
      <div className="text-gray-900 dark:text-white min-h-screen flex flex-col lg:flex-row gap-6 p-4">

         {/* Video Section */}
         <div className="flex-1">
            {/* Video Player */}
            <div className="w-full aspect-video rounded-lg overflow-hidden">
               <video
                  src="public/Videos/5121889_Person_People_3840x2160.mp4"
                  controls
               ></video>
            </div>

            {/* Video Info */}
            <div className="flex justify-between items-center mt-2 mb-2">
               <div>
                  <h1 className="text sm:text-xl font-bold mt-3">Sample Video Title</h1>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                     1,234,567 views • Sep 18, 2025
                  </p>
               </div>
               <div>
                  <button className="px-4 py-2 bg-red-600 hover:bg-red-700 font-semibold cursor-pointer text-white rounded-full flex justify-center items-center">
                     Subscribe
                  </button>
               </div>
            </div>

            {/* Actions */}
            <div className="flex-1 flex-wrap md:flex justify-between items-center gap-4 mt-3">
               <div className="flex justify-start items-center gap-4">
                  <div className="text-5xl h-10 w-10 rounded-full bg-red-400 flex justify-center items-center">
                     <IoPersonCircleOutline />
                  </div>
                  <div className="flex-col items-center justify-center">
                     <div>Channel Name</div>
                     <div className="text-[12px]">730K Subscribers</div>
                  </div>
               </div>

               <div className="flex gap-2 mt-4 md:mt-0">
                  <button className="flex items-center justify-center gap-1 px-6 py-2 bg-gray-300 dark:bg-gray-900 rounded-full cursor-pointer hover:bg-gray-400 dark:hover:bg-gray-700">
                     <span className="text-xl mr-1 flex justify-center items-center">
                        <AiFillLike />
                     </span>
                     120
                  </button>
                  <button
                     onClick={() => setShowShare(true)}
                     className="flex items-center justify-center gap-1 px-5 py-2 bg-gray-300 dark:bg-gray-900 rounded-full hover:bg-gray-400 cursor-pointer dark:hover:bg-gray-700"
                  >
                     <span className="text-xl mr-1 flex justify-center items-center">
                        <RiShareForwardLine />
                     </span>
                     Share
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
                     This is a sample video description. Add details, hashtags, and
                     links here like YouTube.
                  </p>
               )}
            </div>

            {/* Comment Section */}
            <div className="mt-6">
               <h2 className="font-semibold text-lg mb-2">Comments</h2>

               {/* Add Comment */}
               <div className="flex items-center gap-2 mb-4">
                  <input
                     type="text"
                     placeholder="Add a comment..."
                     value={newComment}
                     onChange={(e) => setNewComment(e.target.value)}
                     className="flex-1 px-3 py-2 border-b dark:bg-[#202222] bg-gray-100 outline-none text-md"
                  />
                  <button
                     onClick={handleAddComment}
                     className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
                  >
                     Comment
                  </button>
               </div>

               {/* Show Comments */}
               {comments.length === 0 ? (
                  <p className="text-gray-500">No comments yet. Be the first!</p>
               ) : (
                  <div className="space-y-4 dark:bg-[#212222] p-3 rounded-lg">
                     {comments.map((c) => (
                        <div
                           key={c.id}
                           className="dark:bg-[#202222] p-3 rounded-lg flex justify-between items-start"
                        >
                           <div className="flex-1">
                              <p className="font-semibold">{c.user}</p>

                              {editingCommentId === c.id ? (
                                 <div className="flex gap-2 mt-1">
                                    <input
                                       type="text"
                                       value={editText}
                                       onChange={(e) => setEditText(e.target.value)}
                                       className="flex-1 px-2 py-1 border-b  dark:bg-gray-900"
                                    />
                                    <button
                                       onClick={() => handleEditSave(c.id)}
                                       className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm cursor-pointer"
                                    >
                                       Save
                                    </button>
                                    <button
                                       onClick={() => {
                                          setEditingCommentId(null);
                                          setEditText("");
                                       }}
                                       className="px-2 py-1 bg-gray-400 text-white rounded hover:bg-gray-500 text-sm cursor-pointer"
                                    >
                                       Cancel
                                    </button>
                                 </div>
                              ) : (
                                 <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {c.text}
                                 </p>
                              )}
                           </div>

                           {c.user === "You" && editingCommentId !== c.id && (
                              <div className="flex gap-2 ml-2">
                                 <button
                                    onClick={() => handleEditStart(c)}
                                    className="text-blue-500 hover:underline text-[16px] flex justify-center items-center cursor-pointer"
                                 >
                                    <FaRegEdit /> Edit
                                 </button>
                                 <button
                                    onClick={() => handleDeleteComment(c.id)}
                                    className="text-red-500 hover:text-red-600 text-[16px] flex justify-center items-center cursor-pointer"
                                 >
                                    <MdDeleteForever />Delete
                                 </button>
                              </div>
                           )}
                        </div>
                     ))}
                  </div>
               )}
            </div>
         </div>

         {/* Suggested Videos */}
         <aside className="w-full lg:w-80 space-y-4">
            <h2 className="font-semibold mb-2">Suggested Videos</h2>
            <div className="space-y-2">
               <div className="flex-1 gap-3 p-2 rounded-lg">
                  <SuggestedVideo />
                  <SuggestedVideo />
                  <SuggestedVideo />
                  <SuggestedVideo />
               </div>
            </div>
         </aside>

         {/* Share Modal */}
         {showShare && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
               <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-80">
                  <h3 className="text-lg font-bold mb-3">Share Video</h3>
                  <input
                     type="text"
                     value="https://yourdomain.com/video/123"
                     readOnly
                     className="w-full px-3 py-2 border rounded bg-gray-100 dark:bg-gray-800"
                  />
                  <div className="flex justify-end mt-4">
                     <button
                        onClick={() => setShowShare(false)}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                     >
                        Close
                     </button>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
}

export default Videoplayer;
