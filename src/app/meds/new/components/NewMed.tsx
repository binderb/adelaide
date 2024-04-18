'use client';
import SubmitButton from "@/app/(global components)/SubmitButton";
import { TrackingData } from "@/db/schema_trackerModule";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { ToastContainer } from "react-toastify";
import { notify } from "@/lib/helpers";
import { User } from "@/db/schema_usersModule";
import { addMed } from "../actions";
import { useRouter } from "next/navigation";

type Props = {
  user: User;
};

export default function NewMed({ user }: Props) {

  const [subType, setSubType] = useState('');
  const [timestamp, setTimestamp] = useState<Date | null>(new Date());
  const router = useRouter();

  async function handleSaveNewMed(formData: FormData) {
    formData.append("subtype", subType || '');
    formData.append("timestamp", timestamp?.toISOString() || '');
    formData.append("user", user.id.toString());
    try {
      await addMed(formData);
      router.push('/meds');
    } catch (err: any) {
      notify('error', err.message);
    }
  }


  return (
    <section className='px-6 pt-6'>
      
      <form className='ui-box' action={handleSaveNewMed}>
      <section className='grid grid-cols-2 gap-4 justify-center items-center'>
          <button className={subType === 'Ibuprofen' ? `bg-appGreen rounded-md p-4 text-white font-bold aspect-square text-[2.5cqw]` : `rounded-md p-4 text-white font-bold border-appGreen border-[2px] aspect-square text-[2.5cqw]`} onClick={(e) => {e.preventDefault();setSubType('Ibuprofen');}}>Ibuprofen</button>
          <button className={subType === 'Tylenol' ? `bg-appGreen rounded-md p-4 text-white font-bold aspect-square text-[2.5cqw]` : `rounded-md p-4 text-white font-bold border-appGreen border-[2px] aspect-square text-[2.5cqw]`} onClick={(e) => {e.preventDefault();setSubType('Tylenol');}}>Tylenol</button>
          <button className={subType === 'Stool Softener' ? `bg-appGreen rounded-md p-4 text-white font-bold aspect-square text-[2.5cqw]` : `rounded-md p-4 text-white font-bold border-appGreen border-[2px] aspect-square text-[2.5cqw]`} onClick={(e) => {e.preventDefault();setSubType('Stool Softener');}}>Stool Softener</button>
          <button className={subType === 'Vitamins' ? `bg-appGreen rounded-md p-4 text-white font-bold aspect-square text-[2.5cqw]` : `rounded-md p-4 text-white font-bold border-appGreen border-[2px] aspect-square text-[2.5cqw]`} onClick={(e) => {e.preventDefault();setSubType('Vitamins');}}>Vitamins</button>
          
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
