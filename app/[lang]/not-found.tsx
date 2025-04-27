import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-purple-400 to-blue-500 p-4">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-xl p-8 md:p-12">
        <div className="text-center">
          <h1 className="text-[10rem] md:text-[12rem] font-bold leading-none bg-gradient-to-r from-purple-400 via-purple-300 to-blue-400 text-transparent bg-clip-text">
            404
          </h1>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-700 mb-8">
            OPPS! PAGE NOT FOUND
          </h2>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
            Sorry, the page you&apos;re looking for doesn&apos;t exist. If you
            think something is broken, report a problem.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 text-lg rounded-full w-full sm:w-auto">
                RETURN HOME
              </Button>
            </Link>

            <Link href="/report">
              <Button
                variant="outline"
                className="border-blue-400 text-blue-500 hover:bg-blue-50 px-8 py-6 text-lg rounded-full w-full sm:w-auto"
              >
                REPORT PROBLEM
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
