import { db } from "@/db";
import { trackings } from "@/db/schema_trackerModule";
import { desc, eq, or } from "drizzle-orm";
import Link from "next/link";

export default async function FeedLog() {
  const feeds = await db.query.trackings.findMany({
    where: or(eq(trackings.type, 'Left Breast'), eq(trackings.type, 'Right Breast')),
    orderBy: [desc(trackings.timestamp)],
  });

  return (
    <>
      <section className="w-full flex pt-4 px-4 items-center justify-start gap-6">
        <Link href="/feed" className='std-link'>&larr; Back</Link>
        <h1 className='text-[18px] font-bold'>Feed Log</h1>
      </section>
      <section className="w-full flex flex-col items-center justify-start gap-4">
        <h2 className='text-[18px] font-bold'>Feeding Log</h2>
        <ul className='w-full flex flex-col items-center justify-start gap-2 px-6'>
          {feeds.map((feed) => (
            <li key={feed.id} className='w-full flex items-center justify-between gap-1 bg-primary/50 px-2 py-1 rounded-md'>
              <p>{feed.timestamp.toLocaleString()}</p>
              <p>{feed.type}</p>
              <p>{Math.floor(feed.length!/60)} minutes, {feed.length!%60} seconds</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}