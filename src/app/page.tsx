import { categories, getPopularTools, getToolsByCategory } from "@/data/tools";
import CategoryCard from "@/components/common/CategoryCard";
import ToolCard from "@/components/common/ToolCard";
import AdBanner from "@/components/ads/AdBanner";

export default function Home() {
  const popularTools = getPopularTools();

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-[var(--primary-50)] to-[var(--background)] dark:from-[var(--gray-900)] dark:to-[var(--background)]">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="gradient-text">Free Online Calculators</span>
            <br />
            <span className="text-[var(--foreground)]">& Tools</span>
          </h1>
          <p className="text-lg md:text-xl text-[var(--foreground-secondary)] max-w-2xl mx-auto mb-8">
            Fast, accurate, and easy-to-use calculators for everyday needs.
            From health & fitness to finance & pregnancy — we&apos;ve got you covered.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search calculators..."
                className="input pl-12 py-4 text-lg rounded-full shadow-lg"
              />
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--gray-400)]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Calculators */}
      <section className="py-12 md:py-16">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">🔥 Popular Calculators</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {popularTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} showCategory />
            ))}
          </div>
        </div>
      </section>

      {/* Ad Banner Placeholder */}
      <section className="py-4">
        <div className="container">
          <AdBanner slot="homepage-top" />
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 md:py-16">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">📂 Browse by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                toolCount={getToolsByCategory(category.id).length}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-16 bg-[var(--background-secondary)]">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Why Choose CalcBox?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--primary-100)] rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
                ⚡
              </div>
              <h3 className="text-lg font-semibold mb-2">Lightning Fast</h3>
              <p className="text-[var(--foreground-secondary)]">
                Instant calculations with no page reloads. Get results in milliseconds.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--success-100)] rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
                ✅
              </div>
              <h3 className="text-lg font-semibold mb-2">100% Accurate</h3>
              <p className="text-[var(--foreground-secondary)]">
                All calculators are thoroughly tested and use industry-standard formulas.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--secondary-100)] rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
                📱
              </div>
              <h3 className="text-lg font-semibold mb-2">Works Everywhere</h3>
              <p className="text-[var(--foreground-secondary)]">
                Fully responsive design. Use on desktop, tablet, or mobile.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20">
        <div className="container text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Can&apos;t find what you need?
          </h2>
          <p className="text-[var(--foreground-secondary)] mb-6">
            We&apos;re always adding new calculators. Let us know what you&apos;d like to see!
          </p>
          <button className="btn btn-primary text-lg px-8 py-4 rounded-full">
            Request a Calculator
          </button>
        </div>
      </section>
    </div>
  );
}
