import { Button } from "@/components/ui/button";
import { ChevronRight, MoveRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h6 className="text-8xl">Hello World</h6>
      <Link href="/user">User</Link>
      <Button className="bg-red-400 text-blue-700 hover:bg-pink-400">
        <MoveRight/>
        <ChevronRight/>
        Click Here</Button>
    </div>
  );
}
