"use client";
import { PostCard } from "@/components/ui/PostCard";
import { PostModel } from "@/model/post";
import { motion } from "framer-motion";
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
          {relatedPosts.map((relatedPost, index) => (
            <PostCard
              post={relatedPost}
              key={`${relatedPost?.title}-${index}`}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
};
