import Nav from "@/app/(global components)/Nav";
import FeedPicker from "./components/FeedPicker";
import Link from "next/link";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { User, users } from "@/db/schema_usersModule";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { Flip, toast } from "react-toastify";

export default async function BreastFeed() {
  const session = await getServerSession(authOptions);

  return (
    <main className="flex min-h-screen flex-col items-center justify-start">
      <Nav />
      <section className="w-full flex pt-4 px-4 items-center justify-start gap-6">
        <Link href="/feed" className='std-link'>&larr; Back</Link>
        <h1 className='text-[18px] font-bold'>Breast Feed</h1>
      </section>
      <FeedPicker currentUser={parseInt(session!.user.id)} />
      <section className="w-full flex pt-4 px-4 items-center justify-center gap-6 pb-4">
        <Link href="/feed/log" className='std-link'>Feed Log</Link>
      </section>
    </main>
  );
}
