export default function Header({ toggleCartAction }: {
  toggleCartAction: () => void
}) {
  return (
    <>
      <div className="grid grid-cols-3 gap-5">
        <div className="py-5 border-b">
          <p>QueerLuxVis</p>
        </div>

        <div className="bg-gray-200 py-5">
          <p>Publishing, Institute, About</p>
        </div>

        <div className="grid grid-cols-2 justify-between items-center border-b">
          <div className="py-5">
            <p>DE</p>
          </div>
          <div onClick={() => toggleCartAction()} className="bg-gray-200 py-5 flex gap-5 items-center cursor-pointer">
            <p>Cart</p>
            <div className="bg-white h-8 w-8 rounded-full text-center justify-center flex items-center">
              0
            </div >
          </div>
        </div>
      </div>
    </>
  )
}
