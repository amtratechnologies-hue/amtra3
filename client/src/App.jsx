import { useState } from 'react'

export default function App() {
  const [form, setForm] = useState({ name: '', phone: '', message: '' })

  const services = [
    { title: 'Web Development', desc: 'Fast, modern aur mobile-friendly websites jo customers ko impress karen.' },
    { title: 'UI/UX Design', desc: 'Saaf suthra aur premium design jo tumhare brand ko professional dikhaye.' },
    { title: 'E-Commerce', desc: 'Online store jo 24/7 sale kare — order, payment aur WhatsApp par easy.' },
    { title: 'Branding', desc: 'Logo, colors aur poori pehchan jo logon ko yaad rahe.' },
    { title: 'Marketing', desc: 'Social media aur ads jo sahi customers tak tumhari baat pohunchayen.' },
    { title: 'Automation', desc: 'Kaam ko automatic karo — time bachao, business barhao.' },
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    const text = `Hello AMTRA! Mera naam ${form.name} hai. Phone: ${form.phone}. Message: ${form.message}`
    window.open(`https://wa.me/923212192954?text=${encodeURIComponent(text)}`, '_blank')
  }

  return (
    <div className="bg-[#06110B] text-white min-h-screen font-sans">
      {/* HEADER */}
      <header className="flex justify-between items-center px-6 md:px-16 py-5 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-400 rounded-lg flex items-center justify-center text-black font-black text-2xl">A</div>
          <div>
            <h1 className="text-2xl font-black tracking-widest leading-none">AMTRA<span className="text-emerald-400">.</span></h1>
            <p className="text-[9px] tracking-[0.2em] text-gray-400 mt-1">ADVANCE MINDS TRANSFORMATION REALITY THROUGH AUTOMATION</p>
          </div>
        </div>
        <a href="#contact" className="bg-emerald-400 text-black px-5 py-2.5 rounded-full font-bold text-sm hover:bg-emerald-300">Start Project</a>
      </header>

      {/* HERO */}
      <section className="text-center px-6 pt-16 pb-20 max-w-5xl mx-auto">
        <p className="text-emerald-400 font-bold tracking-widest text-sm mb-4">● AMTRA — DIGITAL AGENCY</p>
        <h2 className="text-5xl md:text-7xl font-black leading-[1.05]">
          TAKE YOUR<br />
          <span className="bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">BUSINESS</span><br />
          ONLINE
        </h2>
        <p className="text-gray-400 text-lg mt-6 max-w-2xl mx-auto">
          Hum tumhare business ke liye premium website, branding aur automation banate hain — jo sirf khoobsurat nahi, balkay customers bhi laati hai.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <a href="#contact" className="bg-emerald-400 text-black px-7 py-3 rounded-full font-bold">Get Free Quote</a>
          <a href="#services" className="border border-gray-700 px-7 py-3 rounded-full font-bold hover:border-emerald-400">View Services</a>
        </div>
        <div className="flex justify-center gap-8 mt-10 text-sm text-gray-400">
          <span><b className="text-white text-lg">50+</b><br />Projects Done</span>
          <span><b className="text-white text-lg">100%</b><br />Happy Clients</span>
          <span><b className="text-white text-lg">24/7</b><br />Support</span>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="px-6 md:px-16 py-16 max-w-7xl mx-auto">
        <h3 className="text-4xl font-black text-center">Our Core Services</h3>
        <p className="text-gray-400 text-center mt-3 mb-10">Jo kuch tumhare business ko online grow karne ke liye chahiye, sab yahin hai.</p>
        <div className="grid md:grid-cols-3 gap-5">
          {services.map((s) => (
            <div key={s.title} className="bg-[#0C1F14] border border-[#1A3324] p-6 rounded-2xl hover:border-emerald-400">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-green-600 rounded-lg flex items-center justify-center text-black font-black mb-4">{s.title[0]}</div>
              <h4 className="font-bold text-xl mb-2">{s.title}</h4>
              <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="px-6 md:px-16 pb-20 max-w-7xl mx-auto">
        <div className="bg-[#0C1F14] border border-[#1A3324] rounded-3xl p-8 md:p-10 grid md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-4xl font-black leading-tight">Let's Build Something<br /><span className="text-emerald-400">Amazing Together</span></h3>
            <p className="text-gray-400 mt-4">Form bharo — seedha hamare WhatsApp par aa jayega. Hum 1 ghante me reply karenge.</p>
            <a href="https://wa.me/923212192954" target="_blank" className="inline-block mt-6 bg-emerald-400 text-black px-6 py-3 rounded-full font-bold">Chat on WhatsApp</a>
            <p className="text-gray-500 text-sm mt-4">📍 Nawabshah, Sindh, Pakistan<br />✉️ hello@amtra.pk</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input required placeholder="Tumhara Naam" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full bg-[#06110B] border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-emerald-400" />
            <input required placeholder="Phone Number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full bg-[#06110B] border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-emerald-400" />
            <textarea required placeholder="Tumhe kya banwana hai? Website, Logo, Store...?" rows="4" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full bg-[#06110B] border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-emerald-400" />
            <button className="w-full bg-emerald-400 text-black py-3 rounded-xl font-black hover:bg-emerald-300">Send on WhatsApp →</button>
          </form>
        </div>
        <p className="text-center text-gray-500 text-sm mt-10">© 2026 AMTRA — Advance Minds Transformation Reality Through Automation</p>
      </section>
    </div>
  )
}