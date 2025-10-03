'use client'

import { useState } from "react"

export default function BookTypeSelector() {
  const [selected, setSelected] = useState<"ebook" | "printed">("ebook");

  return (
    <>
      <div className="bg-gray-100 w-fit flex border text-[18px]">

        <button
          onClick={() => setSelected("ebook")}
          className={`py-2 px-5 transition cursor-pointer hover:text-black
               ${selected === "ebook" ? "bg-white text-black" : "text-black/20"}`}
        >
          Print
        </button>
        <button
          onClick={() => setSelected("printed")}
          className={`py-2 px-5 transition cursor-pointer hover:text-black
               ${selected === "printed" ? "bg-white text-black" : "text-black/20"}`}
        >
          E-Book
        </button>
      </div>
    </>
  )
}
