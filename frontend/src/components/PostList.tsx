import { useState, useEffect } from "react";
import axios from "axios";
import { Post } from "./Post";
import AddPost from "./AddPostPage";

import type PostData from "../interface/PostData";
import type UserData from "../interface/UserData";

export function PostList() {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUsers] = useState<UserData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    console.log("PostsList useEffect triggered - fetching posts");
    fetchPosts();
  }, []);

  // function to filter posts based on search query
  const filteredPosts = (query: String) => {
    return posts.filter(
      (p) =>
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.body.toLowerCase().includes(query.toLowerCase())
    );
  };

  const fPost = filteredPosts(query);

  const fetchUser = async (userId: number): Promise<string> => {
    try {
      const res = await axios.get(`/api/users/${userId}`);
      return res.data ? res.data : `User ${userId} information not found`;
    } catch (err) {
      console.error(`Error fetching user ${userId}:`, err);
      return `User ${userId}`;
    }
  };

  const fetchPosts = async () => {
    try {
      setLoading(true);
      // fetch all posts
      const respost = await axios.get("/api/posts/all");
      const postsData = respost.data;
      setPosts(postsData);

      const resUser = await axios.get("/api/users/all");
      const userData = resUser.data;
      setUsers(userData);

      setError(null);
    } catch (err) {
      setError("Failed to fetch posts. Make sure your backend is running.");
      console.error("Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        <span className="ml-2 text-gray-600">Loading posts...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={fetchPosts}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No posts found. Create your first post!</p>
        <div className="mt-4">
          <AddPost onPostAdded={fetchPosts} />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center">
        <button
          onClick={fetchPosts}
          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
        >
          Refresh
        </button>
      </div>
      <AddPost onPostAdded={fetchPosts} />
      {/* Search bar query */}
      <div className="flex item-center justify-center ">
        <input
          type="search"
          placeholder="Search posts..."
          onChange={(e) => setQuery(e.target.value)}
          className="p-4 border border-gray-300 rounded-md w-full max-w-md"
        />
      </div>

      <div className="flex flex-col items-center gap-6">
        {fPost.map((post) => (
          <Post key={post.id} post={post} userName={"Mike"} />
        ))}
      </div>
    </div>
  );
}
