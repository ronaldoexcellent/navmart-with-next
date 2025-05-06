"use client";

import { useState, useRef, useEffect } from "react";
import { NextPage } from "next";
import Head from "next/head";
import Header from "../../components/headers/DashboardHeader";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import Image from "next/image";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Create the MonthDropdown component with outside click detection and mobile friendly styles
const MonthDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("Today");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (month: string) => {
    setSelectedMonth(month);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative inline-block text-left w-full sm:w-auto">
      <button
        onClick={toggleDropdown}
        className="bg-gray-200 text-sm cursor-pointer py-2 px-3 rounded-xl inline-flex items-center w-full sm:w-auto"
      >
        <span>{selectedMonth}</span>
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
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-full sm:w-40 bg-white rounded-md shadow-xl border border-gray-300 z-10">
          <ul className="py-1 cursor-pointer">
            {months.map((month) => (
              <li key={month}>
                <button
                  type="button"
                  onClick={() => handleSelect(month)}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {month}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const Dashboard: NextPage = () => {
  // ==============================
  // Restroom Usage Trends Chart
  // ==============================
  const restroomTrendsData = {
    labels: ["10:00", "11:00", "12:00", "1:00", "2:00", "4:00"],
    datasets: [
      {
        label: "Restroom Usage",
        data: [100, 200, 400, 600, 800, 1000],
        backgroundColor: "#22c55e",
        borderRadius: 20,
      },
    ],
  };

  const restroomTrendsOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: "#4B5563",
          font: { size: 12 },
        },
      },
      y: {
        grid: { color: "#E5E7EB" },
        ticks: { display: true },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
  };

  // ==============================
  // Parking Lot Usage Chart
  // ==============================
  const parkingLotData = {
    labels: ["Apr 10", "Apr 11", "Apr 12", "Apr 13", "Apr 14", "Apr 15"],
    datasets: [
      {
        label: "Parking Lot Usage",
        data: [60, 80, 50, 70, 90, 40],
        backgroundColor: "#000000",
        borderRadius: 20,
      },
    ],
  };

  const parkingLotOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#4B5563", font: { size: 12 } },
      },
      y: {
        grid: { color: "#E5E7EB" },
        ticks: { display: true },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
  };

  // ==============================
  // Categories Pie Chart
  // ==============================
  const categoriesData = {
    labels: [
      "Supermarket: 20%",
      "Parks: 15%",
      "Electronics: 25%",
      "Health: 30%",
      "Others: 10%",
    ],
    datasets: [
      {
        data: [20, 15, 25, 30, 10],
        backgroundColor: [
          "#4CAF50",
          "#ff543d",
          "#f7bc3e",
          "#000000",
          "#d3d3d3",
        ],
        borderWidth: 0,
      },
    ],
  };

  const categoriesOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right" as const,
        labels: { font: { size: 12 }, color: "#4B5563" },
      },
    },
  };

  // ==============================
  // Visitors Chart
  // ==============================
  const visitorsData = {
    labels: ["Apr 7", "Apr 8", "Apr 9", "Apr 10", "Apr 11", "Apr 12"],
    datasets: [
      {
        label: "Visitors",
        data: [50, 70, 60, 80, 90, 40],
        backgroundColor: "#22c55e",
        borderRadius: 20,
        borderColor: "#ff0000",
      },
    ],
  };

  const visitorsOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#4B5563", font: { size: 12 } },
      },
      y: {
        grid: { color: "#E5E7EB" },
        ticks: { display: true },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
  };

  return (
    <>
      <Head>
        <title>Dashboard | NavMart Admin</title>
      </Head>
      <div className="min-h-screen bg-gray-100">
        {/* Header */}
        <Header />
        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-8">
          {/* Welcome Message */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800">
              Welcome Admin,
            </h1>
          </div>
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <Image
                src="/icons/total_shops.png"
                alt="total_shops"
                width={50}
                height={20}
                className="mb-3"
              />
              <h2 className="text-gray-600 text-sm">Total Shops</h2>
              <div className="lg:grid flex xl:flex items-center justify-between mt-1">
                <p className="text-2xl font-semibold text-gray-800 mr-2">
                  2300
                </p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <Image
                src="/icons/total_visitors.png"
                alt="total_visitors"
                width={50}
                height={20}
                className="mb-3"
              />
              <h2 className="text-gray-600 text-sm">Total Visitors</h2>
              <div className="lg:grid flex xl:flex items-center justify-between mt-1">
                <p className="text-2xl font-semibold text-gray-800 mr-2">
                  2300
                </p>
                <span className="bg-green-100 text-green-700 font-semibold text-xs py-2 px-3 rounded-xl">
                  &uarr; 4% as yesterday
                </span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <Image
                src="/icons/restroom_usage.png"
                alt="restroom_usage"
                width={50}
                height={20}
                className="mb-3"
              />
              <h2 className="text-gray-600 text-sm">Restroom Usage</h2>
              <div className="lg:grid flex xl:flex items-center justify-between mt-1">
                <p className="text-2xl font-semibold text-gray-800 mr-2">
                  2300
                </p>
                <span className="bg-green-100 text-green-700 font-semibold text-xs py-2 px-3 rounded-xl">
                  &uarr; 4% as yesterday
                </span>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <Image
                src="/icons/parking_lot.png"
                alt="parking_lot"
                width={50}
                height={20}
                className="mb-3"
              />
              <h2 className="text-gray-600 text-sm">Parking Lot</h2>
              <div className="lg:grid flex xl:flex items-center justify-between mt-1">
                <p className="text-2xl font-semibold text-gray-800 mr-2">
                  2300
                </p>
                <span className="bg-red-100 text-red-700 font-semibold text-xs py-2 px-3 rounded-xl">
                  &darr; 4% as yesterday
                </span>
              </div>
            </div>
          </div>
          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Restroom Usage Trends Chart */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center font-semibold justify-between w-full mb-4">
                <h3 className="text-lg text-gray-800">
                  Restroom Usage Trends
                </h3>
                <MonthDropdown />
              </div>
              <div className="h-72">
                <Bar
                  data={restroomTrendsData}
                  options={restroomTrendsOptions}
                />
              </div>
            </div>
            {/* Parking Lot Usage Chart */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center font-semibold justify-between w-full mb-4">
                <h3 className="text-lg font-medium text-gray-800 mb-4">
                  Parking Lot Usage
                </h3>
                <MonthDropdown />
              </div>
              <div className="h-72">
                <Bar data={parkingLotData} options={parkingLotOptions} />
              </div>
            </div>
            {/* Categories Pie Chart */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center font-semibold justify-between w-full mb-4">
                <h3 className="text-lg font-medium text-gray-800 mb-4">
                  Categories
                </h3>
                <MonthDropdown />
              </div>
              <div className="h-64">
                <Pie data={categoriesData} options={categoriesOptions} />
              </div>
            </div>
            {/* Visitors Chart */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center font-semibold justify-between w-full mb-4">
                <h3 className="text-lg font-medium text-gray-800 mb-4">
                  Visitors
                </h3>
                <MonthDropdown />
              </div>
              <div className="h-72">
                <Bar data={visitorsData} options={visitorsOptions} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;