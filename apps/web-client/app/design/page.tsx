export default function DesignPage() {
  return (
    <main className="p-6 space-y-12 w-full h-full">
      <header className="pb-5 border-b ">
        <h1 className="text-3xl font-bold">Design Page</h1>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-700">
          Product Summary Card
        </h2>
        <div className="max-w-xs border p-4 rounded-xl bg-white shadow">
          {/* Product Image */}
          <img
            src="https://applied-motion.s3.amazonaws.com/images/product-pages/stepservo-integrated-motors/PN%20-%20CSM34X5L-A_5490-800x800.png"
            alt="CSM34X5L-A Conveyor Smart Motor"
            className="h-40 w-full object-contain rounded"
          />
          {/* Product Title */}
          <div className="text-black">CSM34X5L-A Conveyor Smart Motor</div>
          {/* Star Rating */}
          <div className="flex space-x-1 text-yellow-500">
            {/* Full Stars */}
            <span className="text-xl">&#9733;</span>
            <span className="text-xl">&#9733;</span>
            <span className="text-xl">&#9733;</span>
            <span className="text-xl">&#9733;</span>
            {/* Empty Stars */}
            <span className="text-xl">&#9734;</span>
            <p>100</p>
          </div>
          {/* Price */}
          <div className="text-gray-800 text-xl font-bold">${380}</div>
          {/* Stock Availability */}
          <div className="">
            <span className="text-gray-600">stock:</span>
            <span className="text-gray-800">{66}</span>
          </div>
          {/* SKU */}
          <div className="">
            <span className="text-gray-600">sku:</span>
            <span className="text-gray-800">{"CSM34X5L-A"}</span>
          </div>
        </div>
      </section>

      {/*  Ecommerce Grid Layout Template with Sidebar */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-700">
          Product Listings Layout
        </h2>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Filter Template */}
          <aside className="w-full lg:w-64 border p-4 rounded-xl bg-gray-50 shadow space-y-6">
            {/* Filter Group 1: Price Range */}
            <div className="space-y-2">
              <div className="bg-gray-300 h-6 w-1/2 rounded-full" />{" "}
              {/* Filter Heading */}
              <div className="bg-gray-300 h-4 w-3/4 rounded-full" />{" "}
              {/* Price Range Placeholder */}
              <div className="bg-gray-300 h-4 w-2/3 rounded-full" />
              <div className="bg-gray-300 h-4 w-1/2 rounded-full" />
            </div>

            {/* Filter Group 2: Rating */}
            <div className="space-y-2">
              <div className="bg-gray-300 h-6 w-1/2 rounded-full" />{" "}
              {/* Rating Filter Heading */}
              <div className="bg-gray-300 h-4 w-3/4 rounded-full" />{" "}
              {/* Rating Stars Placeholder */}
              <div className="bg-gray-300 h-4 w-2/3 rounded-full" />
              <div className="bg-gray-300 h-4 w-1/2 rounded-full" />
            </div>

            {/* Filter Group 3: Brands (Checkboxes) */}
            <div className="space-y-4">
              <div className="bg-gray-300 h-6 w-1/2 rounded-full" />{" "}
              {/* Checkbox Filter Heading */}
              <div className="space-y-2">
                {Array.from({ length: 4 }).map((_, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <div className="bg-gray-300 h-4 w-4 rounded-full" />{" "}
                    {/* Checkbox Placeholder */}
                    <div className="bg-gray-300 h-4 w-3/4 rounded-full" />{" "}
                    {/* Label */}
                  </div>
                ))}
              </div>
            </div>

            {/* Filter Group 4: Features */}
            <div className="space-y-2">
              <div className="bg-gray-300 h-6 w-1/2 rounded-full" />{" "}
              {/* Features Filter Heading */}
              <div className="bg-gray-300 h-4 w-3/4 rounded-full" />{" "}
              {/* Feature Placeholder */}
              <div className="bg-gray-300 h-4 w-2/3 rounded-full" />
              <div className="bg-gray-300 h-4 w-1/2 rounded-full" />
            </div>
          </aside>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 flex-1">
            {Array.from({ length: 8 }).map((_, idx) => (
              <div
                key={idx}
                className="border p-4 rounded-xl bg-white shadow flex flex-col space-y-2"
              >
                <div className="bg-gray-200 h-32 w-full rounded" />
                <div className="bg-gray-300 h-4 w-3/4 rounded-full" />
                <div className="bg-gray-300 h-4 w-1/2 rounded-full" />
                <div className="bg-gray-300 h-4 w-1/4 rounded-full" />
                <div className="bg-gray-400 h-10 w-full rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*  Product Page Template */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-700">
          Product Page Template
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Left Column - Product Hero */}
          <div className="space-y-4 md:col-span-3 flex flex-col md:flex-row gap-4">
            {/* Product Images */}
            <div className="flex gap-4 w-full md:w-2/5">
              <div className="flex flex-col space-y-2">
                {Array.from({ length: 4 }).map((_, idx) => (
                  <div key={idx} className="bg-gray-300 h-12 w-12 rounded" />
                ))}
              </div>
              <div className="bg-gray-200 h-64 w-96 rounded" />
            </div>

            {/* Product Features */}
            <div className="flex flex-col w-full space-y-4">
              {/* Product Title */}
              <div className="bg-gray-300 h-6 w-2/3 rounded-full" />

              {/* Product Features List */}
              <ul className="space-y-2">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <li key={idx} className="bg-gray-100 h-4 rounded-full" />
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column - Checkout CTA */}
          <div className="space-y-6 border p-6 rounded-xl shadow">
            <div className="bg-gray-300 h-8 w-1/4 rounded-full" />
            <div className="bg-blue-500 text-white h-12 rounded-lg flex items-center justify-center font-semibold">
              Add to Cart
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
