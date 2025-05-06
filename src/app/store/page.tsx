"use client";

import { useState, useEffect, useMemo } from "react";
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

const suggestions: string[] = [
  "Gentle Cleanser",
  "Hoodies",
  "Appliances",
  "Microwaves",
  "Indoor plants",
  "Waterproof Jackets",
  "Rain Coat",
];

export const dynamicParams: boolean = true;

async function fetchStores(): Promise<Store[]> {
  // initiate delay for loading
  await new Promise(resolve => setTimeout(resolve, 3000));

  const res = await fetch("http://localhost:4000/stores", {
    next: {
      revalidate: 0, // This opts out of caching if needed.
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch store data");
  }

  return res.json();
}

const StorePage: NextPage = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [onQ, setQ] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("Furniture");
  const [selected, setSelected] = useState<string>('Home');
  const [topSearch, setTopSearch] = useState<boolean>(false);

  useEffect(() => {
    setQ(searchQuery.length < 1? false:true);
    fetchStores()
      .then((data) => setStores(data))
      .catch((error) => console.error(error));
  }, [searchQuery]);

  // Filter stores based on the search query.
  const filteredStores = useMemo(() => {
    return stores.filter((store) => {
      const matchesQuery =
        store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        store.id.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesQuery;
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
        { (!onQ) && (selected === "Home") ? <Hero />:"" }
        <main className="px-4 py-6 relative">
            { (!onQ) && (selected === "Home") ? <div className={`sm:w-4/5 md:w-3/5 shadow w-full mx-auto hidden sm:flex justify-center items-center font-bold p-2`}>
                <SearchBar
                    query={searchQuery}
                    setQuery={setSearchQuery}
                    suggestions={suggestions}
                />
            </div> : "" }
            { (!onQ) && (selected === "Home") ?
                <CategoryIcons
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
              /> : ""
            }
            { onQ && (selected === "Home") ? <h1 className="text-xl font-semibold mt-20 sm:mt-8"> Results </h1> :""}
            {selected === "Home"?
                <StoreHome stores={filteredStores} /> : 
                <StoreExplore stores={filteredStores} />
            }
        </main>
        <Footer />
    </>
  );
};

export default StorePage;