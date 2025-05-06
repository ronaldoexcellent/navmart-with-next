import Image from "next/image";
import React from "react";

export type Category = {
  name: string;
  icon: string;
};

type CategoryIconsProps = {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
};

export const categories: Category[] = [
  { name: "Electronics", icon: "electronics" },
  { name: "Furniture", icon: "furniture" },
  { name: "Health & Beauty", icon: "health_and_beauty" },
  { name: "Baby Products", icon: "baby_products" },
  { name: "Supermarket", icon: "supermarket" },
  { name: "Interiors", icon: "interiors" },
];

const CategoryIcons: React.FC<CategoryIconsProps> = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div className={`flex md:flex-cols-${categories.length + 1} justify-between fixed md:static left-0 bottom-0 md:mt-16 sm:py-2 px-4 md:mx-auto md:max-w-6xl md:py-4 w-full bg-white`}>
      {categories.map((category) => (
        <div
          key={category.name}
          onClick={() => onSelectCategory(category.name)}
          className={`flex flex-col lg:flex-row space-x-2 items-center justify-center cursor-pointer font-bold p-2 sm:p-0 md:hover:font-normal ${
            selectedCategory === category.name ? "border-b-3 border-b-green-600 bg-green-600 sm:bg-white" : ""
          }`}
        >
          <Image
            alt="category_icons"
            src={`/icons/${category.icon}.png`}
            width={30}
            height={30}
          />
          <div className="text-xs mt-1 text-center hidden sm:block">{category.name}</div>
        </div>
      ))}
      
      <button className="cursor-pointer rounded-full hover:outline-3 hover:outline-gray-500 hover:font-bold hover:text-white hidden md:block">
        <Image
          src="/icons/caret_right.png"
          alt="caret_right"
          width={40}
          height={40}
        />
      </button>

      <button
        className="border-2 border-gray-400 p-2 rounded-lg transition duration-200 cursor-pointer hover:bg-gray-800 hover:font-semibold hover:text-white hidden md:block"
        onClick={() => {
          // Optionally trigger additional filtering options here
        }}
      >
        <i className="fas fa-filter"></i> Filter
      </button>
    </div>
  );
};

export default CategoryIcons;