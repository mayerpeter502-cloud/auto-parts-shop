import { Skeleton } from "./Skeleton";

export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden p-4">
      {/* Image skeleton */}
      <Skeleton className="w-full aspect-square mb-4" />
      
      {/* Brand skeleton */}
      <Skeleton className="w-1/3 h-3 mb-2" />
      
      {/* Title skeleton */}
      <Skeleton className="w-full h-4 mb-2" />
      <Skeleton className="w-2/3 h-4 mb-4" />
      
      {/* Rating skeleton */}
      <Skeleton className="w-1/4 h-3 mb-4" />
      
      {/* Price skeleton */}
      <Skeleton className="w-1/2 h-6 mb-4" />
      
      {/* Stock skeleton */}
      <Skeleton className="w-1/3 h-4 mb-4" />
      
      {/* Button skeleton */}
      <Skeleton className="w-full h-10" />
    </div>
  );
}