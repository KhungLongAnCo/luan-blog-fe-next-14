"use client";

import { ContactApi } from "@/apis/post";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { toast } from "@/hooks/use-toast";
import { CommentModel } from "@/model/post";
import { formatDate } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import * as z from "zod";

// Define the form schema with Zod
const commentFormSchema = z.object({
  name: z.string().min(2, { message: "Tên phải có ít nhất 2 ký tự" }),
  email: z.string().email({ message: "Email không hợp lệ" }),
  comment: z.string().min(5, { message: "Bình luận phải có ít nhất 5 ký tự" }),
});

type CommentFormValues = z.infer<typeof commentFormSchema>;

export default function CommentSection({ postId }: { postId: string }) {
  const [comments, setComments] = useState<CommentModel[]>([]);
  const [totalComments, setTotal] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentFormValues>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: { name: "", email: "", comment: "" },
  });

  // Fetch comments from the API
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await ContactApi.doGetCommentsRequest(postId, 1, 10);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setTotal((response as any)?.pagination?.total || 0);
        setComments(response?.data || []);
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [postId]);

  const onSubmit: SubmitHandler<CommentFormValues> = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await ContactApi.doCreateCommentRequest({
        ...data,
        postId,
      });

      setComments((prev) => [response?.data, ...prev]);
      setTotal((prev) => prev + 1);
      toast({
        description: "Your message has been sent.",
        color: "success",

        style: { background: "green", color: "white" },
      });
      reset();
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">
        {isLoading ? "Đang tải bình luận..." : `${totalComments} bình luận`}
      </h2>

      {!isLoading && totalComments > 0 && (
        <div className="mb-12 space-y-6">
          {comments.map((comment) => (
            <div
              key={comment?._id}
              className="border-b border-gray300 glass-card"
            >
              <div className="flex items-center mb-2">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                  {comment.name.charAt(0).toUpperCase()}
                </div>
                <div className="ml-3">
                  <h4 className="font-medium text-gray-900">{comment.name}</h4>
                  <p className="text-sm text-gray-500">
                    {formatDate(comment?.createdAt)}
                  </p>
                </div>
              </div>
              <p className="text-gray-700">{comment.comment}</p>
            </div>
          ))}
        </div>
      )}

      <div className="bg-gray-50 glass-card">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          Để lại bình luận
        </h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Họ tên
              </label>
              <input
                id="name"
                type="text"
                maxLength={100}
                placeholder="Họ tên"
                {...register("name")}
                className={`w-full px-4 py-3  ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                maxLength={100}
                placeholder="Email"
                {...register("email")}
                className={`w-full px-4 py-3  ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="comment"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Bình luận
            </label>
            <textarea
              id="comment"
              rows={6}
              maxLength={2000}
              placeholder="Nội dung bình luận..."
              {...register("comment")}
              className={`w-full px-4 py-3  ${
                errors.comment ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
            ></textarea>
            {errors.comment && (
              <p className="mt-1 text-sm text-red-600">
                {errors.comment.message}
              </p>
            )}
          </div>

          <div>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Đã gửi" : "Gửi bình luận"}
            </Button>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  );
}
