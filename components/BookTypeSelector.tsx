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
        className={`py-2 px-5 transition cursor-pointer hover:text-black
          ${selected === "printed" ? "bg-white text-black font-bold" : "text-black/20"}`}
      >
        Print
      </button>
      <button
        onClick={() => handleSelect("ebook")}
        className={`py-2 px-5 transition cursor-pointer hover:text-black
          ${selected === "ebook" ? "bg-white text-black font-bold" : "text-black/20"}`}
      >
        E-Book
      </button>
    </div>
  )
}
