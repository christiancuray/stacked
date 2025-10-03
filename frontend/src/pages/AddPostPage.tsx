import { Button } from "@/components/ui/button";
import { AddPostForm } from "../components/AddPostForm";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "../components/ui/dialog";

export default function AddPost({ onPostAdded }: { onPostAdded?: () => void }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>Add Post</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogTitle className="text-lg font-medium" />

        <AddPostForm
          closeModal={() => setIsOpen(false)}
          onPostAdded={onPostAdded}
        />
      </DialogContent>
    </Dialog>
  );
}
