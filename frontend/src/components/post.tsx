import React from "react";
import { Button } from "./ui/button";

import type { PostComponentProps } from "../types/PostComponentProps";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UpdatePost from "./UpdatePost";
import type PostData from "../types/PostData";

export function Post({ post, userName }: PostComponentProps) {
  const [isLiked, setIsLikes] = React.useState(false);
  // const [isEditing, setIsEditing] = React.useState(false);
  const [title, setTitle] = React.useState(post.title);
  const [body, setBody] = React.useState(post.body);

  // Format the timestamp for display
  const formatTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60)
      return `${diffInMinutes} min${diffInMinutes > 1 ? "s" : ""} ago`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24)
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
  };

  function handleLike() {
    setIsLikes(!isLiked);
  }

  function handPostUpdate(updatedPost: PostData) {
    setTitle(updatedPost.title);
    setBody(updatedPost.body);
  }

  return (
    <Card className="w-full max-w-md shadow-md hover:shadow-xl transition-shadow duration-200">
      <CardHeader className="pb-3">
        <CardTitle className=" flex justify-between text-lg font-semibold text-gray-900">
          {userName}
          <UpdatePost post={post} onPostUpdated={handPostUpdate}>
            <Button className="py-2 px-4 m">Edit</Button>
          </UpdatePost>
        </CardTitle>
        <CardDescription className="text-sm text-gray-500">
          {formatTimeAgo(post.createdAt)}
        </CardDescription>
      </CardHeader>

      <CardContent className="pb-4">
        <h3 className="font-medium text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-700 leading-relaxed">{body}</p>
      </CardContent>

      <CardFooter className="pt-0 flex gap-4 w-full">
        <Button
          className={
            isLiked
              ? "flex-1 text-center py-2 px-3 rounded-md bg-blue-500"
              : "flex-1 text-center py-2 px-3 rounded-md bg-white text-black"
          }
          onClick={handleLike}
        >
          {isLiked ? "Unlike" : "Like"}
        </Button>
        <CardAction className="flex-1 text-center py-2 px-3 rounded-md hover:bg-gray-100 transition-colors duration-150">
          Comment
        </CardAction>
        <CardAction className="flex-1 text-center py-2 px-3 rounded-md hover:bg-gray-100 transition-colors duration-150">
          Share
        </CardAction>
      </CardFooter>
    </Card>
  );
}
