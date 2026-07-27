'use client';

import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"
import { IoMdArrowBack } from "react-icons/io";

const BackButton = () => {
    const router = useRouter();
  return (
    <Button variant="ghost" onClick={() => router.back()} className="mb-4">
      <IoMdArrowBack />
      Back
    </Button>
  );
}
export default BackButton