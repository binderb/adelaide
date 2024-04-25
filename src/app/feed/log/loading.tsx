import Nav from "@/app/(global components)/Nav";
import Link from "next/link";
import { FaSpinner } from "react-icons/fa";
import { MdRefresh } from "react-icons/md";
import { refresh } from "./actions";

export default async function FeedLogLoading() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-start">
      <Nav />
      <section className="w-full flex pt-4 px-4 items-center justify-between gap-6">
        <div className='flex gap-6 items-center'>
          <Link href="/feed" className='std-link'>&larr; Back</Link>
        <h1 className='text-[18px] font-bold'>Feed Log</h1>
        </div>
        <form action={refresh}>
            <button className='bg-secondary rounded-full px-3 py-2 text-white flex items-center gap-2 text-[22px]'>
              <MdRefresh />
            </button>
          </form>
      </section>
      <section className='py-4 flex w-full justify-center items-center gap-2'>
        <FaSpinner className='animate-spin text-[32px]' />
      </section>
    </main>
  );
}
