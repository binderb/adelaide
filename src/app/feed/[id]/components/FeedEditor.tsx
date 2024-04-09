'use client';
import SubmitButton from "@/app/(global components)/SubmitButton";
import { TrackingData } from "@/db/schema_trackerModule";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { updateFeed } from "../actions";
import { ToastContainer } from "react-toastify";
import { notify } from "@/lib/helpers";

type Props = {
  feed: TrackingData;
};

export default function FeedEditor({ feed }: Props) {

  const [length, setLength] = useState(feed.length || 0);
  const [timestamp, setTimestamp] = useState<Date | null>(feed.timestamp || new Date());

  async function handleSaveFeed(formData: FormData) {
    formData.append("id", feed.id.toString());
    formData.append("length", length.toString());
    formData.append("timestamp", timestamp?.toISOString() || '');
    try {
      await updateFeed(formData);
      notify('success', 'Feed updated successfully!');
    } catch (err: any) {
      notify('error', err.message);
    }
  }


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
          Duration:
          <div className='w-full flex justify-start items-center font-bold bg-primary/50 rounded-md gap-4 py-2 px-4'>
            <div className='flex flex-col gap-2'>
              <button onClick={(e) => { e.preventDefault(); setLength(length >= 60 ? length - 60 : length); }} className='flex justify-center items-center rounded-full bg-primary px-4 py-1'>- Min</button>
              <button onClick={(e) => { e.preventDefault(); setLength(length >= 1 ? length - 1 : length); }} className='flex justify-center items-center rounded-full bg-primary px-4 py-1'>- Sec</button>
            </div>
            <div className='text-[36px]'>{Math.floor(length / 60).toString().padStart(2, '0')}:{(length % 60).toString().padStart(2, '0')}</div>
            <div className='flex flex-col gap-2'>
              <button onClick={(e) => { e.preventDefault(); setLength(length + 60); }} className='flex justify-center items-center rounded-full bg-primary px-4 py-1'>+ Min</button>
              <button onClick={(e) => { e.preventDefault(); setLength(length + 1); }} className='flex justify-center items-center rounded-full bg-primary px-4 py-1'>+ Sec</button>
            </div>

          </div>
        </label>
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
