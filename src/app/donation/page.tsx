'use client'

import { useState, useRef } from "react"
import { createDonationCheckout } from "../../../lib/donation"

export default function Donation() {

  const [amount, setAmount] = useState<number>(5)
  const [loading, setLoading] = useState<boolean>(false)
  const donationRef = useRef<HTMLDivElement>(null)

  const handleDonate = async () => {
    if (amount <= 0) return
    setLoading(true)
    try {
      const checkoutUrl = await createDonationCheckout(amount)
      window.location.href = checkoutUrl
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div>

        <div
          className="grid-wrapper sticky top-[77px] z-1 w-full"
          ref={donationRef}
        >
          <div className="bg-gray-100">
            <p className="text-black/30 py-5">
              ⁂ <br />
              Self-publishing is a costly business, therefore every donation is very much appreciated! ;-)
            </p>
          </div>

          <div></div>

          <div className="flex flex-col">
            <div className="flex flex-col pb-0 w-full">
              <div className="flex flex-col justify-center items-center">
                <p className="text-left w-full py-5 bg-gray-100">Set your desired donation amount down here &lt;3</p>
                <input
                  type="number"
                  min={1}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="py-5 w-full focus:outline-none focus:ring-0 bg-white border border-y-0 "
                  placeholder=" "
                />
              </div>

              <button
                onClick={handleDonate}
                disabled={loading}
                className="text-left cursor-pointer bg-black text-white py-5  hover:bg-[#FF59A8] hover:text-white transition-colors disabled:opacity-50"
              >
                {loading ? "Processing..." : `Donate €${amount}`}
              </button>
            </div>
          </div>
          <div></div>
          <div></div>
        </div>
      </div >
    </>
  )
}
