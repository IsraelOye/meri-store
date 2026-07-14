'use client';

import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"

const BackButton = () => {
    const router = useRouter();
  return (
    <Button
        variant="ghost"
        onClick={() => router.back()}
        className='mb-4'
    >

    </Button>
  )
}

export default BackButton