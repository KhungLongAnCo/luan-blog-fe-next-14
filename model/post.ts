import { Pagination } from "./common";
import { TagModel } from "./tags";

export type PostModel = {
  content: string;
  description: string;
  createdAt: string;
  slug: string;
  tags: TagModel[];
  thumbnail: string;
  title: string;
  _id: string;
};

export type CreatePostModel = {
  content: string;
  description: string;
  tags?: string[];
  thumbnail: string;
  title: string;
};

export type PostResponse = Pagination<PostModel>;

export type CommentModel = {
  _id: string;
  name: string;
  email: string;
  comment: string;
  postId: string;
  createdAt: string;
};

export type CreateCommentModel = {
  name: string;
  email: string;
  comment: string;
  postId: string;
};

export type CommentResponse = Pagination<CommentModel>;
