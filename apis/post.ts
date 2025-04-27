import { ContactBodyDto } from "@/model";
import { CommentModel } from "@/model/post";
import { Api, api } from "./config";

class Contact {
  instance: Api;

  constructor(params: Api) {
    this.instance = params;
  }

  public doPostContactRequest = (payload: ContactBodyDto) => {
    return this.instance.post("/posts/contact", payload);
  };

  // Create a comment
  public doCreateCommentRequest = (payload: {
    name: string;
    email: string;
    comment: string;
    postId: string;
  }) => {
    return this.instance.post<CommentModel>(
      `/posts/${payload?.postId}/comments/create`,
      payload,
    );
  };

  // Get a list of comments
  public doGetCommentsRequest = (
    postId: string,
    page: number,
    limit: number,
  ) => {
    return this.instance.get<CommentModel[]>(`/posts/${postId}/comments`, {
      params: { page, limit },
    });
  };
}

export const ContactApi = new Contact(api);
