import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosPublic from "./useAxiosPublic";

const useBlog = () => {
  const axiosPublic = useAxiosPublic();

  const {
    refetch,
    data: blog = [],
    isPending,
  } = useQuery({
    queryKey: ["blog"],
    queryFn: async () => {
      const res = await axiosPublic.get("/blog");
      return res.data;
    },
  });

  return [refetch, blog, isPending];
};

export default useBlog;
