"use client";
import Head from "next/head";
import type { NextPage } from "next";
import { useState } from "react";
import { useRouter } from "next/navigation";
// import { toast } from "react-hot-toast";
import Image from "next/image";

const Login: NextPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Temporary authentication logic
    if (email === "u@u.com" && password === "user") {
      setError("");
      localStorage.setItem("authenticated", "true");
      // toast.success("Login Successful!");
      router.push("/dashboard");
    } else {
      setError("Invalid email or password.");
      // toast.error("Login Failed");
    }
  };

  return (
    <>
      <Head>
        <title>Login - NavMart</title>
      </Head>

      <div className="relative h-screen w-screen md:flex lg:p-12 md:overflow-hidden">
        {/* Background Section */}
        <div className="relative w-full md:w-1/2">
          <div className="h-full w-full relative lg:rounded-xl overflow-hidden bg-black">
            <Image
              src="/homeframe.jpg"
              alt="Home-Frame"
              className="w-full h-full object-cover opacity-80"
              width={1000}
              height={1000}
              quality={100}
            />
            {/* Mobile Overlay (centered) */}
            <div className="absolute inset-0 flex flex-col items-center justify-center md:hidden">
              <Image
                width={0}
                height={0}
                src="/logo.png"
                alt="Navmart Logo"
                className="w-10 h-10"
              />
              <h1 className="text-white text-3xl font-bold mt-4">navmart</h1>
              <p className="text-white text-xl mt-2">
                Bridging Real Spaces with Smart Access
              </p>
            </div>
            {/* Desktop Overlays */}
            <div className="hidden md:block">
              {/* Top-left logo */}
              <div className="absolute top-3 left-2 p-8 flex items-center space-x-2">
                <Image
                  width={0}
                  height={0}
                  src="/logo.png"
                  alt="Navmart Logo"
                  className="w-10 h-10"
                />
                <span className="text-white text-xl font-bold">
                  navmart
                </span>
              </div>
              {/* Bottom-left tagline */}
              <div className="absolute bottom-0 left-0 p-8">
                <h1 className="text-white text-3xl font-bold mb-4">
                  Bridging Real Spaces with Smart Access
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* Login Form Section */}
        <div className="fixed inset-0 flex items-center justify-center z-20 md:static md:w-1/2">
          <div className="w-full max-w-md p-8 bg-white bg-opacity-80 md:bg-opacity-100 shadow-lg rounded">
            <h2 className="text-2xl font-bold">Login</h2>
            <h4 className="py-4 mb-7">Welcome back to Navmart</h4>
            {error && (
              <p className="mb-4 text-red-500 text-center">{error}</p>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email address"
                  className="w-full px-4 py-2 text-black shadow rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 text-black shadow rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700 transition"
              >
                Log in
              </button>
              <div className="mt-4 text-center">
                <a href="#" className="text-blue-600 hover:underline">
                  Forgot password?
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;