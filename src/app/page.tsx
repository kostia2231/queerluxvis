import ProductMenuElement from "../../components/ProductMenuElement";

export default async function Home() {

  return (
    <>
      <div className="pt-5">
        <div className="bg-gray-100 border p-5 border-t-0 pl-0">
          <p className="opacity">
            Our publishing is a space of visibility, dialogue, and celebration of diversity.           We explore and highlight queer culture, bringing together media, art, and activism in one flow.
            <span className="opacity-30 hover:opacity-100 hover:text-[#FF59A8] cursor-pointer"> Discover More</span>
          </p>
        </div>
      </div>
      <div>
        <ProductMenuElement />
      </div>
    </>
  );
}
