import { useRef } from "react";
import { useRouter } from "next/navigation";
import useCartStore from "../store/store";
import QLVAnimation from "./QLVanimation";
import Link from "next/link";

export default function Header() {
    const headerRef = useRef<HTMLDivElement>(null);
    const { openCart } = useCartStore();
    const count = useCartStore((state) => state.getCartCount());
    const router = useRouter();

    return (
        <>
            <div
                className="grid-wrapper sticky top-0 z-3 transition-all duration-400"
                id="header"
                ref={headerRef}
            >
                <div
                    className="transition-colors cursor-pointer border-b bg-white border-x hover:bg-gray-100"
                    onClick={() => router.push("/")}
                >
                    <QLVAnimation />
                    {/*<p className="">Q.L.V</p>*/}
                    {/*<p className="">Queer Lux Vis</p>*/}
                </div>

                <div className="border-b bg-white max-[450px]:hidden"></div>

                <div className="max-[450px]:hidden">
                    <div className="transition-colors border-x cursor-pointer bg-white hover:bg-[#FF59A8] hover:text-white border-b">
                        <Link
                            href={"/donation"}
                            className="w-full h-full block py-5"
                        >
                            Support us!
                        </Link>
                    </div>
                </div>

                <div className="bg-white border-b max-[450px]:hidden"></div>

                <div className="justify-between items-center">
                    <div
                        onClick={() => openCart()}
                        className="transition-colors bg-gray-100 py-5 flex gap-2.5 items-center cursor-pointer hover:bg-[#FF59A8] hover:text-white border-b border-l"
                    >
                        <p>Cart</p>
                        {count > 0 && <p>— {count}</p>}
                        {/*<div className={`${count > 0 ? "bg-[#FF59A8]" : "bg-white"} h-8 w-8 text-center justify-center flex items-center text-black`}>
              {count}
            </div >*/}
                    </div>
                </div>
            </div>
        </>
    );
}
