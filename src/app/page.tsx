import Nav from "@/app/(global components)/Nav";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start">
      <Nav />
      <section className='grid grid-cols-2 gap-8 px-[10%] py-8 w-full'>
        <Link href='/feed' className='bg-[#F20] rounded-md p-4 text-white w-full h-[150px] flex justify-center items-center'>Feed</Link>
        <Link href='/diapers' className='bg-[#ff9239] rounded-md p-4 text-white w-full h-[150px] flex justify-center items-center'>Diapers</Link>
        <Link href='/meds' className='bg-[#18b03b] rounded-md p-4 text-white w-full h-[150px] flex justify-center items-center'>Meds</Link>
        <button className='bg-[#208fe3] rounded-md p-4 text-white w-full h-[150px]'>Love</button>
      </section>
    </main>
  );
}
