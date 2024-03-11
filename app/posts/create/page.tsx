import { createBlogPost } from "@/app/blogPosts";

export default async function CreateBlogPost() {
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

        <label htmlFor='content'>Content</label>
        <textarea id='content' rows={6} name='content' className=' p-2' />
        <button className='mt-4'>Create Post</button>
      </form>
    </main>
  );
}
