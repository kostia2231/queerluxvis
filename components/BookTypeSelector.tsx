'use client'

import { useState } from "react"

interface BookTypeSelectorProps {
  onChange?: (value: "print" | "digital") => void
}

export default function BookTypeSelector({ onChange }: BookTypeSelectorProps) {
  const [selected, setSelected] = useState<"print" | "digital">("print")

  const handleSelect = (value: "print" | "digital") => {
    setSelected(value)
    onChange?.(value)
  }

  return (
    <div className="bg-gray-100 border text-[18px] w-full grid grid-cols-2">
      <button
        onClick={() => handleSelect("print")}
        className={`items-center py-2.5 pr-5 transition cursor-pointer hover:text-black flex gap-2
          ${selected === "print" ? "bg-gray-100 text-black" : "text-black/20 bg-white hover:text-black"}`}
      >
        <div className={`w-2.5 h-2.5 rounded-full ${selected === "print" ? "bg-black" : "bg-gray-100"}`}></div>
        <p>Print</p>
      </button>
      <button
        onClick={() => handleSelect("digital")}
        className={`items-center py-2.5 pr-5 transition cursor-pointer hover:text-black flex gap-2
          ${selected === "digital" ? "bg-gray-100 text-black" : "text-black/20 bg-white hover:text-black"}`}
      >
        <div className={`w-2.5 h-2.5 rounded-full ${selected === "digital" ? "bg-black" : "bg-gray-100"}`}></div>
        <p>E-Book</p>
      </button>
    </div>
  )
}
