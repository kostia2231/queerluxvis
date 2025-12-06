import { useEffect, useState } from "react";
import { motion } from "motion/react";
import QLVAnimation from "./QLVanimation";
import GridElement from "./GridElement";

export default function Loader() {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: visible ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                style={{ pointerEvents: visible ? "auto" : "none" }}
                className="fixed inset-0 bg-white flex items-center justify-center z-[9999]"
            >
                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{
                        x: 0,
                        opacity: 1,
                    }}
                    transition={{ duration: 0.3 }}
                >
                    <QLVAnimation hoverMode={false} />
                </motion.div>
            </motion.div>
        </>
    );
}
