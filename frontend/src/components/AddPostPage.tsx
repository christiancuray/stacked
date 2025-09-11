import { Button } from "@/components/ui/button";
import { AddPostForm } from "./AddPostForm";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export default function AddPost({ onPostAdded }: { onPostAdded?: () => void }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>Add Post</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <AddPostForm
          closeModal={() => setIsOpen(false)}
          onPostAdded={onPostAdded}
        />
      </DialogContent>
    </Dialog>
  );
}
