'use client';
import SubmitButton from "@/app/(global components)/SubmitButton";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { ToastContainer } from "react-toastify";
import { notify } from "@/lib/helpers";
import { User } from "@/db/schema_usersModule";
import { addDiaper } from "../actions";
import { useRouter } from "next/navigation";
import { FaPoo } from "react-icons/fa";
import { IoThunderstorm } from "react-icons/io5";
import { GiWaterDrop } from "react-icons/gi";

type Props = {
  user: User;
};

export default function NewMed({ user }: Props) {

  const [subType, setSubType] = useState('');
  const [timestamp, setTimestamp] = useState<Date | null>(new Date());
  const router = useRouter();

  async function handleSaveNewDiaper(formData: FormData) {
    formData.append("subtype", subType || '');
    formData.append("timestamp", timestamp?.toISOString() || '');
    formData.append("user", user.id.toString());
    try {
      await addDiaper(formData);
      router.push('/diapers');
    } catch (err: any) {
      notify('error', err.message);
    }
  }


  return (
    <section className='px-6 pt-6'>
      <form className='ui-box' action={handleSaveNewDiaper}>
        {/* <section className="font-bold">The Main Event:</section> */}
        <section className='grid grid-cols-3 gap-4 justify-center items-center'>

          <button className={`flex flex-col gap-[1cqw] items-center justify-center text-[10cqw] ${subType === 'Wet' ? `bg-[#ff9239] rounded-md p-4 text-white font-bold aspect-square text-[10cqw]` : `rounded-md p-4 text-white font-bold border-[#ff9239] border-[2px] aspect-square text-[10cqw]`}`} onClick={(e) => { e.preventDefault(); setSubType('Wet'); }}><GiWaterDrop /><div className='text-[3cqw]'>Wet</div></button>

          <button className={`flex flex-col gap-[1cqw] items-center justify-center text-[10cqw] ${subType === 'Dirty' ? `bg-[#ff9239] rounded-md p-4 text-white font-bold aspect-square text-[10cqw]` : `rounded-md p-4 text-white font-bold border-[#ff9239] border-[2px] aspect-square text-[10cqw]`}`} onClick={(e) => { e.preventDefault(); setSubType('Dirty'); }}><FaPoo /><div className='text-[3cqw]'>Dirty</div></button>

          <button className={`flex flex-col gap-[1cqw] items-center justify-center text-[10cqw] ${subType === 'Both' ? `bg-[#ff9239] rounded-md p-4 text-white font-bold aspect-square text-[10cqw]` : `rounded-md p-4 text-white font-bold border-[#ff9239] border-[2px] aspect-square text-[10cqw]`}`} onClick={(e) => { e.preventDefault(); setSubType('Both'); }}><IoThunderstorm /><div className='text-[3cqw]'>Both</div></button>

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
