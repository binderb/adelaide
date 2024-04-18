'use client';

import SubmitButton from "@/app/(global components)/SubmitButton";
import { TrackingData } from "@/db/schema_trackerModule";
import { User } from "@/db/schema_usersModule";
import { useEffect, useState } from "react";
import { saveData } from "../actions";
import { Flip, ToastContainer, toast } from "react-toastify";
import { notify } from "@/lib/helpers";
import { FaCheck, FaMinus, FaPause, FaPlay, FaPlus } from "react-icons/fa";
import { clear } from "console";
import { BsEmojiFrownFill, BsEmojiNeutralFill, BsEmojiSmileFill } from "react-icons/bs";
import Breast from "./Breast";

type Props = {
  currentUser: User;
};

export default function FeedPicker({ currentUser }: Props) {
  const [side, setSide] = useState('');
  // make the default value here the current time rounded down to the nearest 5 minutes
  const [startTime, setStartTime] = useState(new Date(Math.floor(Date.now() / 300000) * 300000));
  const [length, setLength] = useState(0);
  const [clockStarted, setClockStarted] = useState(false);
  const [lengthInterval, setLengthInterval] = useState<NodeJS.Timeout | null>(null);
  const [clockPaused, setClockPaused] = useState(false);
  const [clockRefTime, setClockRefTime] = useState(new Date());
  const [rating, setRating] = useState('');

  useEffect(() => {
    if (clockStarted) {
      setLengthInterval(setInterval(() => {
        setLength(Math.floor((Date.now() - clockRefTime.getTime()) / 1000));
      }, 1000));
    }
    if (!clockStarted) {
      if (lengthInterval) clearInterval(lengthInterval);
      setLengthInterval(null);
    }
  }, [clockStarted]);

  useEffect(() => {
    if (clockStarted && !clockPaused && length > 0 && !lengthInterval) {
      console.log('unpaused!');
      setLengthInterval(setInterval(() => {
        setLength(Math.floor((Date.now() - clockRefTime.getTime()) / 1000));
      }, 1000));
    }
  }, [clockPaused, lengthInterval]);

  function startClock() {
    setClockStarted(true);
    setClockRefTime(new Date());
  }

  function pauseClock() {
    setClockPaused(true);
    if (lengthInterval) clearInterval(lengthInterval);
    setLengthInterval(null);
  }

  function resumeClock() {
    console.log('beginning unpause...');
    setClockPaused(false);
    setClockRefTime(new Date(Date.now() - length * 1000));
  }

  function stopClock() {
    setClockStarted(false);
  }

  function resetClock() {
    setLength(0);
    if (lengthInterval) clearInterval(lengthInterval);
    setLengthInterval(null);
    setClockStarted(false);
    setClockPaused(false);
  }

  async function handleSaveData() {
    try {
      if (side === '') throw new Error('Please select a side before saving.');
      if (length === 0) throw new Error('Please start the timer before saving.');
      const newTrackingData: TrackingData = {
        id: -1,
        user: currentUser.id,
        type: side === 'left' ? 'Left Breast' : 'Right Breast',
        subtype: null,
        timestamp: startTime,
        length: length,
        latch: rating as TrackingData['latch'],
        notes: '',
      };
      await saveData(newTrackingData);
      setLength(0);
      notify('success', 'Data saved successfully!');
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
    <main className='px-4 w-full'>
      <section className='flex justify-center items-center w-full gap-4 py-2'>
        {startTime.getMonth() + 1}/{startTime.getDate()}/{startTime.getFullYear()}
      </section>
      <section className='flex justify-center items-center w-full gap-4 py-2 text-[32px]'>
        <button onClick={() => setStartTime(new Date(startTime.getTime() - 300000))} className='flex justify-center items-center rounded-full bg-primary p-2'><FaMinus /></button>
        <div className='w-full px-2 flex justify-center items-center font-bold bg-appRed/50 rounded-md'>{startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
        <button className='flex justify-center items-center rounded-full bg-primary p-2' onClick={() => setStartTime(new Date(startTime.getTime() + 300000))}><FaPlus /></button>
      </section>
      <section className='grid grid-cols-2 gap-4 py-2 w-full'>
        <button className={side === 'left' ? `bg-appRed rounded-md p-4 text-white w-full h-[150px] font-bold flex flex-col items-center justify-center gap-2 border-appRed border-[5px]` : `rounded-md p-4 text-white w-full font-bold h-[150px] border-appRed border-[5px] flex flex-col items-center justify-center gap-2`} onClick={() => setSide('left')}>
          <Breast side={'left'} width={'15cqw'} />
          Left
        </button>
        <button className={side === 'right' ? `bg-appRed rounded-md p-4 text-white w-full h-[150px] font-bold flex flex-col items-center justify-center gap-2 border-appRed border-[5px]` : `rounded-md p-4 text-white w-full font-bold h-[150px] border-appRed border-[5px] flex flex-col items-center justify-center gap-2`} onClick={() => setSide('right')}>
          <Breast side={'right'} width={'15cqw'} />
          Right
        </button>
      </section>
      <section>
        <div className='font-bold flex justify-center pb-2'>How was the latch?</div>
      </section>
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
      <section className='flex justify-center items-center w-full gap-4 py-2'>
        {(!clockStarted && length === 0) && (
          <button className='flex items-center justify-center gap-2 bg-primary rounded-md w-full text-[20px] font-bold py-4' onClick={startClock}><FaPlay />Start</button>
        )}
        {(clockStarted && !clockPaused) && (
          <>
            <button className='bg-secondary rounded-md w-full text-[20px] font-bold py-4 flex items-center gap-2 justify-center' onClick={pauseClock}>
              <FaPause />
              Pause
            </button>
            <button className='bg-[#F00] rounded-md w-full text-[20px] font-bold py-4' onClick={stopClock}>Stop</button>
          </>
        )}
        {(!clockStarted && !clockPaused && length > 0) && (
          <>
            <button className='bg-primary rounded-md w-full text-[20px] font-bold py-4' onClick={resetClock}>Reset</button>
            <form action={handleSaveData} className='w-full'>
              <SubmitButton className='bg-appGreen rounded-md w-full text-[20px] font-bold py-4 flex items-center justify-center gap-2' text='Save' icon={<FaCheck />} pendingText='Saving...' />
            </form>
          </>
        )}
        {(clockPaused) && (
          <>
            <button className='flex items-center justify-center gap-2 bg-secondary rounded-md w-full text-[20px] font-bold py-4' onClick={resumeClock}><FaPlay />Resume</button>
            <button className='bg-primary rounded-md w-full text-[20px] font-bold py-4' onClick={resetClock}>Reset</button>
          </>
        )}
      </section>
      <section className='flex justify-center items-center w-full gap-4 py-2'>
        {/* Show the length of the feed in minutes and seconds */}
        <div className='text-[36px] w-full flex justify-center items-center font-bold bg-appRed/50 rounded-md'>{Math.floor(length / 60).toString().padStart(2, '0')}:{(length % 60).toString().padStart(2, '0')}</div>
      </section>
      <ToastContainer className='font-inter' />
    </main>
  );
}