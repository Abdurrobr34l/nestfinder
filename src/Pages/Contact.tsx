import { useState } from "react"
import {
  MapPin, Phone, Mail, Clock,
  MessageCircle, Send, CheckCircle, Loader2
} from "lucide-react"

const offices = [
  {
    city: "Dhaka (HQ)",
    address: "House 12, Road 5, Block C, Banani, Dhaka-1213",
    phone: "+880 1711-123456",
    email: "dhaka@nestfinder.com",
    hours: "Sat–Thu: 9am – 7pm",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.4!2d90.4!3d23.79!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ3JzI0LjAiTiA5MMKwMjQnMDAuMCJF!5e0!3m2!1sen!2sbd!4v1",
  },
  {
    city: "Chittagong",
    address: "Flat 4B, Nasirabad Housing Society, Chittagong-4000",
    phone: "+880 1811-654321",
    email: "ctg@nestfinder.com",
    hours: "Sat–Thu: 9am – 6pm",
    mapEmbed: "",
  },
]

const faqs = [
  {
    q: "How do I list my property on NestFinder?",
    a: "Click 'Submit Your Property' from the homepage, fill in the details and photos, and our team will verify and publish it within 24 hours.",
  },
  {
    q: "Is there a fee to list a property?",
    a: "The first listing is completely free. Additional listings and featured placements have a small fee. Contact us for the latest pricing.",
  },
  {
    q: "How do I contact a property owner?",
    a: "Login to your account, go to the property details page, and click 'Show Number' or 'Chat on WhatsApp' to reach the owner directly.",
  },
  {
    q: "How long does property verification take?",
    a: "Our team typically verifies and publishes submitted properties within 24 working hours after submission.",
  },
]

