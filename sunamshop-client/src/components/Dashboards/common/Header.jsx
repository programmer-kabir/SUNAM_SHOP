import { Bell, Grid, Moon, Menu } from "lucide-react";

export default function Header() {
  return (
    <div >
      <nav className="w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition">
              <Menu className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 flex items-center justify-center bg-blue-600 rounded-full text-white font-bold">
                F
              </div>
              <span className="text-xl font-semibold text-gray-800 dark:text-white">
                Flowbite
              </span>
            </div>
          </div>

          {/* Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-6">
            <input
              type="text"
              placeholder="Search"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition">
              <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>

            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition">
              <Grid className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>

            <button
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>

            <img
              src="https://i.pravatar.cc/40"
              alt="User"
              className="w-8 h-8 rounded-full border-2 border-gray-300 dark:border-gray-600 cursor-pointer"
            />
          </div>
        </div>
      </nav>
    </div>
  );
}
