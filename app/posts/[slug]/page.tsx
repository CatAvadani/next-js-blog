import fs from "fs/promises";

type PageProps = { params: { slug: string } };

export async function generateStaticParams() {
  const data = await fs.readFile("data/blog-posts.json", {
    encoding: "utf-8",
  });
  const blogPosts = JSON.parse(data);

  return blogPosts.map((post: any) => ({ slug: post.slug }));
}

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
    <main className='flex flex-col gap-2 p-8'>
      <h1 className=' text-3xl mb-2'>{params.slug}</h1>
      <div className=' flex flex-col text-gray-600 gap-2'>
        <p className=' text-2xl mb-4'>{blogPost.author}</p>
        <p className=' text-gray-600'>{new Date().toUTCString()}</p>
      </div>
      <p className='text-2xl'>{blogPost.content}</p>
    </main>
  );
}