type FormData = {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

type FormErrors = Partial<Record<keyof FormData, string>>

const Contact = () => {
  const [form, setForm] = useState<FormData>({
    name: "", email: "", phone: "", subject: "", message: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const validate = (): boolean => {
    const newErrors: FormErrors = {}
    if (!form.name.trim()) newErrors.name = "Name is required"
    if (!form.email.trim()) newErrors.email = "Email is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Enter a valid email"
    if (!form.subject.trim()) newErrors.subject = "Subject is required"
    if (!form.message.trim()) newErrors.message = "Message is required"
    else if (form.message.trim().length < 20) newErrors.message = "Message must be at least 20 characters"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    await new Promise(res => setTimeout(res, 1800))
    setLoading(false)
    setSuccess(true)
    setForm({ name: "", email: "", phone: "", subject: "", message: "" })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">

      {/* Hero */}
      <section className="bg-blue-800 dark:bg-blue-900 text-white py-20 px-4 text-center">
        <span className="inline-block bg-amber-500 text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest">
          Get In Touch
        </span>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">We're Here to Help</h1>
        <p className="text-blue-100 text-lg max-w-xl mx-auto">
          Have a question about a listing, want to list your property, or need help with your account? Reach out — we respond within a few hours.
        </p>
      </section>

      {/* Contact info cards */}
      <section className="py-14 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: <Phone size={20} />, label: "Call Us", value: "+880 1711-123456", sub: "Sat–Thu, 9am–7pm" },
            { icon: <Mail size={20} />, label: "Email Us", value: "support@nestfinder.com", sub: "We reply within 4 hours" },
            { icon: <MapPin size={20} />, label: "Head Office", value: "Banani, Dhaka-1213", sub: "Bangladesh" },
            { icon: <MessageCircle size={20} />, label: "WhatsApp", value: "+880 1711-123456", sub: "Chat with us directly" },
          ].map(c => (
            <div key={c.label} className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-200 dark:border-gray-700 text-center">
              <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 rounded-xl flex items-center justify-center mx-auto mb-3">
                {c.icon}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{c.label}</div>
              <div className="font-semibold text-gray-900 dark:text-white text-sm">{c.value}</div>
              <div className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{c.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Form + Map */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Send Us a Message</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
              Fill in the form and our team will get back to you within a few hours.
            </p>

            {success ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle size={32} className="text-green-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Message Sent!</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                  Thank you for reaching out. We'll get back to you within a few hours.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="bg-blue-800 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-900 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1 block">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white transition-colors ${
                        errors.name
                          ? "border-red-400 focus:border-red-500"
                          : "border-gray-200 dark:border-gray-700 focus:border-blue-800 dark:focus:border-blue-400"
                      }`}
                    />
                    {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1 block">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white transition-colors ${
                        errors.email
                          ? "border-red-400 focus:border-red-500"
                          : "border-gray-200 dark:border-gray-700 focus:border-blue-800 dark:focus:border-blue-400"
                      }`}
                    />
                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1 block">
                    Phone Number <span className="text-gray-400">(optional)</span>
                  </label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+880 1700-000000"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm outline-none bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white focus:border-blue-800 dark:focus:border-blue-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1 block">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white transition-colors ${
                      errors.subject
                        ? "border-red-400"
                        : "border-gray-200 dark:border-gray-700 focus:border-blue-800 dark:focus:border-blue-400"
                    }`}
                  >
                    <option value="">Select a subject</option>
                    <option value="list-property">I want to list a property</option>
                    <option value="property-inquiry">Property inquiry</option>
                    <option value="account-issue">Account issue</option>
                    <option value="report-listing">Report a listing</option>
                    <option value="partnership">Business / partnership</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.subject && <p className="text-xs text-red-500 mt-1">{errors.subject}</p>}
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1 block">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Describe your question or request in detail..."
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white resize-none transition-colors ${
                      errors.message
                        ? "border-red-400 focus:border-red-500"
                        : "border-gray-200 dark:border-gray-700 focus:border-blue-800 dark:focus:border-blue-400"
                    }`}
                  />
                  {errors.message && <p className="text-xs text-red-500 mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-blue-800 text-white py-3 rounded-xl font-semibold text-sm hover:bg-blue-900 disabled:opacity-70 transition-colors"
                >
                  {loading ? (
                    <><Loader2 size={16} className="animate-spin" /> Sending...</>
                  ) : (
                    <><Send size={16} /> Send Message</>
                  )}
                </button>

                {/* WhatsApp button */}
                <a
                  href="https://wa.me/8801711123456"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-green-500 text-white py-3 rounded-xl font-semibold text-sm hover:bg-green-600 transition-colors"
                >
                  <MessageCircle size={16} />
                  Chat on WhatsApp Instead
                </a>
              </form>
            )}
          </div>

          {/* Office info + map */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Our Offices</h2>
            {offices.map(o => (
              <div key={o.city} className="bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                {o.mapEmbed && (
                  <iframe
                    src={o.mapEmbed}
                    width="100%"
                    height="200"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    title={`${o.city} office map`}
                    className="w-full"
                  />
                )}
                {!o.mapEmbed && (
                  <div className="h-32 bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                    <MapPin size={32} className="text-blue-800 dark:text-blue-400 opacity-40" />
                  </div>
                )}
                <div className="p-5 space-y-2">
                  <div className="font-bold text-gray-900 dark:text-white">{o.city}</div>
                  <div className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <MapPin size={14} className="text-blue-800 dark:text-blue-400 mt-0.5 shrink-0" /> {o.address}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <Phone size={14} className="text-blue-800 dark:text-blue-400 shrink-0" /> {o.phone}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <Mail size={14} className="text-blue-800 dark:text-blue-400 shrink-0" /> {o.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <Clock size={14} className="text-blue-800 dark:text-blue-400 shrink-0" /> {o.hours}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-amber-500 font-semibold text-sm uppercase tracking-widest">Common Questions</span>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                >
                  <span className="font-medium text-gray-900 dark:text-white text-sm pr-4">{faq.q}</span>
                  <span className={`text-blue-800 dark:text-blue-400 shrink-0 text-lg font-light transition-transform ${openFaq === i ? "rotate-45" : ""}`}>+</span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4">
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}

export default Contact