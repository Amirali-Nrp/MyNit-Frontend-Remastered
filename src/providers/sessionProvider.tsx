"use client";

import React, { useEffect } from "react";

import { useStudentStorage } from "@/storage/storage";

export default function SessionProvider({
  children,
  userId,
}: {
  children: React.ReactNode;
  userId: string | undefined;
}) {
  const { setStudentId } = useStudentStorage();
  // console.log("here", userId);
  useEffect(() => {
    userId && setStudentId(userId);
    // console.log("in effect", userId);
  }, [userId]);

  return <div>{children}</div>;
}
