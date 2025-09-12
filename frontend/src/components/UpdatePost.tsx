import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { UpdatePostForm } from "./UpdatePostForm";
import type PostData from "../interface/PostData";

interface UpdatePostProps {
  post: PostData;
  onPostUpdated: (updatedPost: PostData) => void;
  children: React.ReactNode;
}

export default function UpdatePost({
  post,
  onPostUpdated,
  children,
}: UpdatePostProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <UpdatePostForm
          post={post}
          onPostUpdated={onPostUpdated}
          closeModal={() => setIsOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
