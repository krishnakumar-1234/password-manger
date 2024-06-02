"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";


export default function Header() {
  return (
    <nav className="w-full h-[50px] bg-blue-500 p-5 flex items-center justify-between mb-20">
      <div className="logo text-2xl flex items-center">
        <span className="text-white">&lt;</span>
        <p className="text-white">Bo</p>
        <span className="text-black font-bold">at /&gt;</span>
      </div>
      <div className="w-fit p-2">
        <Link href="https://github.com/krishnakumar-1234/password-manger" target="_blank">
        <button className="w-[130px] h-[40px] flex items-center gap-2 font-bold p-3 bg-black text-white justify-center rounded-full hover:bg-transparent hover:border-2 border-black text-1xl">
            <Image className="GithubLogo" width={24} height={24} src="/github.svg" alt="icons" />
          Github
        </button>
        </Link>
      </div>
    </nav>
  );
}
