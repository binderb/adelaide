import { db } from "@/db";
import { trackings } from "@/db/schema_trackerModule";
import { desc, eq } from "drizzle-orm";
import Nav from "../(global components)/Nav";
import Link from "next/link";
import MedLog from "./components/MedLog";
import { FaPlus } from "react-icons/fa";
import { MdRefresh } from "react-icons/md";
import { refresh } from "./actions";
import NextMed from "./components/NextMed";

export default async function Meds() {
  const meds = await db.query.trackings.findMany({
    where: eq(trackings.type, 'Med'),
    orderBy: [desc(trackings.timestamp)]
  });

  return (
    <>
      <Nav />
      <section className="w-full flex pt-4 px-4 items-center justify-between gap-6">
        <div className='flex gap-6 items-center'>
          <Link href="/" className='std-link'>&larr; Back</Link>
          <h1 className='text-[18px] font-bold'>Med Log</h1>
        </div>
        <div className='flex gap-2 items-center'>
          <form action={refresh}>
            <button className='bg-secondary rounded-full px-3 py-2 text-white flex items-center gap-2 text-[22px]'>
              <MdRefresh />
            </button>
          </form>

          <Link href='/meds/new' className='bg-[#18b03b] rounded-full px-3 py-2 text-white flex items-center gap-2'>
            <FaPlus />
            New
          </Link>
        </div>
      </section>
      <section className='px-6 py-6'>
        <NextMed meds={meds} />
      </section>
      <MedLog meds={meds} />
    </>
  );
}