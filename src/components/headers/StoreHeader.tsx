import React from "react";
import Image from "next/image";
import SearchBar from "../SearchBar";

const navdata: readonly string[] = [
    "Home",
    "Explore"
];

type select = {
    onQ: boolean;
    selected: string;
    setSelected: (s: string) => void;
    query: string;
    setQuery: (query: string) => void;
    suggestions: string[];
    topSearch: boolean;
    setTopSearch: (t: boolean) => void;
};

const StoreHeader: React.FC<select> = ({ onQ, selected, setSelected, query, setQuery, suggestions, topSearch, setTopSearch }) => {
    return (
        <header className="bg-white px-4 py-1 sm:py-2 sm:shadow shadow-lg fixed sm:static z-50 sm:top-0 w-full flex gap-6 space-x-6 justify-start items-center">
            <div className="flex items-center space-x-4 md:space-x-16">
                <div className="font-bold flex items-center">
                    <Image
                        src="/logo.png"
                        alt="NavMart Logo"
                        width={40}
                        height={40}
                        className="mr-4"
                    />
                    <h1 className="hidden md:block">Navmart</h1>
                </div>

                <nav>
                    <ul className="flex items-center space-x-2">
                        {navdata.map((n, i) => (
                            <li
                                key={i}
                                onClick={() => {
                                    setQuery("");
                                    setSelected(n);
                                }}
                                className={`${selected === n ? "text-green-700 font-semibold border-b-3" : "text-gray-700"} font-medium hover:text-green-600 cursor-pointer p-2 md:p-4`}
                            >
                                {n}
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            <div className={`w-full cursor-pointer sm:hidden mr-auto`}>
                {!topSearch ? <Image
                    src="/icons/search.png"
                    width={30}
                    height={0}
                    alt="search_icon"
                    className="hover:bg-gray-100 float-right"
                    onClick={() => setTopSearch(!topSearch)}
                /> : (
                    <div className="flex items-center w-full h-1/12 bg-white fixed top-0 left-0">
                        <div className="sm:hidden w-full">
                            { topSearch && <SearchBar
                                topSearch={topSearch}
                                setTopSearch={setTopSearch}
                                query={query}
                                setQuery={setQuery}
                                suggestions={suggestions}
                            /> }
                        </div>
                        {/* <span className="hover:bg-gray-200 float-right font-bold px-2 rounded-full">&times;</span> */}
                    </div>
                )}
            </div>
            
            <div className="hidden sm:block w-full">
                {(onQ || selected === "Explore") ? <SearchBar
                    query={query}
                    setQuery={setQuery}
                    suggestions={suggestions}
                />:""}
            </div>
        </header>
    );
}

export default StoreHeader;