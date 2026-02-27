"use client";
import { useEffect, useState } from "react";
import { getProducts, Product } from "../app/lib/api";
import ProductCard from "./ProductCard";

interface AnalogProductsProps {
  crossNumbers: string[];
  currentProductId: string;
}

export function AnalogProducts({ crossNumbers, currentProductId }: AnalogProductsProps) {
  const [analogs, setAnalogs] = useState<Product[]>([]);

  useEffect(() => {
    const allProducts = getProducts();
    const foundAnalogs = allProducts.filter(p => 
      p.id !== currentProductId && 
      crossNumbers.includes(p.sku || '')
    );
    setAnalogs(foundAnalogs);
  }, [crossNumbers, currentProductId]);

  if (analogs.length === 0) {
    return (
      <div className="text-sm text-gray-500">
        Аналоги не найдены в каталоге
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {analogs.map(product => (
        <ProductCard 
          key={product.id} 
          product={{ ...product, image: product.image || '/placeholder.jpg' }} 
        />
      ))}
    </div>
  );
}