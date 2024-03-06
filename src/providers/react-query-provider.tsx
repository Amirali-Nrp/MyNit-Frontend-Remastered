"use client";

import React, { useState } from "react";

import { QueryClientProvider } from "react-query";

import getQueryClient from "@/lib/react-query/get-query-client";

const QueryClient = getQueryClient();

export default function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [client] = useState(QueryClient);

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
