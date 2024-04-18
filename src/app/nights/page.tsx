import Link from "next/link";
import Nav from "../(global components)/Nav";
import { refresh } from "./actions";
import { MdRefresh } from "react-icons/md";
import NightCalendar from "./components/NightCalendar";
import { FaTag } from "react-icons/fa";
import { db } from "@/db";
import { asc, eq } from "drizzle-orm";
import { nights, trackings } from "@/db/schema_trackerModule";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { User, users } from "@/db/schema_usersModule";

export default async function Nights() {

  const session = await getServerSession(authOptions);
  const currentUser = await db.query.users.findFirst({where: eq(users.id,parseInt(session!.user.id))}) as User;
  const allNights = await db.query.nights.findMany({
    where: eq(nights.user, currentUser.id),
    orderBy: [asc(nights.date)]
  });
  

  return (
    <>
      <Nav />
      <section className="w-full flex pt-4 px-4 items-center justify-between gap-6">
        <div className='flex gap-6 items-center'>
          <Link href="/" className='std-link'>&larr; Back</Link>
          <h1 className='text-[18px] font-bold'>Nights</h1>
        </div>
        <div className='flex gap-2 items-center'>
          
          <form action={refresh}>
            <button className='bg-secondary rounded-full px-3 py-2 text-white flex items-center gap-2 text-[22px]'>
              <MdRefresh />
            </button>
          </form>
          {/* <Link href='/nights/tags' className='bg-appPurple rounded-full px-3 py-2 text-white flex items-center gap-2'>
            <FaTag />
            Tags
          </Link> */}
        </div>
      </section>
      <section className='py-6'>
        <NightCalendar nights={allNights} />
      </section>

    </>
  );
}