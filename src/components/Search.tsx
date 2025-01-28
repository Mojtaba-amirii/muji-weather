import { cn } from "@/utils/cn";
import { ChangeEventHandler, FormEventHandler } from "react";
import { IoSearch } from "react-icons/io5";

type SearchProps = {
  className?: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement> | undefined;
  onSubmit: FormEventHandler<HTMLFormElement> | undefined;
};

const Search = (props: SearchProps) => {
  const { value, onChange, onSubmit, className } = props;

  return (
    <form
      onSubmit={onSubmit}
      className={cn(
        " relative flex justify-center items-center w-full",
        className
      )}
    >
      <input
        type="text"
        id="search"
        name="search"
        placeholder="Search for a city ..."
        className="w-full outline-hidden bg-transparent border p-1.5 rounded-sm focus:border-blue-500 mr-0.5"
        value={value}
        onChange={onChange}
        autoComplete="off"
      />

      <button
        type="submit"
        title="Search"
        className="shrink-0 text-blue-600 cursor-pointer hover:bg-blue-300 border border-blue-600 transition-colors  p-1.5 rounded-md"
      >
        <IoSearch className="text-2xl" />
      </button>
    </form>
  );
};

export default Search;
