"use client";
import { PostModel } from "@/model/post";
import { getImagePath } from "@/utils";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const getRelatedPostsRequest = (slug: string, limit: number = 4) => {
  return fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/posts/related/${slug}?limit=${limit}`,
  );
};

export const RelatedPostSection = ({ slug }: { slug: string }) => {
  const [relatedPosts, setRelatedPosts] = useState<PostModel[]>([]);

  useEffect(() => {
    const fetchRelatedPosts = async () => {
      try {
        const response = await getRelatedPostsRequest(slug);
        const data = await response.json();
        setRelatedPosts(data.data);
      } catch (error) {
        console.error("Error fetching related posts:", error);
      }
    };

    fetchRelatedPosts();
  }, [slug]);

  return (
    <motion.section
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ delayChildren: 0.2, staggerDirection: 0.1 }}
      className="mb-[100px]"
    >
      <div className="mt-12 px-8 md:px-[64px]">
        <h2 className="text-2xl font-bold mb-6">Bài viết liên quan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {relatedPosts.map((relatedPost) => (
            <Link
              href={`/blog/${relatedPost.slug}`}
              key={relatedPost._id}
              className="card-gradient overflow-hidden hover:text-primary "
            >
              {relatedPost.thumbnail && (
                <Image
                  src={getImagePath(relatedPost.thumbnail)}
                  alt={relatedPost.title}
                  className="w-full h-[300px] object-cover"
                  width={300}
                  height={300}
                />
              )}
              <div className="p-4">
                <h3 className="font-semibold mb-2">{relatedPost.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {relatedPost.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
