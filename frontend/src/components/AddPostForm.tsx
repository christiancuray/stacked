"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";

const formSchema = z.object({
  title: z.string().min(1, "Title is required").max(50, "Title is too long"),
  body: z.string().min(1, "Body is required").max(256, "Body is too long"),
});

export function AddPostForm({
  closeModal,
  onPostAdded,
}: {
  closeModal: () => void;
  onPostAdded?: () => void;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      body: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("submitting post", values);

    try {
      // Check if user is authenticated before making request
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        alert("You must be logged in to create a post");
        return;
      }

      console.log("Making API request to /api/posts/addPost");
      const res = await axios.post("/api/posts/addPost", {
        title: values.title,
        body: values.body,
      });

      const newPost = await res.data;
      console.log("Post created successfully:", newPost);

      form.reset();
      closeModal();

      // Notify parent component that a post was added
      if (onPostAdded) {
        onPostAdded();
      }
    } catch (error: unknown) {
      console.error("Error creating post:", error);
      alert((error as Error).message || "Something went wrong");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Title" {...field} />
              </FormControl>
              <FormDescription>This is the title of your post.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Body</FormLabel>
              <FormControl>
                <Input placeholder="Body" {...field} />
              </FormControl>
              <FormDescription>This is the body of your post.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
