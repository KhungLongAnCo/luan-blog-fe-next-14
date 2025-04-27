/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { PostModel } from "@/model/post";
import { getImagePath } from "@/utils";
import { Metadata } from "next";
import { ContentSection, RelatedPostSection } from "./_sections";
import CommentSection from "./_sections/CommentSection";

// type TParams = { slug: string };

async function getPostDetails(slug: string) {
  const postJson = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/posts/${slug}`,
  );

  const post = (await postJson?.json?.()) as PostModel;
  return post;
}

export async function generateMetadata({ params }: any): Promise<Metadata> {
  // read route params

  const postDetail = await getPostDetails(params?.slug);

  return {
    title: postDetail.title,
    openGraph: { images: [getImagePath(postDetail.thumbnail)] },
  };
}

export default async function Page({ params }: { params: any }) {
  const postDetail = await getPostDetails(params.slug);
  return (
    <>
      <ContentSection post={postDetail} />
      <CommentSection postId={postDetail?._id} />
      <RelatedPostSection slug={params.slug} />
    </>
  );
}
