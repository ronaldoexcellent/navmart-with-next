"use client";

import Image from "next/image";
import React, { useState } from "react";
import type { NextPage } from "next";
import type { Store } from "@/app/types/store";
import { categories } from "@/components/CategoryIcons";
import { Details } from "./StoreHome"; // Reusing the Details modal from StoreHome

interface StoreExploreProps {
  stores: Store[];
}

const StoreExplore: NextPage<StoreExploreProps> = ({ stores }) => {
  const arr: number[] = [];
  for (let i = 1; i < 8; i++) {
    arr.push(i);
  }

  const [view, setView] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const handleClose = () => setView(false);
  const handleStoreClick = (index: number) => {
    setSelectedIndex(index);
    setView(true);
  };

  return (
    <div className="xl:mx-20 md:mt-12 grid mt-24">
      <div className="grid gap-4 justify-items-center lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
        {arr.map((a, i) => (
          <Image
            key={i}
            alt="categories"
            src={`/categories/00${a}.png`}
            className="cursor-pointer rounded-3xl hover:border-3 hover:shadow-green-500 hover:shadow-lg hover:border-green-700 hover:opacity-80 hover:-translate-y-3 hover:translate-x-1 transition duration-300"
            width={300}
            height={0}
          />
        ))}
      </div>

      <div className="flex justify-center pt-12 mt-12">
        <button className="border-3 border-gray-500 rounded-xl rounded-t-3xl cursor-pointer hover:bg-green-700 hover:shadow-lg hover:shadow-amber-500 hover:border-green-700 hover:text-white transition duration-200 py-4 px-7">
          More
        </button>
      </div>

      <div>
        {categories.map((c) => (
          <div className="my-28" key={c.name}>
            <div className="flex gap-5">
              <h1 className="text-lg md:text-2xl font-bold font-sans">{c.name}</h1>
              <button className="cursor-pointer rounded-full hover:outline-3 hover:outline-gray-500 hover:font-bold hover:text-white hidden md:block">
                <Image
                  src="/icons/caret_right.png"
                  alt="caret_right"
                  width={40}
                  height={40}
                />
              </button>
            </div>
            <hr className="border-1 my-1 border-green-700" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-6">
              {stores.map((store, index) => (
                <div
                  key={index}
                  className="overflow-hidden cursor-pointer border-1 border-gray-200 rounded-2xl hover:shadow-xl transition"
                  onClick={() => handleStoreClick(index)}
                >
                  <Image
                    src={store.image}
                    alt={store.name}
                    className="w-full h-48 object-cover rounded-2xl"
                    width={400}
                    height={300}
                  />
                  <div className="p-4">
                    <h3 className="md:text-xl text-lg font-semibold">{store.name}</h3>
                    <h4 className="text-sm">{store.id}</h4>
                  </div>
                </div>
              ))}
              {view && (
                <Details
                  store={stores[selectedIndex]}
                  view={view}
                  onClose={handleClose}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoreExplore;
