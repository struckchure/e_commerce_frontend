import React from "react";

export default function Loader() {
  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-gray-900 grid place-items-center overflow-hidden">
      <p className="text-white text-3xl font-mono">Loading ...</p>
    </div>
  );
}
