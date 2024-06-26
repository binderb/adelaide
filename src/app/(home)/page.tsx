import Nav from "@/app/(global components)/Nav";
import Link from "next/link";
import { BsBalloonHeart, BsFillBalloonHeartFill, BsMoonStarsFill, BsSun } from "react-icons/bs";
import { FaRegSun, FaSun } from "react-icons/fa";
import { FaPersonBreastfeeding } from "react-icons/fa6";
import { GiMedicines } from "react-icons/gi";
import { LuShovel } from "react-icons/lu";
import { TbShovel } from "react-icons/tb";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start">
      <Nav />
      <section className='grid grid-cols-2 gap-4 px-[10%] py-8 w-full'>
        <Link href='/feed' className='bg-appRed rounded-md p-4 text-white w-full aspect-square flex justify-center items-center text-center flex-col'><FaPersonBreastfeeding className='text-[10cqw]' /><div className='text-[5cqw] font-bold'>Feed</div></Link>
        <Link href='/diapers' className='bg-appOrange rounded-md p-4 text-white w-full aspect-square flex justify-center items-center text-center flex-col'><LuShovel className='text-[10cqw]' /><div className='text-[5cqw] font-bold'>Diapers</div></Link>
        <Link href='/meds' className='bg-appGreen rounded-md p-4 text-white w-full aspect-square flex justify-center items-center text-center flex-col'><GiMedicines className='text-[10cqw]' /><div className='text-[5cqw] font-bold'>Meds</div></Link>
        <Link href='/nights' className='bg-appPurple rounded-md p-4 text-white w-full aspect-square flex justify-center items-center text-center flex-col'><BsMoonStarsFill className='text-[10cqw]' /><div className='text-[5cqw] font-bold'>Nights</div></Link>
        {/* <Link href='/awake' className='bg-appYellow rounded-md p-4 text-white w-full aspect-square flex justify-center items-center text-center flex-col'><FaSun className='text-[10cqw]' /><div className='text-[5cqw] font-bold'>Awake</div></Link> */}
        <Link href='/love' className='bg-appBlue rounded-md p-4 text-white w-full aspect-square flex justify-center items-center text-center flex-col'><BsBalloonHeart className='text-[10cqw]' /><div className='text-[5cqw] font-bold'>Love</div></Link>
      </section>
    </main>
  );
}
