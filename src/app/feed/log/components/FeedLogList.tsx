'use client';

import { FaEdit, FaPen, FaTrashAlt } from "react-icons/fa";
import { deleteFeed } from "../actions";
import { TrackingData } from "@/db/schema_trackerModule";
import Link from "next/link";

type Props = {
  feeds: TrackingData[];
};

export default function FeedLogList({ feeds }: Props) {

  async function handleDeleteFeed(formData: FormData) {
    if (confirm('Are you sure you want to delete this feed?')) {
      await deleteFeed(formData);
    }
  }

  return (
    <section className="w-full flex flex-col items-center justify-start gap-4 pt-4">
      <ul className='w-full flex flex-col items-center justify-start gap-2 px-6 text-sm'>
        {feeds.map((feed) => (
          <li key={feed.id} className='w-full flex items-center justify-between gap-1 bg-primary/50 px-2 py-1 rounded-md'>

            <p className='whitespace-pre'>
              {/* show date and time without seconds */}
              {feed.timestamp!.toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' }).replace(', ', '\n')}
            </p>
            <p>{feed.type === 'Right Breast' ? 'Right' : 'Left'}</p>
            <p>{Math.floor(feed.length! / 60)}m, {feed.length! % 60}s</p>
            <div className='flex gap-2 items-center text-[20px]'>
              <Link className='rounded-md bg-secondary p-1' href={`/feed/${feed.id}`}>
                <FaPen />
              </Link>
              <form action={handleDeleteFeed}>
                <input type='hidden' name='id' value={feed.id} />
                <button className='rounded-md bg-[#F20] p-1'>
                  <FaTrashAlt />
                </button>
              </form>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}