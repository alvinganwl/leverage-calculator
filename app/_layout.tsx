import React from "react";
import { ReactNode } from "react";
import "./globals.css";  // 如果有样式文件的话，别忘了导入

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>{children}</body>
    </html>
  );
}
