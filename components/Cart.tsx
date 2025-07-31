'use client'

export default function Cart({ toggleCartAction }: {
  toggleCartAction: () => void
}) {
  return (
    <>
      <div id="cart" className="min-h-screen w-1/2 bg-white fixed right-0 border-l">
        <div className="flex justify-between border-b">
          <div></div>
          <div className="p-5">
            <p onClick={() => toggleCartAction()} className="cursor-pointer">Close</p>
          </div>
        </div>
        <div className="p-5">
          <p>Empty...</p>
        </div>
      </div>
    </>
  )
}
