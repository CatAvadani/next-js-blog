import fs from "fs/promises";

export default async function Home() {
  const data = await fs.readFile("data/blog-posts.json", {
    encoding: "utf-8",
  });

  const blogPosts = JSON.parse(data);

  console.log(data);

  return (
    <main className='flex flex-col items-center gap-4'>
      <h1 className=' text-6xl font-bold mt-8 mb-12'>Blog</h1>
      <h2 className='text-4xl font-bold'>Latest Posts</h2>
      <ul className='flex flex-col gap-3'>
        {blogPosts.map((post: any) => (
          <li className=' border-4' key={post.id}>
            <h3 className=' p-4 text-3xl font-thin'>{post.title}</h3>
            <span className='p-4 font-bold'>{post.author}</span>
          </li>
        ))}
      </ul>
    </main>
  );
}
