
import Nav from "@/app/(global components)/Nav";
import Link from "next/link";
import Breast from "./breast/components/Breast";
import { GiBabyBottle } from "react-icons/gi";

export default async function Feed() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-start">
      <Nav />
      <section className="w-full flex pt-4 px-4 items-center justify-start gap-6">
        <Link href="/" className='std-link'>&larr; Back</Link>
        <h1 className='text-[18px] font-bold'>Feed</h1>
      </section>
      <section className='font-bold text-[18px] py-4 px-4'>
        What kind of feed are we logging?
      </section>
      <section className='grid grid-cols-2 gap-4 py-2 px-6 w-full'>
        <Link href='/feed/breast' className={`rounded-md p-4 text-white w-full font-bold h-[150px] bg-appRed flex flex-col items-center justify-center gap-2`}>
          <Breast side={'right'} width={'15cqw'} />
          Breast Feed
        </Link>
        <Link href='/feed/bottle' className={`rounded-md p-4 text-white w-full font-bold h-[150px] bg-appRed flex flex-col items-center justify-center gap-2`}>
          <GiBabyBottle className='text-[15cqw]' />
          Bottle Feed
        </Link>
      </section>
    </main>
  );
}
