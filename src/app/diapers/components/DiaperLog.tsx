'use client';
import { TrackingData } from "@/db/schema_trackerModule";
import Link from "next/link";
import { useState } from "react";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import { deleteDiaper } from "../actions";

type Props = {
  diapers: TrackingData[];
};

export default function MedLog ({ diapers }: Props) {

  async function handleDeleteDiaper(formData: FormData) {
    if (confirm('Are you sure you want to delete this entry?')) {
      await deleteDiaper(formData);
    }
  }

  return (
    <>
    <section className="w-full flex flex-col items-center justify-start gap-4">
      <ul className='w-full flex flex-col items-center justify-start gap-2 px-6 text-sm'>
        {diapers.map((diaper) => (
          <li key={diaper.id} className='w-full flex items-center justify-between gap-1 bg-appOrange/50 px-2 py-1 rounded-md'>

            <p className='whitespace-pre'>
              {/* show date and time without seconds */}
              {diaper.timestamp!.toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' }).replace(', ', '\n')}
            </p>
            <p>{diaper.subtype}</p>
            <div className='flex gap-2 items-center text-[20px]'>
              <form action={handleDeleteDiaper}>
                <input type='hidden' name='id' value={diaper.id} />
                <button className='rounded-md bg-appRed p-1'>
                  <FaTrashAlt />
                </button>
              </form>
            </div>
          </li>
        ))}
      </ul>
    </section>
    </>
  );
}