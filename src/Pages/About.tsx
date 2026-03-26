import { Link } from "react-router"
import {
  Building2, Users, Award, TrendingUp,
  CheckCircle, MapPin,
  Star, Shield, Clock, HeartHandshake
} from "lucide-react"

const stats = [
  { label: "Properties Listed", value: "10,000+", icon: <Building2 size={22} /> },
  { label: "Happy Clients", value: "8,500+", icon: <Users size={22} /> },
  { label: "Cities Covered", value: "12+", icon: <MapPin size={22} /> },
  { label: "Years of Experience", value: "8+", icon: <Award size={22} /> },
]

const team = [
  {
    name: "Ariful Islam",
    role: "Founder & CEO",
    avatar: "https://i.pravatar.cc/150?img=11",
    bio: "15 years in Bangladesh real estate. Former Director at REHAB.",
  },
  {
    name: "Nadia Rahman",
    role: "Head of Operations",
    avatar: "https://i.pravatar.cc/150?img=21",
    bio: "Expert in property management and client relations across Dhaka.",
  },
  {
    name: "Tanvir Hossain",
    role: "Lead Property Consultant",
    avatar: "https://i.pravatar.cc/150?img=33",
    bio: "Specialized in commercial and luxury residential properties.",
  },
  {
    name: "Sadia Akter",
    role: "AI & Tech Lead",
    avatar: "https://i.pravatar.cc/150?img=47",
    bio: "Built the AI search engine that powers property recommendations.",
  },
]

const values = [
  {
    icon: <Shield size={24} />,
    title: "Verified Listings Only",
    desc: "Every property on NestFinder is manually verified by our team before going live. No fake listings, ever.",
  },
  {
    icon: <HeartHandshake size={24} />,
    title: "Owner-First Approach",
    desc: "We connect buyers and renters directly with property owners — no middlemen, no hidden fees.",
  },
  {
    icon: <Clock size={24} />,
    title: "24/7 Support",
    desc: "Our team is available around the clock to help you find the right property or resolve any issue.",
  },
  {
    icon: <TrendingUp size={24} />,
    title: "Market Transparency",
    desc: "We publish real price trends and area insights so you always make informed decisions.",
  },
]

const milestones = [
  { year: "2016", event: "NestFinder founded in Dhaka with 50 listings." },
  { year: "2018", event: "Expanded to Chittagong and Sylhet. Reached 1,000 listings." },
  { year: "2020", event: "Launched mobile-friendly platform. 5,000+ active listings." },
  { year: "2022", event: "Introduced verified owner badges and tour booking system." },
  { year: "2024", event: "Launched AI-powered property search and recommendation engine." },
]

const About = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">

      {/* Hero */}
      <section className="relative bg-blue-800 dark:bg-blue-900 text-white py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1400')", backgroundSize: "cover", backgroundPosition: "center" }}
        />
        <div className="relative max-w-4xl mx-auto text-center">
          <span className="inline-block bg-amber-500 text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest">
            Our Story
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-5 leading-tight">
            Bangladesh's Most Trusted<br />Real Estate Platform
          </h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto leading-relaxed">
            NestFinder was built with one goal — to make finding, renting, and buying property in Bangladesh simple, transparent, and trustworthy for everyone.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map(s => (
            <div key={s.label} className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center border border-gray-200 dark:border-gray-700">
              <div className="flex justify-center mb-3 text-blue-800 dark:text-blue-400">{s.icon}</div>
              <div className="text-3xl font-bold text-blue-800 dark:text-blue-400 mb-1">{s.value}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-amber-500 font-semibold text-sm uppercase tracking-widest">Our Mission</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-2 mb-5 leading-tight">
              Making Property Search Honest and Simple
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              In Bangladesh, finding a reliable rental or property to buy has always been difficult — full of middlemen, inflated prices, and unverified listings. NestFinder was created to fix that.
            </p>
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              We give property owners a direct platform to list their properties, and give seekers the tools to search, compare, and connect — all without unnecessary friction.
            </p>
            <ul className="space-y-3">
              {[
                "All listings are manually verified before publishing",
                "Direct owner contact — no broker required",
                "AI-powered search for smarter results",
                "Transparent pricing with no hidden charges",
              ].map(item => (
                <li key={item} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <CheckCircle size={16} className="text-green-500 mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=700"
              alt="Modern apartment building in Dhaka"
              className="w-full h-80 object-cover"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-amber-500 font-semibold text-sm uppercase tracking-widest">What We Stand For</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map(v => (
              <div key={v.title} className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 flex gap-4">
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 rounded-xl flex items-center justify-center shrink-0">
                  {v.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{v.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-amber-500 font-semibold text-sm uppercase tracking-widest">How We Got Here</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">Our Journey</h2>
          </div>
          <div className="relative border-l-2 border-blue-800 dark:border-blue-600 pl-8 space-y-8">
            {milestones.map((m, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-10.5 w-5 h-5 bg-blue-800 dark:bg-blue-600 rounded-full border-4 border-white dark:border-gray-950" />
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-200 dark:border-gray-700">
                  <span className="text-amber-500 font-bold text-sm">{m.year}</span>
                  <p className="text-gray-700 dark:text-gray-300 mt-1 text-sm">{m.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-amber-500 font-semibold text-sm uppercase tracking-widest">The People Behind NestFinder</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">Meet Our Team</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map(m => (
              <div key={m.name} className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center border border-gray-200 dark:border-gray-700">
                <img
                  src={m.avatar}
                  alt={m.name}
                  className="w-20 h-20 rounded-2xl object-cover mx-auto mb-4"
                />
                <div className="font-bold text-gray-900 dark:text-white">{m.name}</div>
                <div className="text-xs text-blue-800 dark:text-blue-400 font-medium mb-2">{m.role}</div>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-blue-800 dark:bg-blue-900 rounded-3xl p-10 text-white text-center">
            <div className="flex justify-center gap-1 mb-4">
              {Array(5).fill(0).map((_, i) => (
                <Star key={i} size={18} className="text-amber-400 fill-amber-400" />
              ))}
            </div>
            <p className="text-xl font-medium leading-relaxed mb-6">
              "I found my 3-bedroom apartment in Mirpur within 3 days of searching on NestFinder. The owner's contact was real, the photos matched perfectly, and there were zero hidden costs."
            </p>
            <div className="flex items-center justify-center gap-3">
              <img src="https://i.pravatar.cc/48?img=12" alt="" className="w-12 h-12 rounded-full object-cover border-2 border-white/30" />
              <div className="text-left">
                <div className="font-semibold">Mehedi Hassan</div>
                <div className="text-blue-200 text-sm">Tenant, Dhaka</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Ready to Find Your Next Home?
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-xl mx-auto">
          Browse thousands of verified properties across Bangladesh — apartments, houses, commercial spaces, and land.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/explore"
            className="bg-blue-800 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-900 transition-colors"
          >
            Browse Properties
          </Link>
          <Link
            to="/contact"
            className="border border-blue-800 text-blue-800 dark:text-blue-400 dark:border-blue-400 px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>

    </div>
  )
}

export default About