import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import {
  fetchAsyncplaylistById,
  updatePlayListDetils,
  deletePlaylist,
} from "../store/playlistSlice";
import { getUserdetils } from "../store/UserSlice";
import PlayListCard from "../components/playlist/PlayListCard";
import { toast } from "react-toastify";
import { MdOutlineCancel } from "react-icons/md";
import { FaSave, FaEdit, FaTrash } from "react-icons/fa";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

function PlaylistDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [playlist, setPlaylist] = useState(null);
  const [owner, setOwner] = useState(null);
  const [loading, setLoading] = useState(false);

  // Update form states
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [updateStates, setUpdateStates] = useState(false);

  // Fetch Playlist
  useEffect(() => {
    const fetchPlaylist = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const resultAction = await dispatch(fetchAsyncplaylistById(id));
        if (fetchAsyncplaylistById.fulfilled.match(resultAction)) {
          setPlaylist(resultAction.payload);
          setNewName(resultAction.payload.name || "");
          setNewDescription(resultAction.payload.description || "");
        }
      } catch (error) {
        console.error("Error fetching playlist:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlaylist();
  }, [dispatch, id, updateStates]);

  // Fetch Owner
  useEffect(() => {
    const fetchOwner = async () => {
      if (!playlist?.owner) return;
      setLoading(true);
      try {
        const resultAction = await dispatch(getUserdetils(playlist.owner));
        if (getUserdetils.fulfilled.match(resultAction)) {
          setOwner(resultAction.payload);
        }
      } catch (error) {
        console.error("Error fetching owner:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOwner();
  }, [dispatch, playlist?.owner]);

  // Update playlist
  const handleUpdatePlaylist = async () => {
    if (!newName.trim()) {
      toast.error("Playlist name cannot be empty");
      return;
    }
    setLoading(true);
    try {
      const resultAction = await dispatch(
        updatePlayListDetils({ id, newName, newDescription })
      );
      if (updatePlayListDetils.fulfilled.match(resultAction)) {
        toast.success("Playlist updated successfully!");
        setPlaylist(resultAction.payload);
        setEditing(false);
        setUpdateStates(!updateStates);
      } else {
        toast.error("Failed to update playlist");
      }
    } catch (error) {
      console.error("Error updating playlist:", error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Cancel edit
  const handleCancel = () => {
    setNewName(playlist?.name || "");
    setNewDescription(playlist?.description || "");
    setEditing(false);
    toast.info("Changes discarded");
  };

  // Delete playlist with styled ConfirmDialog
  const handleDelete = () => {
    confirmDialog({
      message: (
        <div className="text-center text-gray-800 dark:text-gray-200">
          Are you sure you want to delete this playlist?
        </div>
      ),
      header: (
        <div className="font-bold text-lg text-gray-900 dark:text-gray-100">
          Delete Playlist
        </div>
      ),
      icon: "pi pi-exclamation-triangle text-yellow-500 mr-2 text-xl",
      accept: async () => {
        setLoading(true);
        try {
          const resultAction = await dispatch(deletePlaylist(id));
          if (deletePlaylist.fulfilled.match(resultAction)) {
            toast.success("Playlist deleted successfully!");
            navigate("/playlist");
          } else {
            toast.error("Failed to delete playlist");
          }
        } catch (error) {
          console.error(error);
          toast.error("Something went wrong");
        } finally {
          setLoading(false);
        }
      },
      reject: () => toast.info("Delete cancelled"),
      className:
        "rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 w-[90%] sm:w-[400px]",
      footerClassName: "flex justify-between items-center px-4 pt-4 gap-3",
      acceptClassName:
        "px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition",
      rejectClassName:
        "px-4 py-2 rounded-lg bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-400 transition",
    });
  };

  if (loading && !playlist) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-700 dark:text-gray-300">
        Loading...
      </div>
    );
  }

  if (!playlist) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-700 dark:text-gray-300">
        No playlist found
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full sm:p-6">
      <ConfirmDialog />
      <div className="w-full sm:max-w-5xl mx-auto rounded-2xl sm:p-6">
        {/* Playlist Info */}
        <div className="flex items-center gap-4 mb-6">
          <img
            src={owner?.avatar || "https://via.placeholder.com/100"}
            alt={owner?.username || "Owner"}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="flex-1">
            {editing ? (
              <>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full p-2 border rounded mb-2 dark:bg-gray-800 dark:text-white"
                  placeholder="Playlist Name"
                />
                <textarea
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
                  rows="2"
                  placeholder="Playlist Description"
                />
              </>
            ) : (
              <>
                <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                  {playlist?.name || "Untitled Playlist"}
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  By {owner?.username || "Unknown"} · {playlist?.videos?.length || 0} videos
                </p>
              </>
            )}
          </div>

          {/* Buttons */}
          {editing ? (
            <div className="flex flex-col gap-2 h-20">
              <button
                onClick={handleUpdatePlaylist}
                className="text-gray-900 dark:text-gray-100 p-2 rounded flex items-center justify-center"
              >
                <FaSave className="mr-1" /> Save
              </button>
              <button
                onClick={handleCancel}
                className="text-gray-900 dark:text-gray-100 p-2 rounded flex items-center justify-center"
              >
                <MdOutlineCancel className="mr-1" /> Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="text-gray-900 dark:text-gray-100 p-2 rounded flex items-center justify-center"
            >
              <FaEdit className="mr-1" /> Edit
            </button>
          )}
        </div>

        {/* Description */}
        {!editing && (
          <>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {playlist?.description || "No description provided"}
            </p>

            {/* Delete Button */}
            <div className="mb-6 flex justify-start">
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded flex items-center justify-center"
              >
                <FaTrash className="mr-2" /> Delete Playlist
              </button>
            </div>
          </>
        )}

        {/* Playlist Videos */}
        <h2 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
          Videos in Playlist
        </h2>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 w-full">
          {playlist?.videos && playlist.videos.length > 0 ? (
            playlist.videos.map((video) => (
              <PlayListCard videoId={video} key={video} playlistId={id} />
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              No videos in this playlist
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PlaylistDetailsPage;
