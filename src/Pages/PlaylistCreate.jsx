import React, { useState } from "react";

function CreatePlaylistPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = async () => {
    if (!name.trim()) {
      return alert("Playlist name is required!");
    }

    try {
      const response = await fetch("http://localhost:3000/api/v1/playlists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description }),
      });

      if (!response.ok) throw new Error("Failed to create playlist");

      alert("Playlist created successfully!");
      setName("");
      setDescription("");
    } catch (error) {
      console.error(error);
      alert("Error creating playlist");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Create Playlist
        </h1>

        {/* Playlist Name */}
        <label className="block text-gray-700 dark:text-gray-300 mb-2">
          Playlist Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter playlist name"
          className="w-full px-4 py-2 mb-4 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />

        {/* Playlist Description */}
        <label className="block text-gray-700 dark:text-gray-300 mb-2">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description"
          rows={4}
          className="w-full px-4 py-2 mb-4 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        ></textarea>

        {/* Submit Button */}
        <button
          onClick={handleCreate}
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
        >
          Create Playlist
        </button>
      </div>
    </div>
  );
}

export default CreatePlaylistPage;
