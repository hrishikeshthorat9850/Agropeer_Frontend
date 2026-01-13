import Image from "next/image";

export default function ProductInfo({ product }) {
  return (
    <>
      {product && (
        <div className="p-3 bg-blue-50 border-b border-gray-200 dark:bg-[#1E1E1E] dark:border-[#333]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-200 relative dark:bg-[#333]">
              <Image
                src={product.photos?.[0] || "/placeholder.png"}
                alt={product.title}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold !text-blue-700 text-sm dark:!text-blue-400">{product.title}</h4>
              <p className="!text-blue-600 font-bold dark:!text-blue-300">₹{product.price}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
