import React from 'react';
import { IoSettingsOutline } from "react-icons/io5";
import Link from 'next/link';

const Navbar = () => {
  return (
    <main className="bg-purple-500 h-20">
      <ul className="flex w-[90vw] m-auto justify-between">
        <div className="py-5 px-0">
          <Link href="/" className="text-white font-bold font-serif text-[2vw]">
            Blogger
          </Link>
        </div>
        <Link href="/setting" className="text-white font-bold font-serif text-[2vw] py-6">
          <IoSettingsOutline />
        </Link>
      </ul>
    </main>
  );
};

export default Navbar;
