'use client';

import { FaTrashAlt } from "react-icons/fa";
import { deleteFeed } from "../actions";
import { TrackingData } from "@/db/schema_trackerModule";

type Props = {
  feeds: TrackingData[]
}

export default function FeedLogList({ feeds }: Props) {
  return (
    <section className="w-full flex flex-col items-center justify-start gap-4 pt-4">
        <ul className='w-full flex flex-col items-center justify-start gap-2 px-6 text-sm'>
          {feeds.map((feed) => (
            <li key={feed.id} className='w-full flex items-center justify-between gap-1 bg-primary/50 px-2 py-1 rounded-md'>
              
              <p>
                {/* show date and time without seconds */}
                {feed.timestamp!.toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' })}
              </p>
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
  );
}