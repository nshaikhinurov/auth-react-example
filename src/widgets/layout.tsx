import React from "react";
import { ThemeToggle } from "~/features/switch-theme";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-muted p-6 md:p-10">
      <ThemeToggle />
      {children}
    </div>
  );
};
