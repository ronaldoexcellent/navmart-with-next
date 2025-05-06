import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";

type SearchBarProps = {
  topSearch?: boolean;
  setTopSearch?: (sts: boolean) => void;
  query: string;
  setQuery: (query: string) => void;
  suggestions: string[];
};

const SearchBar: React.FC<SearchBarProps> = ({ topSearch, setTopSearch, query, setQuery, suggestions }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredSuggestions = suggestions.filter((s) =>
    s.toLowerCase().includes(query.toLowerCase())
  );

  const wrapperRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Hide suggestions on click outside
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value);

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="w-full relative float-left" ref={wrapperRef}>
      <div className="flex bg-gray-100 p-1 rounded-3xl">
        { (!topSearch) ? 
          <Image
            src="/icons/search.png"
            alt="s-icon"
            width={40}
            height={30}
            className="cursor-text"
            onClick={() => textRef.current?.focus()}
          /> : <span className="hover:bg-gray-200 float-right font-bold px-2 rounded-full" onClick={() => {
            setQuery("");
            setTopSearch?.(false);
          }}>&times;</span>
        }
        <input
          type="search"
          placeholder="Search for a store or item"
          value={query}
          onChange={handleChange}
          ref={textRef}
          onFocus={() => setShowSuggestions(true)}
          className="w-full md:p-3 focus:outline-none "
        />
      </div>

      {showSuggestions && filteredSuggestions.length > 0 && (
        <ul className="absolute z-10 w-full md:w-9/12 bg-white border border-gray-300 rounded max-h-48 overflow-y-auto">
          <li className="p-3 mx-5"> Suggested search </li>
          {filteredSuggestions.map((sugg, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(sugg)}
              className="p-3 flex items-center hover:bg-blue-100 cursor-pointer"
            >
              <Image
                className="mx-4"
                src="/icons/search.png"
                width={30}
                height={30}
                alt="search_icon"
              />
              {sugg}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;