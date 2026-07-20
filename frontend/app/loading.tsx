export default function Loading() {
  return (
    <div className="min-h-screen bg-[#090909] pt-32 pb-24 px-6 max-w-7xl mx-auto space-y-12 animate-pulse">
      {/* Hero Skeleton */}
      <div className="space-y-4 max-w-2xl mx-auto text-center">
        <div className="h-6 w-36 bg-white/5 rounded-full mx-auto" />
        <div className="h-12 w-3/4 bg-white/10 rounded-2xl mx-auto" />
        <div className="h-4 w-1/2 bg-white/5 rounded-lg mx-auto" />
      </div>

      {/* Grid Skeleton */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div
            key={i}
            className="rounded-2xl bg-white/[0.03] border border-white/5 p-4 space-y-4 h-80 flex flex-col justify-between"
          >
            <div className="w-full h-44 rounded-xl bg-white/5" />
            <div className="space-y-2">
              <div className="h-5 w-3/4 bg-white/10 rounded-lg" />
              <div className="h-3 w-1/2 bg-white/5 rounded-md" />
            </div>
            <div className="flex justify-between items-center pt-2">
              <div className="h-6 w-16 bg-gold/20 rounded-lg" />
              <div className="h-8 w-20 bg-gold/30 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
