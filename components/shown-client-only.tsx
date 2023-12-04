"use client";

import { useEffect, useState } from "react";

export const ShownClientOnly = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);
  return <>{isClient && children}</>;
};
