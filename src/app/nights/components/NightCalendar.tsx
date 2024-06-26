'use client';

import { Night } from "@/db/schema_trackerModule";
import Link from "next/link";
import { BsEmojiDizzyFill, BsEmojiFrownFill, BsEmojiLaughingFill, BsEmojiNeutralFill, BsEmojiSmileFill } from "react-icons/bs";
import { FaSmile } from "react-icons/fa";

type Props = {
  nights: Night[];
}

export default function NightCalendar({ nights }: Props) {

  const ratingColors = {
    Great: 'text-appYellow',
    Good: 'text-[#98ea2e]',
    Ok: 'text-primary',
    Bad: 'text-appOrange',
    Awful: 'text-appRed',
  };

  const ratingIcons = {
    Great: <BsEmojiLaughingFill className='text-appYellow' />,
    Good: <BsEmojiSmileFill className='text-[#98ea2e]' />,
    Ok: <BsEmojiNeutralFill className='text-appBlue' />,
    Bad: <BsEmojiFrownFill className='text-appOrange' />,
    Awful: <BsEmojiDizzyFill className='text-appRed' />,
  };

  return (
    <>
      {/* create a grid of squares with white borders and dates, starting two weeks before the current date */}
      <main className='px-4'>
        <table className='text-[2cqw] w-full text-white/50'>
          <tbody>
            {Array(8).fill(null).map((_, weekIndex) => {
              return (
                <tr key={weekIndex}>
                  {Array(7).fill(null).map((_, dayIndex) => {
                    // we want to start on the Sunday that's 3 weeks before the current date.
                    const index = weekIndex * 7 + dayIndex;
                    const date = new Date();
                    date.setDate(date.getDate() - date.getDay() - 49 + index);
                    
                    const formattedDate = `${new Intl.DateTimeFormat('en-US', {weekday: 'short'}).format(date)} ${date.getMonth() + 1}/${date.getDate()}`;
                    
                    const linkDate = `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2,'0')}${date.getDate().toString().padStart(2,'0')}`;
                    
                    return (
                      <td key={dayIndex} className={`border-white border border-collapse align-top w-[14.2%] ${(date.getDate() === new Date().getDate() && date.getMonth() === new Date().getMonth()) && 'bg-appPurple/40'}`}>
                        <Link href={`nights/${linkDate}`} className={`flex flex-col items-center aspect-square p-[1cqw]`}>
                          <div className='w-full bg-secondary/40 rounded-md text-center'>
                            {formattedDate}
                          </div>
                          <div className='flex flex-grow flex-col w-full items-center justify-center text-[5cqw]'>
                            
                            {/* if there is a night for this date, show a smiley face */
                            nights.some(night => night.date === linkDate) && (
                              <>
                              {ratingIcons[nights.find(night => night.date === linkDate)?.rating as keyof typeof ratingIcons]}
                              </>
                            )}
                          </div>
                        </Link>
                      </td>);
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>
    </>
  );
}