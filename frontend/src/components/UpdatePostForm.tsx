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
import type PostData from "../interface/PostData";

const formSchema = z.object({
  title: z.string().min(1, "Title is required").max(50, "Title is too long"),
  body: z.string().min(1, "Body is required").max(256, "Body is too long"),
});

interface UpdatePostFormProps {
  post: PostData;
  closeModal: () => void;
  onPostUpdated: (updatedPost: PostData) => void;
}

export function UpdatePostForm({
  post,
  closeModal,
  onPostUpdated,
}: UpdatePostFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: post.title,
      body: post.body,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("submitting post update", values);

    try {
      // Assuming an endpoint like /api/posts/:id for updates
      const res = await fetch(`/api/posts/${post.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${res.status}`
        );
      }

      const updatedPost = await res.json();
      console.log("Post updated successfully:", updatedPost);

      onPostUpdated(updatedPost);
      closeModal();
    } catch (e: unknown) {
      console.error("Error updating post:", e);
      alert((e as Error).message || "Something went wrong");
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
        <Button type="submit">Update Post</Button>
      </form>
    </Form>
  );
}
