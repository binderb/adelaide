import { db } from "@/db";
import { trackings } from "@/db/schema_trackerModule";
import { desc, eq, or } from "drizzle-orm";
import Link from "next/link";
import FeedLogList from "./components/FeedLogList";

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
      <FeedLogList feeds={feeds} />
    </>
  );
}