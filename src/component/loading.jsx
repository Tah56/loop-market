export default function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-zinc-950 p-4 md:p-6 animate-pulse">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between gap-4 mb-8">
        <div>
          <div className="h-10 w-64 bg-zinc-800 rounded-xl mb-3"></div>
          <div className="h-4 w-40 bg-zinc-800 rounded"></div>
        </div>

        <div className="h-12 w-40 bg-zinc-800 rounded-xl"></div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4 mb-10">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6"
          >
            <div className="w-12 h-12 bg-zinc-800 rounded-xl mb-5"></div>

            <div className="h-10 w-20 bg-zinc-800 rounded mb-3"></div>

            <div className="h-4 w-28 bg-zinc-800 rounded"></div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-5">
          <div className="h-8 w-48 bg-zinc-800 rounded"></div>
          <div className="h-5 w-20 bg-zinc-800 rounded"></div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="flex flex-col md:flex-row md:justify-between gap-4 p-5 border-b border-zinc-800"
            >
              <div>
                <div className="h-5 w-48 bg-zinc-800 rounded mb-2"></div>
                <div className="h-4 w-32 bg-zinc-800 rounded"></div>
              </div>

              <div className="flex gap-3 items-center">
                <div className="h-8 w-24 bg-zinc-800 rounded-lg"></div>
                <div className="h-5 w-16 bg-zinc-800 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Status */}
      <div>
        <div className="h-8 w-48 bg-zinc-800 rounded mb-5"></div>

        <div className="grid md:grid-cols-3 gap-5">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8"
            >
              <div className="h-12 w-20 bg-zinc-800 rounded mx-auto mb-4"></div>
              <div className="h-4 w-24 bg-zinc-800 rounded mx-auto"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}