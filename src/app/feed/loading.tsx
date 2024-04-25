import Nav from "@/app/(global components)/Nav";
import FeedPicker from "./breast/components/FeedPicker";
import Link from "next/link";
import { FaSpinner } from "react-icons/fa";

export default async function FeedLoading() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-start">
      <Nav />
      <section className="w-full flex pt-4 px-4 items-center justify-start gap-6">
        <Link href="/" className='std-link'>&larr; Back</Link>
        <h1 className='text-[18px] font-bold'>Feed</h1>
      </section>
      <section className='py-4 flex w-full justify-center items-center gap-2'>
        <FaSpinner className='animate-spin text-[32px]' />
      </section>
    </main>
  );
}
