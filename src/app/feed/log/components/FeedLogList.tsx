'use client';

import { FaEdit, FaPen, FaTrashAlt } from "react-icons/fa";
import { deleteFeed } from "../actions";
import { Feed, TrackingData } from "@/db/schema_trackerModule";
import Link from "next/link";
import { BsEmojiFrownFill, BsEmojiNeutralFill, BsEmojiSmileFill } from "react-icons/bs";
import { LuCircleDashed } from "react-icons/lu";
import Breast from "../../breast/components/Breast";
import { GiBabyBottle } from "react-icons/gi";

type Props = {
  feeds: Feed[];
};

export default function FeedLogList({ feeds }: Props) {

  async function handleDeleteFeed(formData: FormData) {
    if (confirm('Are you sure you want to delete this feed?')) {
      await deleteFeed(formData);
    }
  }

  const ratingIcons = {
    Good: <BsEmojiSmileFill />,
    Ok: <BsEmojiNeutralFill />,
    Bad: <BsEmojiFrownFill />,
  };

  const ratingColors = {
    Good: 'text-[#98ea2e]',
    Ok: 'text-primary',
    Bad: 'text-appOrange',
  };

  return (
    <section className="w-full flex flex-col items-center justify-start gap-4 pt-4">
      <ul className='w-full flex flex-col items-center justify-start gap-2 px-6 text-sm pb-6'>
        {feeds.map((feed) => (
          <li key={feed.id} className='w-full flex items-center justify-between gap-1 bg-appRed/50 px-2 py-1 rounded-md'>

            <p className='whitespace-pre'>
              {`${feed.timestamp!.toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' }).replace(', ', '\n')}`}
            </p>
            <p className='flex items-center gap-2'>
              {feed.type === 'Right Breast' && (
                <>
                  <Breast side='right' width={'24px'} />
                  <div>R</div>
                </>
              )}
              {feed.type === 'Left Breast' && (
                <>
                  <Breast side='right' width={'24px'} />
                  <div>L</div>
                </>
              )}
              {feed.type === 'Breastmilk Bottle' && (
                <>
                  <GiBabyBottle className='text-[22px]' />
                  <div>B</div>
                </>
              )}
              {feed.type === 'Formula Bottle' && (
                <>
                  <GiBabyBottle />
                  <div>F</div>
                </>
              )}
            </p>
            <p>
              {(feed.type === 'Right Breast' || feed.type === 'Left Breast') && (
                <>
                  {`${Math.floor(feed.length! / 60)}m, ${feed.length! % 60}s`}
                </>
              )}
              {(feed.type === 'Breastmilk Bottle' || feed.type === 'Formula Bottle') && (
                <>
                  {`${parseFloat(feed.amount!).toFixed(2)} oz`}
                </>
              )}
              </p>
              <p>
                {feed.latch && (
                  <span className={`${ratingColors[feed.latch]}`}>{ratingIcons[feed.latch]}</span>
                )}
                {!feed.latch && (
                  <>
                    {(feed.type === 'Breastmilk Bottle' || feed.type === 'Formula Bottle') && (
                      <GiBabyBottle className='text-white text-[22px]' />
                    )}
                    {(feed.type === 'Left Breast' || feed.type === 'Right Breast') && (
                      <LuCircleDashed className='text-secondary' />
                    )}
                  </>

                )}
              </p>
              <div className='flex gap-2 items-center text-[20px]'>
                <Link className='rounded-md bg-secondary p-1' href={`/feed/${feed.id}`}>
                  <FaPen />
                </Link>
                <form action={handleDeleteFeed}>
                  <input type='hidden' name='id' value={feed.id} />
                  <button className='rounded-md bg-appRed p-1'>
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