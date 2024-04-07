'use client';
import logo from '@@/public/logo.png'
import { signOut } from 'next-auth/react';
import Image from 'next/image';

export default function Nav() {
  return (
    <>
      <nav className="flex items-center justify-between flex-wrap w-full bg-black border-b-secondary border-b-[1px] py-4 px-6">
        <Image src={logo} alt="Logo" width={25} height={25} />
        <div>
          <button className="text-primary hover:text-white" onClick={()=>signOut()}>Log Out</button>
        </div>
      </nav>
    </>
  )
}