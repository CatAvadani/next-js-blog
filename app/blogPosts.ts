"use server";
// marking this for  Next.js so it knows is server file

import fs from "fs/promises";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  author: string;
  content: string;
}

export default async function getBlogPosts() {
  const data = await fs.readFile("data/blog-posts.json", {
    encoding: "utf-8",
  });

  return JSON.parse(data) as BlogPost[];
}

export const createBlogPost = async (formData: FormData) => {
  const rawData = Object.fromEntries(formData.entries()) as any;

  const newPost = {
    id: Date.now().toString(),
    slug: rawData.title.toLowerCase().split("").join("-"),
    ...rawData,
  };

  const blogPosts = await getBlogPosts();
  blogPosts.push(newPost);
  await fs.writeFile(
    "data/blog-posts.json",
    JSON.stringify(blogPosts, null, 2)
  );
  // Revalidate and redirect
  revalidatePath("/");
  revalidatePath(`/posts/${newPost.slug}`);
  redirect("/");
};
