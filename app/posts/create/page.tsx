import getBlogPosts from "@/app/blogPosts";
import fs from "fs/promises";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function CreatePostPage() {
  const createBlogPost = async (formData: FormData) => {
    "use server";
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

  return (
    <main className=' p-4 flex flex-col gap-4  items-center'>
      <h1 className=' text-4xl my-8'>Create New Post</h1>
      <span className=' mb-12'>{new Date().toUTCString()}</span>

      <form
        action={createBlogPost}
        className='border p-4 flex flex-col gap-2  min-w-96'
      >
        <label htmlFor='title'>Title</label>
        <input id='title' type='text' className='p-2 text-black' name='title' />

        <label htmlFor='author'>Author</label>
        <input id='author' type='text' name='author' className=' p-2' />

        <label htmlFor='contnet'>Content</label>
        <textarea id='content' rows={6} name='content' className=' p-2' />
        <button className='mt-4'>Create Post</button>
      </form>
    </main>
  );
}
