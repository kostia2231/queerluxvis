'use client'

import { useState } from "react"

interface BookTypeSelectorProps {
  onChange?: (value: "ebook" | "printed") => void
}

export default function BookTypeSelector({ onChange }: BookTypeSelectorProps) {
  const [selected, setSelected] = useState<"ebook" | "printed">("printed")

  const handleSelect = (value: "ebook" | "printed") => {
    setSelected(value)
    onChange?.(value)
  }

  return (
    <div className="bg-gray-100 w-fit flex border text-[18px]">
      <button
        onClick={() => handleSelect("printed")}
        className={`py-2 pl-2 pr-5 transition cursor-pointer hover:text-black flex gap-2
          ${selected === "printed" ? "bg-gray-100 text-black" : "text-black/20 bg-white hover:text-black"}`}
      >
        <div className={`w-2.5 h-2.5 rounded-full ${selected === "printed" ? "bg-black" : "bg-gray-100"}`}></div> Print
      </button>
      <button
        onClick={() => handleSelect("ebook")}
        className={`py-2 pl-2 pr-5 transition cursor-pointer hover:text-black flex gap-2
          ${selected === "ebook" ? "bg-gray-100 text-black" : "text-black/20 bg-white hover:text-black"}`}
      >
        <div className={`w-2.5 h-2.5 rounded-full ${selected === "ebook" ? "bg-black" : "bg-gray-100"}`}></div>  E-Book
      </button>
    </div>
  )
}
