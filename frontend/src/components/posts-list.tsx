import { useState, useEffect } from "react";
import axios from "axios";
import { Post } from "./post";

interface PostData {
  id: number;
  userId: number;
  title: string;
  body: string;
  createdAt: string;
  updatedAt: string;
}

export function PostsList() {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchUser = async (userId: number): Promise<string> => {
    try {
      const res = await axios.get(`/api/users/${userId}`);
      return res.data.displayName || `User ${userId}`;
    } catch (err) {
      console.error(`Error fetching user ${userId}:`, err);
      return `User ${userId}`;
    }
  };

  const fetchPosts = async () => {
    try {
      setLoading(true);
      // fetch all posts
      const response = await axios.get("/api/posts/all");
      const postsData = response.data;
      setPosts(postsData);

      // Fetch user names for all posts
      const userNames: { [key: number]: string } = {};
      for (const post of postsData) {
        if (!userNames[post.userId]) {
          // set the username for the userId if not already fetched
          userNames[post.userId] = await fetchUser(post.userId);
        }
      }
      setUsers(userNames);

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

      <div className="flex flex-col items-center gap-6">
        {posts.map((post) => (
          <Post
            key={post.id}
            userName={users[post.userId] || `User ${post.userId}`}
            title={post.title}
            body={post.body}
            createdAt={post.createdAt}
          />
        ))}
      </div>
    </div>
  );
}
