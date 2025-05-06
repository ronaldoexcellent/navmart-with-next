import React from "react";
import Image from "next/image";
import Link from "next/link";

const DashboardHeader: React.FC = () => {
  return (  
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-16">
          <Image
            src="/logo.png"
            alt="NavMart Logo"
            width={40}
            height={40}
            className="mr-4"
          />
          <h1>Navmart</h1>
          <nav>
            <ul className="flex items-center space-x-6">
              <li className="p-2 md:p-4 text-green-700 flex gap-2 items-center font-semibold border-b-3 cursor-pointer">
                <Image
                  width={0}
                  height={0}
                  src="/icons/overview.png"
                  alt="overview"
                  className="w-5 h-5"
                />
                <span>Overview</span>
              </li>
              <li className="p-2 md:p-4 text-gray-700 flex gap-1 items-center font-medium hover:text-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 576 512">
                  <path d="M547.6 103.8L490.3 13.1C485.2 5 476.1 0 466.4 0L109.6 0C99.9 0 90.8 5 85.7 13.1L28.3 103.8c-29.6 46.8-3.4 111.9 51.9 119.4c4 .5 8.1 .8 12.1 .8c26.1 0 49.3-11.4 65.2-29c15.9 17.6 39.1 29 65.2 29c26.1 0 49.3-11.4 65.2-29c15.9 17.6 39.1 29 65.2 29c26.2 0 49.3-11.4 65.2-29c16 17.6 39.1 29 65.2 29c4.1 0 8.1-.3 12.1-.8c55.5-7.4 81.8-72.5 52.1-119.4zM499.7 254.9c0 0 0 0-.1 0c-5.3 .7-10.7 1.1-16.2 1.1c-12.4 0-24.3-1.9-35.4-5.3L448 384l-320 0 0-133.4c-11.2 3.5-23.2 5.4-35.6 5.4c-5.5 0-11-.4-16.3-1.1l-.1 0c-4.1-.6-8.1-1.3-12-2.3L64 384l0 64c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-64 0-131.4c-4 1-8 1.8-12.3 2.3z"/>
                </svg>
                <Link href="/store">
                  Store
                </Link>
              </li>
              <li className="p-2 md:p-4 text-gray-700 flex gap-1 items-center font-medium hover:text-green-600 cursor-pointer">
                <Image
                  width={0}
                  height={0}
                  src="/icons/settings.png"
                  alt="settings"
                  className="w-5 h-5"
                />
                <span>Settings</span>
              </li>
            </ul>
          </nav>
        </div>
        <div className="relative bg-white rounded-full items-center justify-center grid cursor-pointer w-16">
          <Image
              src="/avatar.jpg"
              alt="Profile Picture"
              width={40}
              height={40}
              quality={100}
              className="rounded-full"
            />
            <span className="fa fa-caret-down absolute bottom-0 right-2 rounded-full bg-white text-black text-sm hover:bg-white hover:text-gray-800">
              <svg
                className="ml-1 h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;