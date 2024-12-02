import { MdMyLocation, MdOutlineLocationCity, MdWbSunny } from "react-icons/md";
import Search from "../Search";

const Header = () => {
  return (
    <header className=" sticky top-0 left-0 z-10 bg-white shadow-sm">
      <nav className=" container mx-auto flex justify-between items-center ">
        <section className="flex flex-row items-center">
          <h1 className="text-xl font-bold text-gray-800 p-4">Weather</h1>
          <MdWbSunny className="text-4xl text-yellow-500" />
        </section>

        <section className="flex items-center w-fit">
          <MdMyLocation className="text-3xl text-gray-500 cursor-pointer mr-6 hover:text-gray-700" />
          <MdOutlineLocationCity className="text-3xl text-gray-500 cursor-pointer mr-2" />
          <span className="text-blue-300 mr-6 text-sm">Current City</span>

          <Search />
        </section>
      </nav>
    </header>
  );
};

export default Header;
