"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

type Props = {
    hoverMode?: boolean;
};

export default function QLVAnimation({ hoverMode = true }: Props) {
    const [hover, setHover] = useState(false);
    const [autoPlay, setAutoPlay] = useState(false);

    const parts = [
        { base: "Q", expand: "ueer" },
        { base: "L", expand: "ux" },
        { base: "V", expand: "is" },
    ];

    useEffect(() => {
        if (!hoverMode) {
            const timer = setTimeout(() => setAutoPlay(true), 750);
            return () => {
                clearTimeout(timer);
            };
        }
    }, [hoverMode]);

    const isActive = hoverMode ? hover : autoPlay;

    return (
        <div
            className="flex cursor-pointer select-none h-full w-full py-5"
            onMouseEnter={() => hoverMode && setHover(true)}
            onMouseLeave={() => hoverMode && setHover(false)}
        >
            {parts.map((part, index) => (
                <div key={index} className="flex">
                    <span>{part.base}</span>

                    <motion.span
                        initial={{ opacity: 0, x: -5, width: 0 }}
                        animate={{
                            opacity: isActive ? 1 : 0,
                            x: isActive ? 0 : -5,
                            width: isActive ? "auto" : 0,
                        }}
                        transition={{ duration: 0.15, delay: index * 0.1 }}
                        className="block"
                    >
                        {part.expand}
                    </motion.span>
                </div>
            ))}
        </div>
    );
}
