import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] bg-gradient-to-b from-background to-muted">
        <div className="container px-4 md:px-6 flex flex-col items-center space-y-8 text-center">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Welcome to Modern Store
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Discover our curated collection of premium products.
            </p>
          </div>
          <div className="space-x-4">
            <Link href="/admin">
              <button className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg">
                Admin
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
