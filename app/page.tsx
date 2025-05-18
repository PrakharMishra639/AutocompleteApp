import Head from "next/head";
import Link from "next/link";
import { MdSearch } from "react-icons/md";

export default function Home() {
  return (
    <>
      <Head>
        <title>Autocomplete App</title>
      </Head>

      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-start justify-center px-4 pt-12 pb-4">
        <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center transition-transform hover:scale-[1.02] duration-300 ease-in-out mt-10">
          <div className="flex items-center justify-center gap-3 mb-4 text-blue-600">
            <MdSearch className="text-4xl" />
            <h1 className="text-3xl font-bold">Autocomplete App</h1>
          </div>

          <p className="text-gray-600 text-base mb-6">
            Instantly find what you need with our smart autocomplete feature.
          </p>

          <Link
            href="/Autocomplete"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-full text-sm font-medium shadow-md hover:bg-blue-700 transition-colors duration-300"
          >
            Go to Autocomplete Form
          </Link>
        </div>
      </main>
    </>
  );
}
