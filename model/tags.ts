import { Pagination } from "./common";

export type TagModel = {
  createdAt: string;
  name: string;
  _id: string;
};

export type CreateTagModel = {
  name: string;
};

export type TagResponse = Pagination<TagModel>;
