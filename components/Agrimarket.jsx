"use client";

import Image from "next/image";
import { useLogin } from "@/Context/logincontext";

const products = [
  {
    id: 1,
    title: "Dairy Cow",
    image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=400&q=80",
    price: "₹60,000",
    type: "Buy",
  },
  {
    id: 2,
    title: "Goat",
    image: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=400&q=80",
    price: "₹8,000",
    type: "Buy",
  },
  {
    id: 3,
    title: "Organic Wheat (100kg)",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    price: "₹3,500",
    type: "Sell",
  },
  {
    id: 4,
    title: "Fresh Corn (50kg)",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    price: "₹2,000",
    type: "Sell",
  },
  {
    id: 5,
    title: "Tractor (Used)",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=400&q=80",
    price: "₹3,00,000",
    type: "Sell",
  },
  {
    id: 6,
    title: "Buffalo",
    image: "https://images.unsplash.com/photo-1468421870903-4df1664ac249?auto=format&fit=crop&w=400&q=80",
    price: "₹55,000",
    type: "Buy",
  },
];

export default function AgriMarket() {
  return (
    <section className="w-full max-w-5xl mx-auto my-10 p-6 bg-white rounded-2xl shadow-lg ml-[250]">
      <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-6 text-center tracking-tight">
        AgriMarket: Buy & Sell Agriculture Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-green-50 rounded-xl shadow-md flex flex-col items-center p-4 hover:shadow-xl transition-shadow h-full justify-between"
          >
            <div className="relative w-full h-40 mb-4 rounded-lg overflow-hidden">
              <Image
                src={product.image}
                alt={product.title}
                fill
                style={{ objectFit: "cover" }}
                className=""
                sizes="(max-width: 600px) 100vw, 400px"
                priority={product.id <= 2}
              />
            </div>
            <h3 className="text-lg font-semibold text-green-900 mb-2 text-center">
              {product.title}
            </h3>
            <div className="text-green-700 font-bold text-xl mb-3">
              {product.price}
            </div>
            <div className="flex flex-row justify-center w-full gap-2 mt-auto pt-4">
              <button
                className={`px-6 py-2 rounded-full font-semibold shadow transition-colors text-white ${
                  product.type === "Buy"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {product.type === "Buy" ? "Buy Now" : "Sell Now"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
