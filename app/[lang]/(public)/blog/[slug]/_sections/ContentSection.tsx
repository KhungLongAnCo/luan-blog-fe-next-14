"use client";
import { CustomBreadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { ROUTERS } from "@/defines";
import { PostModel } from "@/model/post";
import { fade, moveLeft, moveUp } from "@/styles";
import { formatDate } from "@/utils";
import DOMPurify from "dompurify";
import { motion } from "framer-motion";
import { useMemo } from "react";

export const ContentSection = ({ post }: { post: PostModel }) => {
  const sanitizedContent = useMemo(
    () => (post.content ? DOMPurify?.sanitize(post.content) : ""),
    [post.content],
  );

  return (
    <motion.section
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ delayChildren: 0.2, staggerDirection: 0.1 }}
      className="pt-[100px] mb-8 md:mb-[100px]"
    >
      <div className="container">
        <CustomBreadcrumb
          items={[
            { label: "Home", href: ROUTERS.HOME },
            { label: "Blogs", href: ROUTERS.BLOG },
            { label: post.title },
          ]}
        />
        <div className="text-center my-12">
          <motion.h1 {...moveUp} className="mb-3">
            {post.title}
          </motion.h1>
          <motion.div
            transition={{ delayChildren: 0.2, staggerDirection: 0.1 }}
            className="flex items-center justify-center gap-4 flex-wrap mb-6"
          >
            {post?.tags?.map((tag) => (
              <motion.span key={tag?._id} {...moveLeft}>
                <Button variant="secondary" className="bg-green-300">
                  {tag?.name}
                </Button>
              </motion.span>
            ))}

            <Button variant="secondary">{formatDate(post?.createdAt)}</Button>
          </motion.div>
        </div>
        <div className="blog-content">
          <motion.div
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            {...fade}
          />
        </div>
      </div>
    </motion.section>
  );
};
