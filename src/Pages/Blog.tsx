import { useState } from "react";
import { Clock, ArrowLeft, Search } from "lucide-react";
import Navbar from "../Components/Layout/Navbar";
import Footer from "../Components/Layout/Footer";

// ─── Types ─────────────────────────────────────────────────────────
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  authorAvatar: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
}

// ─── Blog Data ──────────────────────────────────────────────────────
const posts: BlogPost[] = [
  {
    id: "1",
    title: "Dhaka Rental Market 2024: What Tenants Need to Know",
    excerpt:
      "Rental prices in Dhaka have shifted significantly this year. Here's a neighbourhood-by-neighbourhood breakdown of what to expect and how to negotiate.",
    content: `The rental market in Dhaka in 2024 has been shaped by two major forces: rising construction costs and increased demand from young professionals moving into the city.

In Banani and Gulshan, average 2-bedroom flat rents now sit between ৳35,000 and ৳55,000 per month. In Mirpur, the same flat costs between ৳12,000 and ৳20,000. Mohammadpur remains a popular middle-ground, averaging ৳18,000 to ৳28,000.

**What's driving prices up?**

Construction material costs rose sharply after 2022 and building owners have passed that cost onto tenants. At the same time, a growing number of dual-income families are willing to pay a premium for better locations.

**Tips for tenants:**

First, always visit the property in person before paying any advance. Second, negotiate for a 2-year lease to lock in the current price. Third, check whether the service charge (utility and maintenance fees) is included in the quoted rent — it often isn't, and can add ৳2,000–৳5,000 extra per month.

NestFinder lists all properties with the full breakdown of rent versus additional charges, so you're never surprised.`,
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800",
    author: "Ariful Islam",
    authorAvatar: "https://i.pravatar.cc/40?img=11",
    date: "March 15, 2024",
    readTime: "5 min read",
    category: "Market Trends",
    tags: ["Dhaka", "Rental", "2024", "Market"],
  },
  {
    id: "2",
    title: "5 Red Flags to Watch Before Signing a Rental Agreement",
    excerpt:
      "A rental agreement protects both the tenant and the owner. These are the five clauses you must check before putting pen to paper.",
    content: `Signing a rental agreement without reading it carefully is one of the most common mistakes first-time tenants make in Bangladesh. Here are five things you must check.

**1. Advance payment terms**
A standard advance is 2–3 months in Bangladesh. If an owner asks for 6 months upfront without a clear reason, that's a red flag. Always get a written receipt.

**2. Rent increase clause**
Does the agreement specify when and by how much rent can increase? Without this clause, an owner can raise rent after 6 months with little notice.

**3. Maintenance responsibility**
Who pays for repairs? A broken water pump, a leaking roof, a faulty wiring — make sure the agreement clearly states who bears the cost for major repairs.

**4. Sub-letting clause**
If you plan to have a roommate, check whether sub-letting is allowed. Many agreements in Dhaka prohibit it.

**5. Early termination penalty**
Life changes — jobs move, families grow. Know what penalty you'll pay if you need to leave before the agreement ends.

NestFinder recommends always having your agreement reviewed by a lawyer or an experienced agent before signing, especially for commercial properties.`,
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800",
    author: "Nadia Rahman",
    authorAvatar: "https://i.pravatar.cc/40?img=21",
    date: "February 28, 2024",
    readTime: "4 min read",
    category: "Tenant Guide",
    tags: ["Legal", "Rental", "Agreement", "Guide"],
  },
  {
    id: "3",
    title: "Best Areas to Invest in Real Estate in Chittagong Right Now",
    excerpt:
      "Chittagong's property market is growing fast. These three areas offer the best return on investment for 2024 buyers.",
    content: `Chittagong is Bangladesh's second largest city and its port-driven economy makes it one of the most stable property markets in the country. Here are the top areas to invest in right now.

**Nasirabad**
A well-established residential neighbourhood with good schools, hospitals, and road access. Apartment prices have risen 18% over the last two years, and demand remains consistently strong.

**Agrabad**
The commercial hub of Chittagong. Commercial shop space and small offices here offer rental yields of 8–12% annually, well above Dhaka averages. Ideal for investors who want monthly income.

**Halishahar**
An emerging area that's benefiting from new road infrastructure. Land prices are still relatively affordable, and analysts expect significant appreciation over the next 5 years as the area develops.

**What to avoid**
Areas near the port with heavy truck traffic tend to have lower long-term appreciation due to noise and air quality concerns. Always check the development plan for an area before buying.

NestFinder lists properties in all three of these areas with verified owner contacts and accurate price data.`,
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800",
    author: "Tanvir Hossain",
    authorAvatar: "https://i.pravatar.cc/40?img=33",
    date: "February 10, 2024",
    readTime: "6 min read",
    category: "Investment",
    tags: ["Chittagong", "Investment", "Property", "ROI"],
  },
  {
    id: "4",
    title: "How AI Is Changing the Way Bangladeshis Search for Property",
    excerpt:
      "From smart search to instant review summaries, artificial intelligence is making property search faster and more reliable.",
    content: `Finding the right property used to mean spending weekends visiting dozens of flats, calling unreliable brokers, and sifting through outdated listings. AI is changing all of that.

**AI-Powered Smart Search**
Instead of filtering by specific fields, you can now describe what you want in plain language. "3-bedroom flat in Mirpur near a school, under 20,000 BDT" returns exactly matching results — no manual filter setup needed.

**Instant Review Summaries**
Reading 30 reviews for a property takes time. AI can now summarise them into a single paragraph: "Tenants consistently praise the location and building security. Common complaints relate to water supply issues on higher floors."

**Price Prediction**
Machine learning models trained on historical price data can now estimate whether a property is overpriced or a good deal relative to the area average.

**What AI can't replace**
A physical visit, a face-to-face conversation with the owner, and your own gut feeling about a neighbourhood. Use AI to shortlist — but always visit before committing.

NestFinder uses the Google Gemini API to power its AI property assistant, available 24/7 via the chat button on every page.`,
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800",
    author: "Sadia Akter",
    authorAvatar: "https://i.pravatar.cc/40?img=47",
    date: "January 22, 2024",
    readTime: "5 min read",
    category: "Technology",
    tags: ["AI", "Technology", "Property Search", "Innovation"],
  },
  {
    id: "5",
    title: "First-Time Buyer's Guide: Purchasing Flat in Dhaka",
    excerpt:
      "Buying your first flat in Dhaka? Here's the complete step-by-step process from budgeting to final registration.",
    content: `Buying your first property in Bangladesh is a significant financial and emotional milestone. Here's how to do it right.

**Step 1: Define your budget**
Include the flat price, registration fees (around 10–12% of the deed value), renovation costs, and a 6-month emergency fund. Never spend your entire savings on the purchase.

**Step 2: Choose the right developer**
For under-construction projects, verify the developer's track record. Check REHAB membership, previous project delivery records, and customer reviews.

**Step 3: Verify the land title**
This is the most critical step. Hire a lawyer to verify the original land title (khatian), check for any disputes or mortgages, and confirm the developer has proper approvals.

**Step 4: Understand the deed**
The sale deed specifies your flat number, floor, area, price breakdown, and delivery date. Read every clause carefully before signing.

**Step 5: Registration**
After payment, the deed must be registered at the Sub-Registry Office. Bring all original documents, the developer's representative, and two witnesses.

**Step 6: Utility connections**
After registration, apply for electricity (DESCO/DPDC), gas (Titas), and water (WASA) connections in your name.

NestFinder's team can connect you with verified legal consultants who specialise in property registration in Bangladesh.`,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
    author: "Ariful Islam",
    authorAvatar: "https://i.pravatar.cc/40?img=11",
    date: "January 5, 2024",
    readTime: "8 min read",
    category: "Buyer Guide",
    tags: ["Buying", "Dhaka", "First Time", "Legal"],
  },
  {
    id: "6",
    title:
      "Commercial vs Residential: Which Property Type Gives Better Returns?",
    excerpt:
      "Both have their place in a smart portfolio. Here's how to decide which works best for your goals and risk appetite.",
    content: `One of the most common questions from property investors in Bangladesh is: should I buy a residential flat to rent out, or a commercial space?

**Residential properties**
Pros: Easier to find tenants, lower entry price, more liquid (easier to sell). Cons: Lower rental yield (typically 4–6% annually), more tenant management required.

**Commercial properties**
Pros: Higher rental yield (7–14% annually), longer lease terms, tenants typically pay for maintenance. Cons: Higher entry cost, harder to find tenants during downturns, less liquid.

**Mixed-use buildings**
Ground-floor commercial with upper-floor residential — this is increasingly popular in Dhaka and Chittagong. The commercial portion funds the mortgage while the residential provides stability.

**The verdict**
For first-time investors with limited capital: residential is safer. For experienced investors looking for higher returns and willing to wait longer for tenants: commercial offers better yield.

In all cases, location matters more than property type. A residential flat in Gulshan will outperform a commercial space in a remote suburb.`,
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
    author: "Tanvir Hossain",
    authorAvatar: "https://i.pravatar.cc/40?img=33",
    date: "December 18, 2023",
    readTime: "6 min read",
    category: "Investment",
    tags: ["Commercial", "Residential", "Investment", "Returns"],
  },
];

