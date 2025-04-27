import { blurImgBase64 } from "@/assets";
import { Button } from "@/components/ui/button";
import { PostResponse } from "@/model/post";
import { getImagePath } from "@/utils";
import Image from "next/image";
import Link from "next/link";

const fetchPosts = async () => {
  try {
    const postJson = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/posts?page=1&limit=6`,
    );

    const posts = (await postJson?.json?.()) as PostResponse;

    return posts;
  } catch (error) {
    throw error;
  }
};

export const BlogsSection = async () => {
  const posts = await fetchPosts();

  return (
    <div className="mt-[100px] mb-[100px]">
      <div className="container">
        <h2 className="mb-3 text-center">Blogs</h2>
        <p className="text-center mb-6">
          Tham khảo thêm các bài viết về lĩnh vực website, công nghệ, thủ
          thuật... <br />
          để nâng cao kiến thức cho bạn
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts?.data?.map((post, index) => (
            <Link
              href={`/blog/${post?.slug}`}
              className="card"
              key={`${post?.title}-${index}`}
            >
              <Image
                src={getImagePath(post?.thumbnail)}
                alt="card image"
                className="mb-3 w-full h-[250px] object-cover card-img"
                width={300}
                placeholder="blur"
                blurDataURL={blurImgBase64}
                height={250}
              />
              <div className="card-content">
                <div className="flex items-end gap-2 mb-3">
                  {post?.tags?.slice(0, 3)?.map((tag) => (
                    <Button
                      variant="outline"
                      key={tag?._id}
                      className="line-clamp-1"
                    >
                      {tag?.name}
                    </Button>
                  ))}
                </div>
                <h4 className="mb-3 flex-gro line-clamp-2">{post?.title}</h4>
                <p className="line-clamp-4">{post?.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
