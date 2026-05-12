import React from "react";
import { useSelector } from "react-redux";

const Loader = () => {
  const { isLoading } = useSelector((store) => store.loading);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-2">
        <span className="loading loading-spinner loading-lg text-accent"></span>
        <p className="text-white font-medium animate-pulse">Please wait...</p>
      </div>
    </div>
  );
};

export default Loader;
