import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="text-center rounded-xl p-8 py-10 shadow-2xl hover:translate-x-2 translate-y-2">
      <h2 className="text-4xl font-extrabold mb-4 text-blue-600">Collab Space</h2>
      <Link href='/dashboard'>
      <Button variant="outline" className='text-2xl border-blue-200 text-blue-400 hover:text-blue-800'>Click here</Button>
      </Link>
      </div>

    </div>
  );
}
