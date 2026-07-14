export default function Loading() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="h-8 w-40 bg-gray-200 rounded animate-pulse mb-6" />

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i}>
            <div className="aspect-square bg-gray-200 rounded-lg animate-pulse" />
            <div className="mt-3 h-4 w-3/4 bg-gray-200 rounded animate-pulse" />
            <div className="mt-2 h-4 w-1/4 bg-gray-200 rounded animate-pulse" />
          </div>
        ))}
      </div>
    </main>
  );
}
