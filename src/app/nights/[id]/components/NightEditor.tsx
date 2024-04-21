'use client';
import SubmitButton from "@/app/(global components)/SubmitButton";
import { Night, NightTag, NightWithTags, TrackingData, nights, tagTextEnum } from "@/db/schema_trackerModule";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { ToastContainer } from "react-toastify";
import { notify } from "@/lib/helpers";
import { User } from "@/db/schema_usersModule";
import { addOrUpdateNight, deleteNight } from "../actions";
import { useRouter } from "next/navigation";
import { FaAngry, FaPoo, FaSkull, FaSmile, FaSun, FaTag, FaWind } from "react-icons/fa";
import { BsEmojiDizzyFill, BsEmojiFrownFill, BsEmojiLaughing, BsEmojiLaughingFill, BsEmojiNeutralFill, BsEmojiSmileFill, BsHearts } from "react-icons/bs";
import Modal from "@/app/(global components)/Modal";
import { IoFastFood, IoLockClosed } from "react-icons/io5";
import { GiSpikeball } from "react-icons/gi";
import { HiPuzzlePiece } from "react-icons/hi2";

type Props = {
  user: User;
  nightData?: NightWithTags;
  date: string;
};

export default function NightEditor({ user, date, nightData }: Props) {

  const [rating, setRating] = useState(nightData?.rating || '');
  const [tags, setTags] = useState<NightTag['text'][]>(nightData?.tags.map((tag) => tag.text) || []);
  console.log('tags', tags);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  async function handleAddOrUpdateNight(formData: FormData) {
    formData.append("user", user.id.toString());
    formData.append("rating", rating);
    formData.append("tags", JSON.stringify(tags));
    formData.append("date", date);
    try {
      await addOrUpdateNight(formData);
      router.push('/nights');
    } catch (err: any) {
      notify('error', err.message);
    }
  }

  async function handleDeleteEntry () {
    if (confirm('Are you sure you want to delete this entry?')) {
      try {
        await deleteNight(date);
        router.push('/nights');
      } catch (err: any) {
        notify('error', err.message);
      }
    }
  }

  const ratingColors = {
    Great: 'bg-appYellow',
    Good: 'bg-[#98ea2e]',
    Ok: 'bg-primary',
    Bad: 'bg-appOrange',
    Awful: 'bg-appRed',
  };

  const ratingBorders = {
    Great: 'border-appYellow',
    Good: 'border-[#98ea2e]',
    Ok: 'border-primary',
    Bad: 'border-appOrange',
    Awful: 'border-appRed',
  };

  const ratingIcons = {
    Great: <BsEmojiLaughingFill />,
    Good: <BsEmojiSmileFill />,
    Ok: <BsEmojiNeutralFill />,
    Bad: <BsEmojiFrownFill />,
    Awful: <BsEmojiDizzyFill />,
  };

  const tagIcons = {
    'Good Latches': <IoLockClosed />,
    'Cluster Feeding': <IoFastFood />,
    'Painful Latches': <GiSpikeball />,
    'Very Fussy': <FaAngry />,
    'Long Wake Windows': <FaSun />,
    'Interactive While Awake': <HiPuzzlePiece />,
    'Gassy': <FaWind />,
    'Lots of Poops': <FaPoo />,
    'Parents Slept Well': <BsEmojiLaughingFill />,
    'Parents Exhausted': <FaSkull />,
    'Good Teamwork': <BsHearts />,
  };


  return (
    <section className='px-6'>
      <form className='ui-box px-[1cqw]' action={handleAddOrUpdateNight}>
        <section className='font-bold'>How was the night?</section>
        <section className='grid grid-cols-5 gap-[1cqw] justify-center items-center'>
          {Object.keys(ratingColors).map((key) => {
            return (
              <button key={key} className={`flex flex-col gap-[1cqw] items-center justify-center text-[10cqw] ${rating === key ? `${ratingColors[key as keyof typeof ratingColors]} ${ratingBorders[key as keyof typeof ratingBorders]} rounded-md p-4 text-white font-bold aspect-square text-[6cqw]` : `rounded-md p-4 text-white font-bold border-appPurple border-[2px] aspect-square text-[6cqw]`}`} onClick={(e) => { e.preventDefault(); setRating(key); }}>
                {ratingIcons[key as keyof typeof ratingIcons]}
                <div className='text-[2cqw]'>{key}</div>
              </button>
            );

          })}
        </section>
        <section className='font-bold flex justify-between items-center'>
          <div>Tags for this night:</div>
          <button className='bg-appPurple rounded-full px-3 py-2 text-white flex items-center gap-2' onClick={(e) => { e.preventDefault(); setShowModal(true); }}>
            <FaTag />
            Tags
          </button>
        </section>
        <section className='flex flex-col gap-2'>
          {tags.map((tag) => {
            return (
              <div key={tag} className='flex items-center gap-2'>
                <div className='text-[32px]'>{tagIcons[tag as keyof typeof tagIcons]}</div>
                <div>{tag}</div>
              </div>
            );
          })}
        </section>
        <section className='font-bold'>Notes:</section>
        <textarea className='border border-appPurple bg-secondary/20 rounded-md p-2 w-full h-[200px] resize-none' name='notes' defaultValue={nightData?.notes || ''} />
        <SubmitButton text='Save Changes' pendingText="Saving..." />
      </form>
      <div className='flex justify-center w-full text-center py-4'>
        <button className='text-appRed underline' onClick={handleDeleteEntry}>Delete Entry</button>
      </div>
      <ToastContainer className='font-inter' />
      <Modal showModal={showModal} className='w-[90%]'>
        <button className='bg-appPurple rounded-full px-3 py-2 text-white flex justify-center items-center gap-2' onClick={(e) => { e.preventDefault(); setShowModal(false); }}>
          Close
        </button>
        {/* a list of buttons, each with the name of a tag specified in the NightTag text enum */}
        {tagTextEnum.enumValues.map((tag) => {
          return (
            <button key={tag} className={`flex items-center gap-2 p-2 rounded-md ${tags.includes(tag) ? `bg-appPurple` : `bg-secondary`}`} onClick={(e) => { e.preventDefault(); if (!tags.includes(tag)) setTags([...tags, tag]); else setTags([...tags].filter((t) => t !== tag)); }}>
              <div className='text-[32px]'>{tagIcons[tag as keyof typeof tagIcons]}</div>
              <div className='text-left'>{tag}</div>
            </button>
          );
        })}
        <button className='bg-appPurple rounded-full px-3 py-2 text-white flex justify-center items-center gap-2' onClick={(e) => { e.preventDefault(); setShowModal(false); }}>
          Close
        </button>
      </Modal>
    </section>
  );

}
