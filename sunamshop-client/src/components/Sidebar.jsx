"use client";
import { useEffect, useState } from "react";
import {
  getAllMainCategory,
  getAllSubCategory,
  getAllSubSubCategory,
  getAllChildCategory,
} from "@/utils/Category";
import { useThemeLanguage } from "@/context/ThemeLanguageContext";
import { ChevronDown, Heart } from "lucide-react";
import Link from "next/link";
import { TicketPercent, Tag } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
const SidebarHome = () => {
  const [categories, setCategories] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [subSubCategory, setSubSubCategory] = useState([]);
  const [childCategory, setChildCategory] = useState([]);
  const { language } = useThemeLanguage();
  const [openMain, setOpenMain] = useState(null);
  const [openSub, setOpenSub] = useState(null);
  const [openSubSub, setOpenSubSub] = useState(null);
  const { wishlist } = useWishlist();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [mainData, subData, subSubData, childData] = await Promise.all([
          getAllMainCategory(),
          getAllSubCategory(),
          getAllSubSubCategory(),
          getAllChildCategory(),
        ]);

        setCategories(mainData);
        setSubCategory(subData);
        setSubSubCategory(subSubData);
        setChildCategory(childData);
        // 🔥 First category default open
        if (mainData.length > 0) {
          setOpenMain(mainData[0].id);
        }
      } catch (error) {
        console.error("Category Load Error:", error);
      }
    };

    loadData();
  }, []);

  return (
    <div>
      <div className="mt-5 ">
        <div className="px-3 w-full flex flex-col pb-3 gap-1">
          <Link
            href={"/products/coupons"}
            className="flex items-center gap-2 cursor-pointer text-gray-800 hover:bg-gray-100 py-2 px-3 w-full rounded-md"
          >
            <TicketPercent size={18} className="text-purple-600" />
            Coupons
          </Link>

          <Link
            href={"/products/offer"}
            className="flex items-center gap-2 cursor-pointer text-gray-800 hover:bg-gray-100 py-2 px-3 w-full rounded-md"
          >
            <Tag size={18} className="text-orange-500" />
            Offers
          </Link>
          <Link
            href={"/wishlist"}
            className="flex items-center gap-2 cursor-pointer text-gray-800 hover:bg-gray-100 py-2 px-3 w-full rounded-md"
          >
            <Heart size={18} className="text-red-500" />
            Favourite <span className="text-[10px]">({wishlist?.length})</span>
          </Link>
        </div>

        <div className="px-3 w-full  flex flex-col">
          <Link
            href={"/products/flashsales"}
            className="cursor-pointer text-gray-800 hover:bg-gray-100 py-2 px-3 w-full rounded-md"
          >
            Flash Sale
          </Link>
          <Link
            href={"/products/newarrival"}
            className="cursor-pointer text-gray-800 hover:bg-gray-100 py-2 px-3 w-full rounded-md"
          >
            New Arrival
          </Link>
        </div>
        {categories.map((main) => (
          <div key={main.id}>
            {/* MAIN CATEGORY */}
            <div
              className="items-center justify-between cursor-pointer font-semibold text-black hidden"
              onClick={() => setOpenMain(openMain === main.id ? null : main.id)}
            >
              <span>{language === "BN" ? main.name.bn : main.name.en}</span>

              <ChevronDown
                size={16}
                className={`transition-transform ${
                  openMain === main.id ? "rotate-0" : "-rotate-90"
                }`}
              />
            </div>

            {/* SUB CATEGORY */}
            {openMain === main.id &&
              subCategory
                .filter((sub) => sub.parentId === main.id)
                .map((sub) => (
                  <div key={sub.subCategoryId} className=" rounded-md px-3">
                    <div
                      className="flex items-center justify-between cursor-pointer text-gray-800 hover:bg-gray-100 py-2 px-3 rounded-md"
                      onClick={() =>
                        setOpenSub(
                          openSub === sub.subCategoryId
                            ? null
                            : sub.subCategoryId,
                        )
                      }
                    >
                      <Link href={`/${sub.slug}`}>
                        <span>
                          {language === "BN" ? sub.name.bn : sub.name.en}
                        </span>
                      </Link>

                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${
                          openSub === sub.subCategoryId
                            ? "rotate-0"
                            : "-rotate-90"
                        }`}
                      />
                    </div>

                    {/* SUB SUB CATEGORY */}
                    {openSub === sub.subCategoryId &&
                      subSubCategory
                        .filter((ss) => ss.parentId === sub.subCategoryId)
                        .map((ss) => (
                          <div
                            key={ss.subSubCategoryId}
                            className="ml-4  border-l-2 px-2 border-gray-200"
                          >
                            <div
                              className="flex items-center justify-between cursor-pointer text-gray-800 hover:bg-gray-100 px-3 py-1"
                              onClick={() =>
                                setOpenSubSub(
                                  openSubSub === ss.subSubCategoryId
                                    ? null
                                    : ss.subSubCategoryId,
                                )
                              }
                            >
                              <Link href={`/${sub.slug}/${ss.slug}`}>
                                {language === "BN" ? ss.name.bn : ss.name.en}
                              </Link>
                              <ChevronDown
                                size={16}
                                className={`transition-transform duration-200 ${
                                  openSubSub === ss.subSubCategoryId
                                    ? "rotate-0"
                                    : "-rotate-90"
                                }`}
                              />
                            </div>

                            {/* CHILD CATEGORY */}
                            {openSubSub === ss.subSubCategoryId &&
                              childCategory
                                .filter(
                                  (c) => c.parentId === ss.subSubCategoryId,
                                )
                                .map((c) => (
                                  <div
                                    key={c.childCategoryId}
                                    className="ml-4 text-sm text-gray-900 border-l-2 border-gray-200 px-2 py-1 hover:bg-gray-50 cursor-pointer"
                                  >
                                    <Link
                                      href={`/${sub.slug}/${ss.slug}/${c.slug}`}
                                    >
                                      {language === "BN"
                                        ? c.name.bn
                                        : c.name.en}
                                    </Link>
                                  </div>
                                ))}
                          </div>
                        ))}
                  </div>
                ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SidebarHome;
