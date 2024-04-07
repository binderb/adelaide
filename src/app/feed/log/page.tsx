import { db } from "@/db";
import { trackings } from "@/db/schema_trackerModule";
import { desc, eq, or } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { FaTrash, FaTrashAlt } from "react-icons/fa";

export default async function FeedLog() {
  const feeds = await db.query.trackings.findMany({
    where: or(eq(trackings.type, 'Left Breast'), eq(trackings.type, 'Right Breast')),
    orderBy: [desc(trackings.timestamp)],
  });

  async function deleteFeed(formData: FormData) {
    'use server';
    const id = parseInt(formData.get('id') as string);
    await db.delete(trackings).where(eq(trackings.id, id)).execute();
    revalidatePath('/feed/log');
  }

  return (
    <>
      <section className="w-full flex pt-4 px-4 items-center justify-start gap-6">
        <Link href="/feed" className='std-link'>&larr; Back</Link>
        <h1 className='text-[18px] font-bold'>Feed Log</h1>
      </section>
      <section className="w-full flex flex-col items-center justify-start gap-4 pt-4">
        <h2 className='text-[18px] font-bold'>Feeding Log</h2>
        <ul className='w-full flex flex-col items-center justify-start gap-2 px-6 text-sm'>
          {feeds.map((feed) => (
            <li key={feed.id} className='w-full flex items-center justify-between gap-1 bg-primary/50 px-2 py-1 rounded-md'>
              <p>{feed.timestamp.toLocaleString()}</p>
              <p>{feed.type}</p>
              <p>{Math.floor(feed.length! / 60)} minutes, {feed.length! % 60} seconds</p>
              <form action={deleteFeed}>
                <input type='hidden' name='id' value={feed.id} />
                <button className='rounded-md bg-[#F20] p-1'>
                  <FaTrashAlt />
                </button>
              </form>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}