'use client';
import { TrackingData } from "@/db/schema_trackerModule";
import { FaCheckCircle, FaClock } from "react-icons/fa";

type Props = {
  meds: TrackingData[];
};

export default async function NextMed({ meds }: Props) {

  const lastIbuprofen = meds.find(med => med.subtype === 'Ibuprofen');
  const lastTylenol = meds.find(med => med.subtype === 'Tylenol');
  const lastSoftener = meds.find(med => med.subtype === 'Stool Softener');

  return (
    <section className='ui-box text-[12px]'>
      <div className='flex gap-2'>
        <div className=''>You can take Ibuprofen (6 hrs): </div>
        {/* Check if it's been six hours since the last tylenol */}
        {lastIbuprofen && (
          <>
            {new Date().getTime() - lastIbuprofen.timestamp!.getTime() > 1000 * 60 * 60 * 6 ? (
              <div className='text-appGreen flex gap-2 items-center'>
                <FaCheckCircle />
                Now
              </div>
            ) : (
              <>
                {/* If not, show the time when it's safe to take again */}
                <div className='text-[#ffb300] flex gap-2 items-center'>
                  <FaClock />
                  {new Date(lastIbuprofen.timestamp!.getTime() + 1000 * 60 * 60 * 6).toLocaleTimeString('en-US', { timeStyle: 'short' })}
                </div>
              </>
            )}
          </>
        )}
        {!lastIbuprofen && (
          <div className='italic text-secondary'>{`(No data)`}</div>
        )}
      </div>
      <div className='flex gap-2'>
        <div className=''>You can take Tylenol (8 hrs): </div>
        {/* Check if it's been six hours since the last tylenol */}
        {lastTylenol && (
          <>
            {new Date().getTime() - lastTylenol.timestamp!.getTime() > 1000 * 60 * 60 * 8 ? (
              <div className='text-appGreen flex gap-2 items-center'>
                <FaCheckCircle />
                Now
              </div>
            ) : (
              <>
                {/* If not, show the time when it's safe to take again */}
                <div className='text-[#ffb300] flex gap-2 items-center'>
                  <FaClock />
                  {new Date(lastTylenol.timestamp!.getTime() + 1000 * 60 * 60 * 8).toLocaleTimeString('en-US', { timeStyle: 'short' })}
                </div>
              </>
            )}
          </>
        )}
        {!lastTylenol && (
          <div className='italic text-secondary'>{`(No data)`}</div>
        )}
      </div>
      <div className='flex gap-2'>
        <div className=''>You can take Softener (12 hrs): </div>
        {/* Check if it's been six hours since the last softener */}
        {lastSoftener && (
          <>
            {new Date().getTime() - lastSoftener.timestamp!.getTime() > 1000 * 60 * 60 * 12 ? (
              <div className='text-appGreen flex gap-2 items-center'>
                <FaCheckCircle />
                Now
              </div>
            ) : (
              <>
                {/* If not, show the time when it's safe to take again */}
                <div className='text-[#ffb300] flex gap-2 items-center'>
                  <FaClock />
                  {new Date(lastSoftener.timestamp!.getTime() + 1000 * 60 * 60 * 12).toLocaleTimeString('en-US', { timeStyle: 'short' })}
                </div>
              </>
            )}
          </>
        )}
        {!lastSoftener && (
          <div className='italic text-secondary'>{`(No data)`}</div>
        )}
      </div>
    </section>
  );
}