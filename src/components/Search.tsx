import { IoSearch } from "react-icons/io5";

const Search = () => {
  return (
    <form className=" relative flex justify-center items-center">
      <input
        type="text"
        id="search"
        name="name"
        placeholder="Search for a city ..."
        className="w-full outline-none bg-transparent border p-1.5 rounded focus:border-blue-500 mr-0.5"
      />
      <button
        type="button"
        title="Search"
        className="flex-shrink-0 text-blue-600 cursor-pointer hover:bg-blue-300 border border-blue-600  p-1.5 rounded-md"
      >
        <IoSearch className="text-2xl" />
      </button>
    </form>
  );
};

export default Search;
