"use client";
import NextTopLoader from "nextjs-toploader";
export default function ProgressBar({ children }) {
  return (
    <div>
      <NextTopLoader color="#DF6148" />
      {children}
    </div>
  );
}
