"use client";

import Link from "next/link";
import { Home, ChevronRight } from "lucide-react";
import React from "react";

export default function Breadcrumb({ items = [] }) {
  const allItems = [{ label: "Home", href: "/" }, ...items];

  return (
    <div className="mb-5">
      <nav aria-label="Breadcrumb">
        <ol className="flex items-center gap-1 text-sm text-gray-700">
          {allItems.map((item, index) => {
            const isLast = index === allItems.length - 1;

            return (
              <React.Fragment key={index}>
                {index !== 0 && (
                  <li className="text-gray-400">
                    <ChevronRight className="size-4 stroke-[1.5]" />
                  </li>
                )}

                <li className="flex items-center gap-1">
                  {index === 0 && (
                    <Home className="size-4 mr-1 text-gray-600" />
                  )}

                  {isLast || !item.href ? (
                    <span className="text-gray-900 font-medium">
                      {item.label}
                    </span>
                  ) : (
                    <Link
                      href={item.href}
                      className="transition-colors hover:text-gray-900"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              </React.Fragment>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}
