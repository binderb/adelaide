import Nav from "@/app/(global components)/Nav";
import { db } from "@/db";
import { nights } from "@/db/schema_trackerModule";
import { eq } from "drizzle-orm";
import Link from "next/link";
import NightEditor from "./components/NightEditor";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { User, users } from "@/db/schema_usersModule";

export default async function EditNight ({params} : {params: {id: string}}) {
  
  const date = params.id;
  const formattedDate = `${params.id.slice(4,6)}/${params.id.slice(6,8)}/${params.id.slice(0,4)}`;

  console.log('date from params:', JSON.stringify(date));
  const night = await db.query.nights.findFirst({
    where: eq(nights.date, params.id),
    with: {
      tags: true
    }
  });
  console.log('date from database:', JSON.stringify(night?.date));
  const session = await getServerSession(authOptions);
  const currentUser = await db.query.users.findFirst({where: eq(users.id,parseInt(session!.user.id))}) as User;


  return (
    <>
    <Nav />
      <section className="w-full flex pt-4 px-4 items-center justify-between gap-6">
        <div className='flex gap-6 items-center'>
          <Link href="/nights" className='std-link'>&larr; Back</Link>
          <h1 className='text-[18px] font-bold'>{`Night of ${formattedDate}`}</h1>
        </div>
        <div className='flex gap-2 items-center'>
          {/* <form action={refresh}>
            <button className='bg-secondary rounded-full px-3 py-2 text-white flex items-center gap-2 text-[22px]'>
              <MdRefresh />
            </button>
          </form> */}
          {/* <Link href='/diapers/new' className='bg-appYellow rounded-full px-3 py-2 text-white flex items-center gap-2'>
            <FaPlus />
            New
          </Link> */}
        </div>
      </section>
      <section className='py-6'>
        <NightEditor user={currentUser} date={date} nightData={night} />
      </section>
    </>
  );
}