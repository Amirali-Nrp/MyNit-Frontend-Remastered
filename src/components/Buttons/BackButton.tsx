// components/BackButton.tsx
import React from "react";
import { useRouter } from "next/navigation"; // for Pages Router

// import { useRouter } from 'next/navigation' // for App Router

type BackButtonProps = {
  fallback?: string; // where to go if there's no history
};

const BackButton: React.FC<BackButtonProps> = ({ fallback = "/" }) => {
  const router = useRouter();

  const handleClick = () => {
    // if there’s history, go back; otherwise send them to fallback
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(fallback);
    }
  };

  return (
    <button type="button" onClick={handleClick} className="button-48">
      <span>بازگشت</span>
    </button>
  );
};

export default BackButton;
