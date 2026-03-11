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
            <div className="absolute top-full mt-3 w-full bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-2 text-xs text-gray-500 border-b dark:border-gray-700">
                <span className="font-medium">Recent Searches</span>
                <button
                  onClick={clearHistory}
                  className="text-red-500 hover:text-red-600 text-xs font-medium"
                >
                  Clear
                </button>
              </div>

              {/* List */}
              <div className="max-h-60 overflow-y-auto">
                {filteredHistory.map((item, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      router.push(`/search?query=${item}`);
                      setSearchTerm("");
                      setIsDesktopSearchOpen(false);
                    }}
                    className="flex items-center gap-3 px-4 py-2 text-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                  >
                    <Search className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-200">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
