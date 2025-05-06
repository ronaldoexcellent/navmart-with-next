"use client";

import { useState, useMemo, useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import StoreHeader from "../../components/headers/StoreHeader";
import SearchBar from "../../components/SearchBar";
import CategoryIcons from "../../components/CategoryIcons";
import StoreHome from "../../components/StoreHome";
import StoreExplore from "../../components/StoreExplore";
import type { Store } from "../types/store";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import storeData from "@/data/stores.json";

// Define the shape of the imported JSON data
interface StoreDataProps {
  stores: Store[];
}

const suggestions: string[] = [
  "Gentle Cleanser",
  "Hoodies",
  "Appliances",
  "Microwaves",
  "Indoor plants",
  "Waterproof Jackets",
  "Rain Coat",
];

const StorePage: NextPage = () => {
  // Import stores from JSON (synchronously)
  const { stores } = storeData as StoreDataProps;

  // Local state
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [onQ, setQ] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("Furniture");
  const [selected, setSelected] = useState<string>("Home");
  const [topSearch, setTopSearch] = useState<boolean>(false);

  // Update the search flag when query changes
  useEffect(() => setQ(searchQuery.trim().length > 0), [searchQuery]);

  // Filter the stores based on the search query
  const filteredStores = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return stores.filter((store) => {
      return (
        store.name.toLowerCase().includes(query) ||
        store.id.toLowerCase().includes(query)
      );
    });
  }, [stores, searchQuery]);

  return (
    <>
      <Head>
        <title>Navmart - Discover Stores</title>
        <meta name="description" content="Navigate stores on Navmart" />
      </Head>

      <StoreHeader
        onQ={onQ}
        selected={selected}
        setSelected={setSelected}
        query={searchQuery}
        setQuery={setSearchQuery}
        suggestions={suggestions}
        topSearch={topSearch}
        setTopSearch={setTopSearch}
      />

      {(!onQ && selected === "Home") && <Hero />}

      <main className="px-4 py-6 relative">
        {(!onQ && selected === "Home") && (
          <div className="sm:w-4/5 md:w-3/5 shadow w-full mx-auto hidden sm:flex justify-center items-center font-bold p-2">
            <SearchBar
              query={searchQuery}
              setQuery={setSearchQuery}
              suggestions={suggestions}
            />
          </div>
        )}
        {(!onQ && selected === "Home") && (
          <CategoryIcons
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        )}
        {(onQ && selected === "Home") && (
          <h1 className="text-xl font-semibold mt-20 sm:mt-8">Results</h1>
        )}
        {/* Render Home if selected is "Home"; otherwise render Explore */}
        {selected === "Home" ? (
          <StoreHome stores={filteredStores} />
        ) : (
          <StoreExplore stores={filteredStores} />
        )}
      </main>

      <Footer />
    </>
  );
};

export default StorePage;