"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown } from "lucide-react";

export default function ProductFilters({ categories }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  /* ---------------- CATEGORY STATE (SAFE) ---------------- */
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    setSelectedCategory(searchParams.get("category"));
  }, [searchParams]);

  /* ---------------- ACCORDION ---------------- */
  const [open, setOpen] = useState("categories");

  const toggle = (section) => {
    setOpen((prev) => (prev === section ? null : section));
  };

  /* ---------------- CATEGORY CHANGE ---------------- */
  const handleCategoryChange = (cat) => {
    const params = new URLSearchParams(searchParams.toString());

    if (cat === selectedCategory) {
      params.delete("category");
    } else {
      params.set("category", cat);
    }

    router.push(`/products?${params.toString()}`);
    router.refresh(); // 🔥 VERY IMPORTANT
  };

  const handleSingleSelect = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());

    const current = params.get(key);

    if (current === value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    router.push(`/products?${params.toString()}`);
    router.refresh(); // 🔥 THIS WAS MISSING
  };

  /* ---------------- REUSABLE SECTION ---------------- */
  const Section = ({ id, title, children }) => (
    <div className="border-b border-gray-200 dark:border-gray-800 py-4">
      <button
        onClick={() => toggle(id)}
        className="w-full flex items-center justify-between text-left"
      >
        <span className="font-semibold text-gray-900 dark:text-white">
          {title}
        </span>
        <ChevronDown
          className={`w-4 h-4 transition ${open === id ? "rotate-180" : ""}`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          open === id ? "max-h-96 mt-4" : "max-h-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
  const prices = [
    { label: "under 10000", value: "0-10000" },
    { label: "৳10000-৳20000", value: "10000-20000" },
    { label: "৳20000-৳30000", value: "20000-30000" },
    { label: "৳30000-৳40000", value: "30000-40000" },
    { label: "৳40000-৳50000", value: "40000-50000" },
    { label: "over ৳50000", value: "50000-9950000" },
  ];
  const colors = ["black", "blue", "pink", "teal", "purple", "yellow", "green"];
  const weights = ["under-1kg", "1-5kg", "5-10kg", "over-20kg"];
  return (
    <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl p-5 sticky top-24 shadow-sm">
      {/* ================= Categories ================= */}
      <Section id="categories" title="Categories">
        <div className="space-y-3 text-sm">
          {/* All */}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={!selectedCategory}
              onChange={() => router.push("/products")}
              className="accent-blue-600 w-4 h-4"
            />
            <span className="text-gray-800 dark:text-gray-200">
              All Categories
            </span>
          </label>

          {categories.map((cat, i) => {
  const value = cat.slug;
  const checked = selectedCategory === value;

  return (
    <label
      key={i}
      className="flex items-center gap-3 cursor-pointer group"
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={() => handleCategoryChange(value)}
        className="accent-blue-600 w-4 h-4"
      />
      <span
        className={`transition ${
          checked
            ? "text-blue-600 font-semibold"
            : "text-gray-700 dark:text-gray-300 group-hover:text-blue-600"
        }`}
      >
        {cat.name}
      </span>
    </label>
  );
})}
        </div>
      </Section>

      {/* ================= Rating ================= */}
      <Section id="rating" title="Rating">
        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          {[5, 4, 3, 2, 1].map((star) => {
            const checked = searchParams.get("rating") == star;

            return (
              <label
                key={star}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => handleSingleSelect("rating", String(star))}
                  className="accent-blue-600"
                />
                {"⭐".repeat(star)}
              </label>
            );
          })}
        </div>
      </Section>

      {/* ================= Price ================= */}
      <Section id="price" title="Price">
        <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
          {prices.map((p, i) => {
            const checked = searchParams.get("price") === p.value;

            return (
              <label key={i} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => handleSingleSelect("price", p.value)}
                  className="accent-blue-600"
                />
                {p.label}
              </label>
            );
          })}
        </div>
      </Section>

      {/* ================= Color ================= */}
      <Section id="color" title="Color">
        <div className="flex gap-3 mt-3">
          {colors.map((c, i) => {
            const checked = searchParams.get("color") === c;

            return (
              <button
                key={i}
                onClick={() => handleSingleSelect("color", c)}
                className={`w-6 h-6 rounded-full border-2 transition
          ${checked ? "border-blue-500 scale-110" : "border-white"}
          bg-${c}-500`}
              />
            );
          })}
        </div>
      </Section>

      {/* ================= Weight ================= */}
      <Section id="weight" title="Weight">
        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          {weights.map((w, i) => {
            const checked = searchParams.get("weight") === w;

            return (
              <label key={i} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => handleSingleSelect("weight", w)}
                  className="accent-blue-600"
                />
                {w.replaceAll("-", " ")}
              </label>
            );
          })}
        </div>
      </Section>
    </div>
  );
}
