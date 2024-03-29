import Link from "next/link";
import getBlogPosts from "./blogPosts";

export default async function Home() {
  const blogPosts = await getBlogPosts();

  return (
    <main className='flex flex-col items-center gap-4'>
      <h1 className=' text-6xl font-bold mt-8 mb-12'>Blog</h1>

      <span className=' mb-12'>{new Date().toUTCString()}</span>

      <Link href='/posts/create'>
        <button className=' bg-slate-200 p-4 border rounded-full'>
          Add New Post
        </button>
      </Link>
      <h2 className='text-4xl font-bold'>Latest Posts</h2>
      <nav className='flex flex-col gap-3'>
        {blogPosts.map((post: any) => (
          <Link
            href={`/posts/${post.slug}`}
            className=' border-4'
            key={post.id}
          >
            <h3 className=' p-4 text-3xl font-thin'>{post.title}</h3>
            <span className='p-4 font-bold'>{post.author}</span>
          </Link>
        ))}
      </nav>
    </main>
  );
}
