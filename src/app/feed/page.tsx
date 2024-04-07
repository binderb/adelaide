import Nav from "@/app/(global components)/Nav";
import FeedPicker from "./components/FeedPicker";
import Link from "next/link";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { User, users } from "@/db/schema_usersModule";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { Flip, toast } from "react-toastify";

export default async function Feed() {
  const session = await getServerSession(authOptions);
  const currentUser = await db.query.users.findFirst({where: eq(users.id,parseInt(session!.user.id))}) as User;

  return (
    <main className="flex min-h-screen flex-col items-center justify-start">
      <Nav />
      <section className="w-full flex pt-4 px-4 items-center justify-start gap-6">
        <Link href="/" className='std-link'>&larr; Back</Link>
        <h1 className='text-[18px] font-bold'>Feed</h1>
      </section>
      <FeedPicker currentUser={currentUser} />
      <section className="w-full flex pt-4 px-4 items-center justify-center gap-6">
        <Link href="/feed/log" className='std-link'>Feed Log</Link>
      </section>
    </main>
  );
}
