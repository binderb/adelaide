'use client';
import SubmitButton from "@/app/(global components)/SubmitButton";
import { TrackingData } from "@/db/schema_trackerModule";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { updateFeed } from "../actions";
import { ToastContainer } from "react-toastify";
import { notify } from "@/lib/helpers";
import { useRouter } from "next/navigation";
import { BsEmojiFrownFill, BsEmojiNeutralFill, BsEmojiSmileFill } from "react-icons/bs";

type Props = {
  feed: TrackingData;
};

export default function FeedEditor({ feed }: Props) {

  const router = useRouter();
  const [length, setLength] = useState(feed.length || 0);
  const [timestamp, setTimestamp] = useState<Date | null>(feed.timestamp || new Date());
  const [rating, setRating] = useState(feed.latch || '');

  async function handleSaveFeed(formData: FormData) {
    formData.append("id", feed.id.toString());
    formData.append("length", length.toString());
    formData.append("timestamp", timestamp?.toISOString() || '');
    formData.append("latch", rating);
    try {
      await updateFeed(formData);
      router.push(`/feed/log`);
    } catch (err: any) {
      notify('error', err.message);
    }
  }

  const ratingColors = {
    Good: 'bg-[#98ea2e]',
    Ok: 'bg-primary',
    Bad: 'bg-appOrange',
  };

  const ratingBorders = {
    Good: 'border-[#98ea2e]',
    Ok: 'border-primary',
    Bad: 'border-appOrange',
  };

  const ratingIcons = {
    Good: <BsEmojiSmileFill />,
    Ok: <BsEmojiNeutralFill />,
    Bad: <BsEmojiFrownFill />,
  };


  return (
    <section className='px-6 pt-6'>
      <form className='ui-box' action={handleSaveFeed}>
        <label className='flex items-center gap-4'>
          Type:
          <select name='type' className='std-input w-full' defaultValue={feed.type}>
            <option value='Left Breast'>Left</option>
            <option value='Right Breast'>Right</option>
          </select>
        </label>
        <label className='flex items-center gap-4'>
          <div className='w-full flex justify-center items-center font-bold bg-appRed/50 rounded-md gap-4 py-2 px-4'>
            <div className='flex flex-col gap-2'>
              <button onClick={(e) => { e.preventDefault(); setLength(length >= 60 ? length - 60 : length); }} className='flex justify-center items-center rounded-full bg-appRed px-4 py-1'>- Min</button>
              <button onClick={(e) => { e.preventDefault(); setLength(length >= 1 ? length - 1 : length); }} className='flex justify-center items-center rounded-full bg-appRed px-4 py-1'>- Sec</button>
            </div>
            <div className=''>{Math.floor(length / 60).toString().padStart(2, '0')}:{(length % 60).toString().padStart(2, '0')}</div>
            <div className='flex flex-col gap-2'>
              <button onClick={(e) => { e.preventDefault(); setLength(length + 60); }} className='flex justify-center items-center rounded-full bg-appRed px-4 py-1'>+ Min</button>
              <button onClick={(e) => { e.preventDefault(); setLength(length + 1); }} className='flex justify-center items-center rounded-full bg-appRed px-4 py-1'>+ Sec</button>
            </div>

          </div>
        </label>
        <section className='grid grid-cols-3 gap-[1cqw] justify-center items-center pb-2'>
        {Object.keys(ratingColors).map((key) => {
          return (
            <button key={key} className={`flex flex-col gap-[2cqw] items-center justify-center ${rating === key ? `${ratingColors[key as keyof typeof ratingColors]} rounded-md p-4 text-white font-bold aspect-square border-[5px] ${ratingBorders[key as keyof typeof ratingBorders]}` : `rounded-md p-4 text-white font-bold border-appRed border-[5px] aspect-square`}`} onClick={(e) => { e.preventDefault(); setRating(key); }}>
              <div className='text-[8cqw]'>{ratingIcons[key as keyof typeof ratingIcons]}</div>
              <div>{key}</div>
            </button>
          );

        })}
      </section>
        <label className='flex items-center gap-4 w-full'>
          Timestamp:
          <DatePicker className='std-input w-full' selected={timestamp} onChange={(date) => setTimestamp(date)} timeIntervals={5} showTimeSelect dateFormat="Pp" />
        </label>
        <SubmitButton text='Save Changes' pendingText="Saving..." />
      </form>
      <ToastContainer className='font-inter' />
    </section>
  );

}
