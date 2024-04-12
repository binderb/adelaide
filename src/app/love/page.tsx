import Link from "next/link";
import Nav from "../(global components)/Nav";

export default async function Love() {

  return (
    <>
      <Nav />
      <section className="w-full flex pt-4 px-4 items-center justify-between gap-6">
        <div className='flex gap-6 items-center'>
          <Link href="/" className='std-link'>&larr; Back</Link>
          <h1 className='text-[18px] font-bold'>Love</h1>
        </div>
      </section>
    </>
  );
}