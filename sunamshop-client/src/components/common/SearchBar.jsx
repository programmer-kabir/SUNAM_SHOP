"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function SearchBar({ showNavbarSearch }) {
  const router = useRouter();
  const searchRef = useRef(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isDesktopSearchOpen, setIsDesktopSearchOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("searchHistory");
    if (stored) setSearchHistory(JSON.parse(stored));
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsMobileSearchOpen(false);
        setIsDesktopSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = () => {
    if (!searchTerm.trim()) return;

    const updatedHistory = [
      searchTerm,
      ...searchHistory.filter((item) => item !== searchTerm),
    ].slice(0, 6);

    setSearchHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));

    router.push(`/search?query=${searchTerm}`);

    setSearchTerm("");
    setIsMobileSearchOpen(false);
    setIsDesktopSearchOpen(false);
  };

  const clearHistory = () => {
    localStorage.removeItem("searchHistory");
    setSearchHistory([]);
  };

  const filteredHistory = searchTerm
    ? searchHistory.filter((item) =>
        item.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : searchHistory;

  return (
    <>
      {/* MOBILE SEARCH */}
      <div className="md:hidden">
        {!isMobileSearchOpen && (
          <button onClick={() => setIsMobileSearchOpen(true)} className="p-2">
            <Search className="h-6 w-6" />
          </button>
        )}
        {isMobileSearchOpen && (
          <div
            ref={searchRef}
            className="absolute top-16 left-0 w-full bg-white dark:bg-gray-950 border-b shadow-md px-4 z-50"
          >
            <input
              type="text"
              autoFocus
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Search products..."
              className="w-full border-b pb-2 outline-none bg-transparent"
            />
          </div>
        )}
      </div>

      {/* DESKTOP SEARCH */}
      {showNavbarSearch && (
        <div className="relative hidden md:flex ">
          <input
            value={searchTerm}
            onFocus={() => setIsDesktopSearchOpen(true)}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
              if (e.key === "Escape") setIsDesktopSearchOpen(false);
            }}
            type="text"
            placeholder="Search for products (e.g. eggs, milk, potato)"
            className="w-full py-3 pl-5 pr-12 rounded-lg text-gray-700 shadow-sm border border-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-300"
          />
          <button
            onClick={handleSearch}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {/* Search Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          {isDesktopSearchOpen && filteredHistory.length > 0 && (
            <div className="absolute top-full mt-2 w-full bg-white dark:bg-gray-900 rounded-lg shadow-lg border max-h-56 overflow-y-auto z-50">
              <div className="flex justify-between px-3 py-2 border-b text-xs">
                <span>Recent Searches</span>
                <button onClick={clearHistory} className="text-red-500">
                  Clear
                </button>
              </div>
              {filteredHistory.map((item, i) => (
                <div
                  key={i}
                  onClick={() => {
                    router.push(`/products?search=${item}`);
                    setSearchTerm("");
                  }}
                  className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100"
                >
                  🔍 {item}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
