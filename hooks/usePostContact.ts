import { useState } from "react";
import { useController } from "./useController";
import { ContactBodyDto } from "@/model/contact";
import { ContactApi } from "@/apis/post";

export const usePostContact = () => {
  const [loading, setLoading] = useState(false);
  const { controller } = useController();

  const handlePostContact = async (params: ContactBodyDto) => {
    controller(
      async () => {
        const res = await ContactApi.doPostContactRequest(params);
        console.log("Contact submitted successfully:", res.data);
      },
      { onLoading: setLoading },
    );
  };

  return { handlePostContact, loading };
};
