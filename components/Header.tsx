type HeaderProps = {
  toggleCartAction: () => void
}

export default function Header({ toggleCartAction }: HeaderProps) {
  return (
    <>
      <div className="grid-wrapper sticky top-0 z-3">
        <div className="py-5 border-b border-r bg-white border-l">
          <p>QueerLuxVis</p>
        </div>

        <div className="border-b bg-white border-r"></div>

        <div className="bg-gray-200 py-5">
          <p>Publishing, Institute, About</p>
        </div>

        <div className="border-r bg-white border-b"></div>

        <div className="grid grid-cols-2 justify-between items-center border-b">
          <div className="py-5 bg-white">
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
