"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import type { Store } from "@/app/types/store";
import Loading from "../app/loading";

export interface DetailsProps {
  store: Store;
  view: boolean;
  onClose: () => void;
}

interface StoreHomeProps {
  stores: Store[];
}

const StoreHome: React.FC<StoreHomeProps> = ({ stores }) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [view, setView] = useState<boolean>(false);
  const [showNoStoresMsg, setShowNoStoresMsg] = useState<boolean>(false);

  // For demonstration, if stores are empty, toggle a no-stores message after 3 seconds.
  useEffect(() => {
    if (stores.length === 0) {
      const timer = setTimeout(() => {
        setShowNoStoresMsg(true);
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      setShowNoStoresMsg(false);
    }
  }, [stores]);

  if (stores.length === 0) {
    return showNoStoresMsg ? (
      <div className="mt-6 pt-6">
        <p className="text-center text-xl text-green-600">No stores found.</p>
      </div>
    ) : (
      <Loading />
    );
  }

  const handleStoreClick = (index: number) => {
    setSelectedIndex(index);
    setView(true);
  };

  const handleClose = () => setView(false);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-6 xl:mx-20 mt-20">
      {stores.map((store, index) => (
        <div
          key={`first-${index}`}
          className="rounded overflow-hidden cursor-pointer hover:shadow-xl transition border-1 border-gray-200"
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
            <h3 className="text-xl font-semibold">{store.name}</h3>
            <h4 className="text-sm">{store.id}</h4>
          </div>
        </div>
      ))}

      {stores.map((store, index) => (
        <div
          key={`second-${index}`}
          className="rounded overflow-hidden cursor-pointer hover:shadow-xl transition"
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
            <h3 className="text-xl font-semibold">{store.name}</h3>
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
  );
};

export const Details: React.FC<DetailsProps> = ({ store, view, onClose }) => {
  return (
    <div
      className={`fixed inset-0 ${
        view ? "flex" : "hidden"
      } justify-center items-center bg-gray-600/[.6]`}
    >
      <div className="bg-white sm:w-96 w-11/12 p-6 rounded shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-xl font-bold cursor-pointer text-gray-500 hover:text-gray-800"
        >
          &times;
        </button>
        <h3 className="text-2xl mb-4">Store Details</h3>
        <Image
          src={store.image}
          alt={store.name}
          className="w-full h-48 object-cover mb-4"
          width={4000}
          height={300}
          quality={100}
        />
        <h2 className="text-xl font-semibold">{store.name}</h2>
        <p className="mb-4">ID: {store.id}</p>
        <h2 className="text-lg font-semibold">Tags</h2>
        <div className="flex flex-wrap gap-3 p-2 mb-4">
          {store.tags &&
            store.tags.map((tag, index) => (
              <span key={index} className="bg-gray-200 px-2 py-1 rounded">
                {tag}
              </span>
            ))}
        </div>
        <h2 className="text-lg font-semibold mb-2">Directions</h2>
        <button className="bg-emerald-900 text-white font-semibold px-3 py-2 rounded-xl">
          Directions
        </button>
      </div>
    </div>
  );
};

export default StoreHome;