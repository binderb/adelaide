import { db } from "@/db";
import { trackings } from "@/db/schema_trackerModule";
import { desc, eq, or } from "drizzle-orm";
import Link from "next/link";
import FeedLogList from "./components/FeedLogList";
import Nav from "@/app/(global components)/Nav";
import { MdRefresh } from "react-icons/md";
import { refresh } from "./actions";

export default async function FeedLog() {
  const feeds = await db.query.trackings.findMany({
    where: or(eq(trackings.type, 'Left Breast'), eq(trackings.type, 'Right Breast')),
    orderBy: [desc(trackings.timestamp)],
  });

  return (
    <>
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
      <FeedLogList feeds={feeds} />
    </>
  );
}