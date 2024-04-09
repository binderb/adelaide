'use client';

import SubmitButton from "@/app/(global components)/SubmitButton";
import { TrackingData } from "@/db/schema_trackerModule";
import { User } from "@/db/schema_usersModule";
import { useEffect, useState } from "react";
import { saveData } from "../actions";
import { Flip, ToastContainer, toast } from "react-toastify";
import { notify } from "@/lib/helpers";

type Props = {
  currentUser: User
}

export default function FeedPicker({currentUser}:Props) {
  const [side, setSide] = useState('');
  // make the default value here the current time rounded down to the nearest 5 minutes in 24-hour format
  const [startTime, setStartTime] = useState(new Date(Math.floor(Date.now() / 300000) * 300000));
  const [realStartTime, setRealStartTime] = useState(new Date());
  const [length, setLength] = useState(0);
  const [clockStarted, setClockStarted] = useState(false);
  const [lengthInterval, setLengthInterval] = useState<NodeJS.Timeout|null>(null);

  useEffect(() => {
    // update the length of the feed every second
    if (clockStarted) {
      setRealStartTime(new Date());
      setLengthInterval(setInterval(() => {
        setLength(Math.floor((Date.now() - realStartTime.getTime()) / 1000));
      }, 1000));
    }
    if (!clockStarted) {
      if (lengthInterval) clearInterval(lengthInterval);
      setLengthInterval(null);
    }
  }, [clockStarted]);

  async function handleSaveData () {
    await sleep(1000);
    try {
      if (side === '') throw new Error('Please select a side before saving.');
      if (length === 0) throw new Error('Please start the timer before saving.');
      const newTrackingData:TrackingData = {
        id: -1,
        user: currentUser.id,
        type: side === 'left' ? 'Left Breast' : 'Right Breast',
        timestamp: startTime,
        length: length,
        notes: '',
      }
      await saveData(newTrackingData);
      setLength(0);
      notify('success', 'Data saved successfully!');
    } catch (err: any) {
      notify('error', err.message)
    }
  }

  async function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  return (
    <>
    <section className='flex justify-center items-center w-full gap-4 py-2'>
      {startTime.getMonth() + 1}/{startTime.getDate()}/{startTime.getFullYear()}
    </section>
    <section className='flex justify-center items-center w-full gap-4 py-2'>
      {/* Show the start time as a set of 4 digits displaying the military time, in separate divs */}
      <button onClick={() => setStartTime(new Date(startTime.getTime() - 300000))} className='w-[25px] h-[25px] flex justify-center items-center rounded-full bg-primary'>-</button>
      {startTime.getHours().toString().padStart(2, '0').split('').map((digit, i) => <div key={i} className='text-[36px] w-[50px] flex justify-center items-center font-bold bg-primary/50 rounded-md'>{digit}</div>)}
      {startTime.getMinutes().toString().padStart(2, '0').split('').map((digit, i) => <div key={i} className='text-[36px] w-[50px] flex justify-center items-center font-bold bg-primary/50 rounded-md'>{digit}</div>)}
      <button className='w-[25px] h-[25px] flex justify-center items-center rounded-full bg-primary' onClick={() => setStartTime(new Date(startTime.getTime() + 300000))}>+</button>
    </section>
    <section className='grid grid-cols-2 gap-8 px-[10%] py-2 w-full'>
      <button className={side === 'left' ? `bg-primary rounded-md p-4 text-white w-full h-[150px] font-bold` : `bg-black rounded-md p-4 text-white w-full font-bold h-[150px] border-primary border-[5px]`} onClick={() => setSide('left')}>Left</button>
      <button className={side === 'right' ? `bg-primary rounded-md p-4 text-white w-full h-[150px] font-bold` : `bg-black rounded-md p-4 text-white w-full font-bold h-[150px] border-primary border-[5px]`} onClick={() => setSide('right')}>Right</button>
    </section>
    <section className='flex justify-center items-center w-full gap-4 py-2 px-12'>
      {(!clockStarted && length === 0) && (
        <button className='bg-primary rounded-md w-full text-[20px] font-bold py-4' onClick={()=>{setClockStarted(true);setRealStartTime(new Date());}}>Start</button>
      )}
      {clockStarted && (
        <button className='bg-[#F20] rounded-md w-full text-[20px] font-bold py-4' onClick={()=>setClockStarted(false)}>Stop</button>
      )}
      {(!clockStarted && length > 0) && (
        <>
          <button className='bg-primary rounded-md w-full text-[20px] font-bold py-4' onClick={()=>setLength(0)}>Reset</button>
          <form action={handleSaveData} className='w-full'>
          <SubmitButton className='bg-[#18b03b] rounded-md w-full text-[20px] font-bold py-4 flex items-center justify-center gap-2' text='Save' pendingText='Saving...' />
          </form>
        </>
      )}
    </section>
    <section className='flex justify-center items-center w-full gap-4 py-2 px-12'>
      {/* Show the length of the feed in minutes and seconds */}
      <div className='text-[36px] w-full flex justify-center items-center font-bold bg-primary/50 rounded-md'>{Math.floor(length / 60).toString().padStart(2, '0')}:{(length % 60).toString().padStart(2, '0')}</div>
    </section>
    <ToastContainer className='font-inter' />
    </>
  );
}