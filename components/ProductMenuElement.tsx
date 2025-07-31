import PlusIcon from "./PlusIcon"

export default function ProductMenuElement() {
  return (
    <>
      <div className="grid-wrapper pt-15">
        <div>
          <div className="h-[400px] w-full bg-gray-200"></div>
          <div className="flex justify-between pt-5 pr-5">
            <div>
              <p>Book Title Here</p>
              <p>— €50.0</p>
            </div>
            <PlusIcon />
          </div>
        </div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </>
  )
}
