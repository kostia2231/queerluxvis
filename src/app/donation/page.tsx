"use client";

import { useState, useRef } from "react";
import { createDonationCheckout } from "../../../lib/donation";

export default function Donation() {
    const [amount, setAmount] = useState<number>(5);
    const [loading, setLoading] = useState<boolean>(false);
    const donationRef = useRef<HTMLDivElement>(null);

    const handleDonate = async () => {
        if (amount <= 0) return;
        setLoading(true);
        try {
            const checkoutUrl = await createDonationCheckout(amount);
            window.location.href = checkoutUrl;
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDonatePayPal = () => {
        window.location.href =
            "https://www.paypal.com/donate/?hosted_button_id=DWRD7U5BFJNNU";
    };

    return (
        <>
            <div>
                <div
                    className="grid-wrapper-m sticky top-[77px] z-1 w-full"
                    ref={donationRef}
                >
                    <div className="bg-gray-100">
                        <p className="py-5 pr-5">
                            {/*⁂ <br />*/}
                            {/*Self-publishing is a costly business, therefore every donation is very much appreciated! ;-)*/}
                            QueerLuxVis{" "}
                            <span className="opacity-30">
                                (Queerluxvis e.V.)
                            </span>{" "}
                            is a newly established nonprofit association based
                            in Berlin, Germany, dedicated to the reading,
                            writing, and publishing of LGBTQ+ books and
                            literature. The association promotes its mission by
                            researching LGBTQ+ literary history, preserving
                            LGBTQ+ literary heritage, supporting and mentoring
                            authors, organizing cultural and educational events,
                            advocating for representation, and publishing
                            LGBTQ-themed works.
                            <br /> <br /> Its aim is to help create a more
                            diverse and inclusive literary and publishing world.
                            <br /> <br /> To achieve our mission and become
                            fully operational, we rely on donations and grants
                            that support our programs and initiatives.
                        </p>
                    </div>

                    <div className="max-[768px]:hidden"></div>

                    <div className="flex flex-col">
                        <div className="flex flex-col pb-0 w-full">
                            <div className="flex flex-col justify-center items-center">
                                <p className="text-left w-full py-5 pr-5 bg-gray-100">
                                    Set your desired donation amount here &lt;3
                                </p>
                                <input
                                    id="amount"
                                    type="number"
                                    min={1}
                                    value={amount}
                                    onChange={(e) =>
                                        setAmount(Number(e.target.value))
                                    }
                                    className="py-5 w-full focus:outline-none focus:ring-0 bg-white min-[768px]:border border-y-0 "
                                    placeholder=" "
                                />
                            </div>

                            <button
                                onClick={handleDonate}
                                disabled={loading}
                                className="text-left cursor-pointer bg-black text-white py-5  hover:bg-[#FF59A8] hover:text-white disabled:opacity-50"
                            >
                                {loading
                                    ? "Processing..."
                                    : `Donate €${amount}`}
                            </button>
                        </div>
                        <div className="pt-5"></div>
                        <button
                            onClick={handleDonatePayPal}
                            className="text-left cursor-pointer bg-black text-white py-5  hover:bg-[#FF59A8] hover:text-white disabled:opacity-50"
                        >
                            Donate via PayPal
                        </button>

                        <div className="pt-5">
                            <p className="py-5 pr-5 bg-gray-100">
                                Bank details
                                <span className="opacity-30"> (SEPA)</span>:
                                <br /> Queerluxvis e.V. <br />
                                DE21 4306 0967 1350 5489 00 <br /> GENODEM1GLS
                                GLS Gemeinschaftsbank eG
                            </p>
                        </div>
                    </div>
                    <div className="max-[768px]:hidden"></div>
                    <div className="max-[768px]:hidden"></div>
                </div>
            </div>
        </>
    );
}
