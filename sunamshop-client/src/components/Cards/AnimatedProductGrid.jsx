"use client";

import { motion } from "framer-motion";
import ProductCard from "./ProductCard";

export default function AnimatedProductGrid({ products, reviews }) {
  return (
    <motion.div
      layout
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 "
    >
      {products.map((product) => (
        <motion.div
          key={product._id}
          layout
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          <ProductCard product={product} reviews={reviews} />
        </motion.div>
      ))}
    </motion.div>
  );
}
