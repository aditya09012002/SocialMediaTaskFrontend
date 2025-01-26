import React from "react";

interface FullscreenLoaderProps {
  text?: string;
}

const FullscreenLoader: React.FC<FullscreenLoaderProps> = ({
  text = "Wait Daemon is sleeping as on free server.",
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
        <p className="mt-4 text-xl text-white">{text}</p>
      </div>
    </div>
  );
};

export default FullscreenLoader;
