import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <h1 className="text-4xl font-bold">
    Celerates - Frontend Engineer Technical Assessment by Otrinanda Gandhi
    </h1>
    <Link href="/users">
      <Button className="mt-6" size="lg">
        <Eye/>
        Open To View</Button>
    </Link>
  </div>
  );
}
