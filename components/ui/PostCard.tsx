import { blurImgBase64, CommentSvg, EyeSvg } from "@/assets";
import { PostModel } from "@/model/post";
import { getImagePath } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./button";

interface PostCardProps {
  post: PostModel;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <Link href={`/blog/${post?.slug}`} className="card">
      <Image
        src={getImagePath(post?.thumbnail)}
        alt="card image"
        className="card-img"
        width={300}
        placeholder="blur"
        blurDataURL={blurImgBase64}
        height={250}
      />
      <div className="card-content">
        <div className="flex items-end gap-2 mb-3">
          {post?.tags?.slice(0, 3)?.map((tag) => (
            <span
              key={tag?._id}
              className="line-clamp-1 border-none bg-gray100 text-sx rounded-[4px] px-1"
            >
              {tag?.name}
            </span>
          ))}
        </div>
        <h4 className="mb-3 flex-gro line-clamp-2">{post?.title}</h4>
        <div className="flex-grow">
          <p className="line-clamp-4">{post?.description}</p>
        </div>
        <div className="card-comments flex items-center justify-between w-full">
          <div className="flex items-center mr-3">
            <span className="mr-1">0</span> <EyeSvg className="w-[20px]" />
          </div>
          <div className="flex items-center">
            <span className="mr-1">0</span> <CommentSvg className="w-[20px]" />
          </div>
        </div>
      </div>
    </Link>
  );
};
