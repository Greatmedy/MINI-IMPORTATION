const ProductCardSkeleton = () => (
  <div className="card overflow-hidden">
    <div className="aspect-square w-full animate-pulse bg-blush" />
    <div className="space-y-2 p-4">
      <div className="h-3 w-1/3 animate-pulse rounded bg-blush" />
      <div className="h-4 w-3/4 animate-pulse rounded bg-blush" />
      <div className="h-5 w-1/2 animate-pulse rounded bg-blush" />
    </div>
  </div>
);

export default ProductCardSkeleton;
