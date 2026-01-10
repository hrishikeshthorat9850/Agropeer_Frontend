"use client";
import { motion, AnimatePresence } from "framer-motion";
import { ProductCard } from "../ui/market";
import { useLanguage } from "@/Context/languagecontext";

export default function SavedProducts({ products, user, removeSaved }) {
  const { t } = useLanguage();

  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center py-20 bg-green-50 text-center rounded-xl shadow-inner dark:bg-[#272727]">
        <p className="text-green-700 font-medium text-lg">{t("no_saved_products")}</p>
      </div>
    );
  }

  return (
    <AnimatePresence>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((item) => (
          <motion.div
            key={`product-${item.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* <div className="bg-white rounded-lg shadow-md overflow-hidden p-4">
              <Image
                src={item.image_url || "/placeholder.jpg"}
                alt={item.name || "Product"}
                width={600}
                height={400}
                className="rounded-md object-cover w-full h-64"
              />
              <h3 className="text-xl font-semibold mt-3">{item.name}</h3>
              <p className="text-green-700 font-bold">₹{item.price}</p>
            </div> */}
            <ProductCard
              product={item}
              isFavorite
              onFavoriteClick={() => removeSaved(item?.id)}
            />
          </motion.div>
        ))}
      </div>
    </AnimatePresence>
  );
}
