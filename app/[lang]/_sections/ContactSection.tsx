"use client";

import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";
import { CONTACT } from "@/defines";
import { toast } from "@/hooks/use-toast";
import { usePostContact } from "@/hooks/usePostContact";
import { ContactBodyDto } from "@/model";
import { zodResolver } from "@hookform/resolvers/zod";
import { Facebook, Mail, MapPin, Phone, Send, Youtube } from "lucide-react";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import * as z from "zod";

// Define the form schema with Zod
const formSchema = z.object({
  name: z.string().min(2, { message: "Tên phải có ít nhất 2 ký tự" }),
  email: z.string().email({ message: "Email không hợp lệ" }),
  phone: z.string().min(10, { message: "Số điện thoại không hợp lệ" }),
  budget: z.string().min(1, { message: "Vui lòng chọn ngân sách" }),
  description: z
    .string()
    .min(10, { message: "Mô tả phải có ít nhất 10 ký tự" }),
});

type FormValues = ContactBodyDto;

export default function ContactSection() {
  const [isSuccess, setIsSuccess] = useState(false);
  const { handlePostContact, loading } = usePostContact();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      budget: "",
      description: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await handlePostContact(data);
    toast({
      description: "Your requirement has been sent.",
      color: "success",

      style: { background: "green", color: "white" },
    });
    setIsSuccess(true);
    reset();
    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <div className="container mb-12 mt-4" id="contact-section">
      <div className="px-4 sm:px-6 lg:px-8 contact-form">
        <div className="max-w-7xl mx-auto rounded-lg shadow-sm overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left side - Information */}
            <div className="p-8 md:p-12 ">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Yêu cầu Báo giá
              </h1>
              <p className="text-gray-600 mb-12">
                Liên hệ ngay với mình để nhận được tư vấn miễn phí,
                <br />
                tư vấn giải pháp công nghệ cho bạn.
              </p>

              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Thông tin
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-indigo-500 mr-3" />
                    <span className="text-gray-700">{CONTACT.PHONE}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-indigo-500 mr-3" />
                    <span className="text-gray-700">{CONTACT.EMAIL}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-indigo-500 mr-3" />
                    <span className="text-gray-700">{CONTACT.ADDRESS}</span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <a
                  href={CONTACT.FACEBOOK}
                  className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <Facebook className="h-5 w-5 text-gray-700" />
                </a>
                <a
                  href={`mailto:${CONTACT.EMAIL}`}
                  className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <Send className="h-5 w-5 text-gray-700" />
                </a>
                <a
                  href={CONTACT.YOUTUBE}
                  className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <Youtube className="h-5 w-5 text-gray-700" />
                </a>
              </div>
            </div>

            {/* Right side - Form */}
            <div className="p-8 md:p-12  md:border-l border-gray2">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Tên
                  </label>
                  <input
                    id="name"
                    type="text"
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Số điện thoại
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="Số điện thoại"
                      {...register("phone")}
                      className={`w-full px-4 py-3  ${
                        errors.phone ? "border-red-500" : "border-gray-300"
                      } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="budget"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Ngân sách
                  </label>
                  <select
                    id="budget"
                    {...register("budget")}
                    className={`w-full px-4 py-3  ${
                      errors.budget ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none bg-white`}
                  >
                    <option value="">Chí phí bạn dự định dành cho dự án</option>
                    <option value="under-5m">Dưới 5 triệu</option>
                    <option value="5m-10m">5 - 10 triệu</option>
                    <option value="10m-20m">10 - 20 triệu</option>
                    <option value="over-20m">Trên 20 triệu</option>
                  </select>
                  {errors.budget && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.budget.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Mô tả
                  </label>
                  <textarea
                    id="description"
                    rows={4}
                    placeholder="Mô tả một chút về dự án của bạn"
                    {...register("description")}
                    className={`w-full px-4 py-3  ${
                      errors.description ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                  ></textarea>
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.description.message}
                    </p>
                  )}
                </div>

                <div>
                  <Button type="submit" variant={"default"} disabled={loading}>
                    {loading ? "Đang gửi..." : "Gửi yêu cầu"}
                  </Button>
                  {isSuccess && (
                    <p className="mt-2 text-sm text-green-600">
                      Yêu cầu đã được gửi thành công!
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
