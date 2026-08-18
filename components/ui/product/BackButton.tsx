"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { IoMdArrowBack } from "react-icons/io";

interface BackButtonProps {
  text?: string;
}

const BackButton = ({ text = "Go Back" }: BackButtonProps) => {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      onClick={() => router.back()}
      className="mb-4 text-base italic cursor-pointer text-[#111827] hover:bg-transparent"
    >
      <IoMdArrowBack />
      {text}
    </Button>
  );
};

export default BackButton;