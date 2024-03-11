import fs from "fs/promises";

type PageProps = { params: { slug: string } };

export default async function BlogPostPage({ params }: PageProps) {
  const data = await fs.readFile("data/blog-posts.json", {
    encoding: "utf-8",
  });

  const blogPosts = JSON.parse(data);
  const blogPost = blogPosts.find((post: any) => post.slug === params.slug);

  if (!blogPost) {
    return (
      <main>
        <span>Blog post does not exist -404</span>
      </main>
    );
  }
  return (
    <main>
      <h1 className=' text-3xl'>{params.slug}</h1>
      <div className=' text-gray-600 mt-4'>
        <p className=' text-2xl'>{blogPost.author}</p>
        <p className=' text-gray-600'>{new Date().toUTCString()}</p>
      </div>
      <p className='text-2xl'>{blogPost.content}</p>
    </main>
  );
}
