"use client";

import { PostResponse } from "@/model/post";
import { TagResponse } from "@/model/tags";
import { useEffect } from "react";

const fetchData = async () => {
  try {
    const postJson = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/posts?page=1&limit=6`,
    );
    const tagsJson = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/tags?page=1&limit=100`,
    );

    const posts = (await postJson?.json?.()) as PostResponse;
    const tags = (await tagsJson?.json?.()) as TagResponse;
    return { posts, tags };
  } catch (error) {
    console.log("error", error);
    return {};
  }
};

export const ChatBoxSection = () => {
  const getPost = async () => {
    const post = await fetchData();
    console.log("post", post);
  };

  useEffect(() => {
    getPost();
  }, []);

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
      <div className="container">testset</div>
    </div>
  );
};
