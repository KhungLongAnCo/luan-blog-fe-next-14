import { Button } from "@/components/ui/button";
import { PostCard } from "@/components/ui/PostCard";
import { PostResponse } from "@/model/post";
import Link from "next/link";

const fetchPosts = async () => {
  try {
    const postJson = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/posts?page=1&limit=6`,
    );

    const posts = (await postJson?.json?.()) as PostResponse;

    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return undefined;
    // throw error;
  }
};

export const BlogsSection = async () => {
  const posts = await fetchPosts();

  return (
    <div
      // whileInView="visible"
      // viewport={{ once: true }}
      // transition={{
      //   delayChildren: 0.2,
      //   staggerDirection: 0.1,
      // }}
      className="py-[64px]"
    >
      <div className="container">
        <h2 className="mb-3 text-center">Blogs</h2>
        <p className="text-center mb-6">
          Tham khảo thêm các bài viết về lĩnh vực website, công nghệ, thủ
          thuật... <br />
          để nâng cao kiến thức cho bạn
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {posts?.data?.map((post, index) => (
            <PostCard post={post} key={`${post?.title}-${index}`} />
          ))}
        </div>
        <div className="flex justify-center mt-6">
          <Link href="/blog">
            <Button variant="default">View More</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