const categories = [
  "All",
  "Market Trends",
  "Tenant Guide",
  "Investment",
  "Technology",
  "Buyer Guide",
];

// ─── Blog Detail View ───────────────────────────────────────────────
const BlogDetail = ({
  post,
  onBack,
}: {
  post: BlogPost;
  onBack: () => void;
}) => {
  const related = posts
    .filter((p) => p.id !== post.id && p.category === post.category)
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero image */}
      <div className="relative h-72 md:h-96">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
        <button
          onClick={onBack}
          className="absolute top-6 left-6 flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-xl text-sm hover:bg-white/30 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Blog
        </button>
        <div className="absolute bottom-6 left-6 right-6">
          <span className="inline-block bg-blue-800 text-white text-xs px-3 py-1 rounded-lg mb-3">
            {post.category}
          </span>
          <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight">
            {post.title}
          </h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 mb-8 pb-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <img
              src={post.authorAvatar}
              alt={post.author}
              className="w-8 h-8 rounded-full"
            />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {post.author}
            </span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
            <Clock size={14} /> {post.date}
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
            <Clock size={14} /> {post.readTime}
          </div>
        </div>

        {/* Content */}
        <div className="prose dark:prose-invert max-w-none">
          {post.content.split("\n\n").map((para, i) => {
            if (para.startsWith("**") && para.endsWith("**")) {
              return (
                <h3
                  key={i}
                  className="text-lg font-bold text-gray-900 dark:text-white mt-6 mb-2"
                >
                  {para.replace(/\*\*/g, "")}
                </h3>
              );
            }
            const withBold = para.replace(
              /\*\*(.*?)\*\*/g,
              "<strong>$1</strong>",
            );
            return (
              <p
                key={i}
                className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 text-[15px]"
                dangerouslySetInnerHTML={{ __html: withBold }}
              />
            );
          })}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 px-3 py-1 rounded-lg"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Related posts */}
        {related.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-5">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {related.map((r) => (
                <button
                  key={r.id}
                  onClick={onBack}
                  className="bg-gray-50 dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 text-left hover:border-blue-800 dark:hover:border-blue-400 transition-colors"
                >
                  <img
                    src={r.image}
                    alt={r.title}
                    className="w-full h-36 object-cover"
                  />
                  <div className="p-4">
                    <div className="text-xs text-blue-800 dark:text-blue-400 mb-1">
                      {r.category}
                    </div>
                    <div className="font-semibold text-gray-900 dark:text-white text-sm leading-snug">
                      {r.title}
                    </div>
                    <div className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                      {r.readTime}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Blog List Page ─────────────────────────────────────────────────
const Blog = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = posts.filter((p) => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  if (selectedPost) {
    return (
      <BlogDetail post={selectedPost} onBack={() => setSelectedPost(null)} />
    );
  }

  const [featured, ...rest] = filtered;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Navbar */}
      <Navbar />

      {/* Hero */}
      <section className="bg-blue-800 dark:bg-blue-900 text-white py-20 px-4 text-center">
        <span className="inline-block bg-amber-500 text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest">
          NestFinder Blog
        </span>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Property Insights for Bangladesh
        </h1>
        <p className="text-blue-100 text-lg max-w-xl mx-auto">
          Market trends, tenant guides, investment tips, and real estate news —
          written by our team of property experts.
        </p>

        {/* Search */}
        <div className="relative max-w-md mx-auto mt-8">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white dark:bg-gray-800 text-gray-800 dark:text-white text-sm outline-none border border-white/20 focus:border-amber-400"
          />
        </div>
      </section>

      {/* Category filter */}
      <section className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
        <div className="max-w-5xl mx-auto flex gap-2 overflow-x-auto scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 px-4 py-1.5 rounded-xl text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-blue-800 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-5xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">📰</div>
              <div className="text-gray-500 dark:text-gray-400">
                No articles found matching your search.
              </div>
            </div>
          ) : (
            <>
              {/* Featured post */}
              {featured && (
                <button
                  onClick={() => setSelectedPost(featured)}
                  className="w-full mb-10 bg-gray-50 dark:bg-gray-800 rounded-3xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-blue-800 dark:hover:border-blue-400 transition-colors text-left group"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    <img
                      src={featured.image}
                      alt={featured.title}
                      className="w-full h-64 md:h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="p-7 flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs bg-blue-800 text-white px-3 py-1 rounded-lg">
                          {featured.category}
                        </span>
                        <span className="text-xs text-amber-500 font-semibold">
                          Featured
                        </span>
                      </div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 leading-snug group-hover:text-blue-800 dark:group-hover:text-blue-400 transition-colors">
                        {featured.title}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-5 line-clamp-3">
                        {featured.excerpt}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                        <img
                          src={featured.authorAvatar}
                          alt=""
                          className="w-7 h-7 rounded-full"
                        />
                        <span>{featured.author}</span>
                        <span>·</span>
                        <span>{featured.date}</span>
                        <span>·</span>
                        <span>{featured.readTime}</span>
                      </div>
                    </div>
                  </div>
                </button>
              )}

              {/* Rest of posts grid */}
              {rest.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rest.map((post) => (
                    <button
                      key={post.id}
                      onClick={() => setSelectedPost(post)}
                      className="bg-gray-50 dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-blue-800 dark:hover:border-blue-400 transition-colors text-left group flex flex-col"
                    >
                      <div className="overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 px-2.5 py-0.5 rounded-lg">
                            {post.category}
                          </span>
                          <span className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
                            <Clock size={11} /> {post.readTime}
                          </span>
                        </div>
                        <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-sm leading-snug group-hover:text-blue-800 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed mb-4 line-clamp-2 flex-1">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 pt-3 border-t border-gray-100 dark:border-gray-700">
                          <img
                            src={post.authorAvatar}
                            alt=""
                            className="w-6 h-6 rounded-full"
                          />
                          <span>{post.author}</span>
                          <span>·</span>
                          <span>{post.date}</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Stay Ahead of the Market
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-6">
            Get weekly property insights, price alerts, and investment tips from
            our team — directly in your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white text-sm outline-none focus:border-blue-800"
            />
            <button className="bg-blue-800 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-blue-900 transition-colors shrink-0">
              Subscribe
            </button>
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-3">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Blog;
