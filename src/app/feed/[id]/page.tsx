import Nav from "@/app/(global components)/Nav";
import { db } from "@/db";
import { trackings } from "@/db/schema_trackerModule";
import { eq } from "drizzle-orm";
import Link from "next/link";
import FeedEditor from "./components/FeedEditor";

export default async function EditFeed ({params} : {params: {id: number}}) {
  const feed = await db.query.trackings.findFirst({
    where: eq(trackings.id, params.id)
  });

  if (!feed) {
    return <div>Feed not found.</div>
  }

  return (
    <>
    <Nav />
      <section className="w-full flex pt-4 px-4 items-center justify-start gap-6">
        <Link href="/feed/log" className='std-link'>&larr; Back</Link>
        <h1 className='text-[18px] font-bold'>Edit Feed</h1>
      </section>
      <FeedEditor feed={feed} />
    </>
  )

}