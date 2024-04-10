'use client';
import { TrackingData } from "@/db/schema_trackerModule";
import Link from "next/link";
import { useState } from "react";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import { deleteMed } from "../actions";

type Props = {
  meds: TrackingData[];
};

export default function MedLog ({ meds }: Props) {

  async function handleDeleteMed(formData: FormData) {
    if (confirm('Are you sure you want to delete this med?')) {
      await deleteMed(formData);
    }
  }

  return (
    <>
    <section className="w-full flex flex-col items-center justify-start gap-4">
      <ul className='w-full flex flex-col items-center justify-start gap-2 px-6 text-sm'>
        {meds.map((med) => (
          <li key={med.id} className='w-full flex items-center justify-between gap-1 bg-[#18b03b]/50 px-2 py-1 rounded-md'>

            <p className='whitespace-pre'>
              {/* show date and time without seconds */}
              {med.timestamp!.toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' }).replace(', ', '\n')}
            </p>
            <p>{med.subtype}</p>
            <div className='flex gap-2 items-center text-[20px]'>
              <form action={handleDeleteMed}>
                <input type='hidden' name='id' value={med.id} />
                <button className='rounded-md bg-[#F20] p-1'>
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