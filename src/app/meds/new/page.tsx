import { db } from "@/db";
import { trackings } from "@/db/schema_trackerModule";
import { desc, eq } from "drizzle-orm";
import Nav from "@/app/(global components)/Nav";
import Link from "next/link";
import NewMed from "./components/NewMed";
import { users } from "@@/drizzle/schema";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { User } from "@/db/schema_usersModule";

export default async function Meds() {
  const meds = await db.query.trackings.findMany({
    where: eq(trackings.type, 'Med'),
    orderBy: [desc(trackings.timestamp)]
  });
  const session = await getServerSession(authOptions);
  const currentUser = await db.query.users.findFirst({where: eq(users.id,parseInt(session!.user.id))}) as User;

  return (
    <>
      <Nav />
      <section className="w-full flex pt-4 px-4 items-center justify-between gap-6">
        <div className='flex gap-6 items-center'>
          <Link href="/meds" className='std-link'>&larr; Back</Link>
          <h1 className='text-[18px] font-bold'>New Med</h1>
        </div>
      </section>
      <NewMed user={currentUser} />
    </>
  );
}