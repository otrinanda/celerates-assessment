import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <h1 className="text-4xl font-bold text-blue-500">
      Shadcn UI is Working! 🎉
    </h1>
    <Button className="mt-6">Coba Klik Saya!</Button>
  </div>
  );
}
