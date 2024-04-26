'use client';
import SubmitButton from "@/app/(global components)/SubmitButton";
import { Feed, TrackingData, feeds } from "@/db/schema_trackerModule";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { saveData } from "../../actions";
import { ToastContainer } from "react-toastify";
import { notify } from "@/lib/helpers";
import { useRouter } from "next/navigation";
import { BsEmojiFrownFill, BsEmojiNeutralFill, BsEmojiSmileFill } from "react-icons/bs";
import { FaMinus, FaPlus } from "react-icons/fa";

type Props = {
  currentUser: number;
};

export default function BottlePicker({ currentUser }: Props) {

  const router = useRouter();
  const [amount, setAmount] = useState(0);
  const [timestamp, setTimestamp] = useState<Date|null>(new Date());
  const [bottleType, setBottleType] = useState('Breastmilk Bottle' as Feed['type']);

  async function handleSaveFeed() {
    try {
      if (amount === 0) throw new Error('Please enter an amount before saving.');
      const newFeedData: Feed = {
        id: -1,
        user: currentUser,
        type: bottleType as Feed['type'],
        timestamp: timestamp || new Date(),
        amount: amount.toFixed(2),
        length: null,
        latch: null,
        notes: '',
      };
      await saveData(newFeedData);
      setAmount(0);
      notify('success', 'Data saved successfully!');
    } catch (err: any) {
      notify('error', err.message);
    }
  }

  return (
    <section className='px-4 w-full pt-6'>
      <form className='ui-box' action={handleSaveFeed}>
        <label className='flex items-center gap-4'>
          Milk Type:
          <select name='type' className='std-input w-full' value={bottleType} onChange={(e)=>setBottleType(e.target.value as Feed['type'])}>
            <option value='Breastmilk Bottle'>Breastmilk</option>
            <option value='Formula Bottle'>Formula</option>
          </select>
        </label>
        <label className='flex items-center gap-4'>
          <div className='w-full flex justify-center items-center font-bold bg-appRed/50 rounded-md gap-4 py-2 px-4'>
            <div className='flex flex-col gap-2'>
              <button onClick={(e) => { e.preventDefault(); setAmount(amount >= 0.25 ? amount - 0.25 : amount); }} className='flex justify-center items-center rounded-full aspect-square bg-appRed px-4 py-1'><FaMinus /></button>
            </div>
            <div className=''>{`${amount.toFixed(2)} oz`}</div>
            <div className='flex flex-col gap-2'>
              <button onClick={(e) => { e.preventDefault(); setAmount(amount + 0.25); }} className='flex justify-center items-center aspect-square rounded-full bg-appRed px-4 py-1'><FaPlus /></button>
            </div>
          </div>
        </label>
        {/* <section className='grid grid-cols-3 gap-[1cqw] justify-center items-center pb-2'>
        {Object.keys(ratingColors).map((key) => {
          return (
            <button key={key} className={`flex flex-col gap-[2cqw] items-center justify-center ${rating === key ? `${ratingColors[key as keyof typeof ratingColors]} rounded-md p-4 text-white font-bold aspect-square border-[5px] ${ratingBorders[key as keyof typeof ratingBorders]}` : `rounded-md p-4 text-white font-bold border-appRed border-[5px] aspect-square`}`} onClick={(e) => { e.preventDefault(); setRating(key); }}>
              <div className='text-[8cqw]'>{ratingIcons[key as keyof typeof ratingIcons]}</div>
              <div>{key}</div>
            </button>
          );

        })}
      </section> */}
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
