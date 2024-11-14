import React, { useState } from "react";
import { Input } from "@nextui-org/react";
import { SearchIcon } from "./SearchIcon";

const SearchBar = ({ navigate, searchTerm }) => {
  const [query, setQuery] = useState(searchTerm); // Initialize search bar with searchTerm from URL

  const handleSearch = (e) => {
    e.preventDefault();
    if (query) {
      navigate(`/search/${query}`); // Navigate to the search route with the query in the URL
    } else {
      navigate("/"); // Go back to the home page if query is empty
    }
  };

  return (
    <div className="mb-4">
      <form onSubmit={handleSearch}>
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)} // Update the query state when the input changes
          placeholder="Type to search..."
          type="search"
          size="sm"
          classNames={{
            base: "max-w-full sm:max-w-[10rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          startContent={<SearchIcon size={18} />} // Add a search icon inside the input
        />
      </form>
    </div>
  );
};

export default SearchBar;
