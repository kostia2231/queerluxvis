'use client'

import { useState } from "react"
import { motion } from "framer-motion";

export default function BookTypeSelector() {
  const [selected, setSelected] = useState<"ebook" | "printed">("ebook");

  return (
    <>
      <div className="bg-gray-100 w-fit rounded-full flex gap-2 border text-[18px]">

        <button
          onClick={() => setSelected("ebook")}
          className={`p-2 rounded-full transition cursor-pointer
               ${selected === "ebook" ? "bg-white text-black" : "text-black/20"}`}
        >
          Print
        </button>
        <button
          onClick={() => setSelected("printed")}
          className={`p-2 rounded-full transition cursor-pointer
               ${selected === "printed" ? "bg-white text-black" : "text-gray-500"}`}
        >
          E-Book
        </button>
      </div>
    </>
  )
}
