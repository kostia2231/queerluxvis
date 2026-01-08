export default function GridElement() {
    return (
        <>
            <div className="fixed min-h-screen left-5 right-5 grid-wrapper z-[-99] pointer-events-none">
                <div className="border max-[768px]:border-r-0"></div>
                <div className=""></div>
                <div className="border max-[768px]:border-0"></div>
                <div className=""></div>
                <div className="border max-[768px]:border-l-0"></div>
            </div>
        </>
    );
}
