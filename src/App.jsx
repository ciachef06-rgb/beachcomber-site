import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";

const menuItems = [
  {
    category: "Signature Selections",
    items: [
      { name: "She Crab Soup", desc: "A rich, creamy Atlantic classic finished with sherry and seasoned to perfection.", price: "TBD" },
      { name: "Crab Cake Sandwich", desc: "Premium lump crab meat on a toasted artisan bun with spicy, creamy dynamite sauce.", price: "$20" },
      { name: "VB Poutine Fries", desc: "Crispy Old Bay fries topped with our signature rich, creamy She Crab Soup.", price: "TBD" },
      { name: "Flounder Nuggets", desc: "Crispy, golden-fried Atlantic flounder served with lemon and house-made tartar sauce.", price: "$15" },
      { name: "Catch of the Day", desc: "Fresh local seafood prepared seared, blackened, or fried. Ask about today’s local landing.", price: "Market" },
    ],
  },
  {
    category: "The Shrimp Trio",
    items: [
      { name: "Old Bay & Peach", desc: "Succulent shrimp seasoned with Old Bay and paired with savory-sweet bacon-peach chutney.", price: "$15" },
      { name: "Teriyaki & Mango", desc: "Glazed teriyaki shrimp with vibrant mango sauce and a fresh jalapeño kick.", price: "$15" },
      { name: "Spicy & Cucumber", desc: "Zesty shrimp balanced by a cool, creamy cucumber-yogurt raita.", price: "$15" },
    ],
  },
  {
    category: "Sides & Refreshments",
    items: [
      { name: "Beignet-Style Hushpuppies", desc: "Light, fluffy, slightly sweet hushpuppies with a delicate savory-sweet coastal texture.", price: "TBD" },
      { name: "Old Bay Fries", desc: "Crispy fries tossed with classic Old Bay seasoning.", price: "TBD" },
      { name: "Tangy Cole Slaw", desc: "Cool, creamy, and tangy slaw built to pair with seafood.", price: "TBD" },
      { name: "Kettle Chips", desc: "Simple, crunchy, and satisfying.", price: "TBD" },
      { name: "Refreshments", desc: "Sweet tea, unsweet tea, assorted sodas, and bottled water.", price: "TBD" },
    ],
  },
];

const events = [
  { title: "Virginia Beach Launch", date: "Targeting January 2027", location: "Virginia Beach and Hampton Roads" },
  { title: "Private Catering", date: "Booking inquiries welcome", location: "Parties, corporate lunches, military events, and community gatherings" },
  { title: "Pop-Ups & Partnerships", date: "Dates TBD", location: "Breweries, farmers markets, festivals, office parks, and beach-area events" },
];

const navItems = ["Home", "Menu", "About", "Catering", "Locations", "Contact"];
const socialLinks = [
  { label: "Instagram", href: "https://instagram.com/vbbeachcomber" }
];

function runBasicDataTests() {
  console.assert(Array.isArray(menuItems), "menuItems should be an array");
  console.assert(menuItems.length === 3, "menuItems should have three menu categories");
  console.assert(menuItems.some((group) => group.category === "Signature Selections"), "Signature Selections category should exist");
  console.assert(menuItems.every((group) => Array.isArray(group.items) && group.items.length > 0), "Every menu category should contain at least one item");
  console.assert(events.length === 3, "events should contain three cards");
}
runBasicDataTests();

function Icon({ name, className = "h-6 w-6" }) {
  const common = { className, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": "true" };
  const icons = {
    anchor: <svg {...common}><path d="M12 2v13" /><path d="M8 6h8" /><circle cx="12" cy="6" r="2" /><path d="M5 12H2a10 10 0 0 0 20 0h-3" /></svg>,
    chef: <svg {...common}><path d="M6 15h12v6H6z" /><path d="M6 15c-2-1-3-3-2-5 1-2 3-2 4-1 1-3 7-3 8 0 1-1 3-1 4 1 1 2 0 4-2 5" /></svg>,
    fish: <svg {...common}><path d="M6.5 12c2.2-4.2 6.7-6 11.5-3.5 1.2.6 2.2 1.5 3 2.5-.8 1-1.8 1.9-3 2.5-4.8 2.5-9.3.7-11.5-3.5Z" /><path d="M6.5 12 3 8v8l3.5-4Z" /><circle cx="16" cy="11" r=".8" fill="currentColor" stroke="none" /></svg>,
    mail: <svg {...common}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>,
    mapPin: <svg {...common}><path d="M12 21s7-4.4 7-11a7 7 0 1 0-14 0c0 6.6 7 11 7 11Z" /><circle cx="12" cy="10" r="2.5" /></svg>,
    menu: <svg {...common}><path d="M4 6h16M4 12h16M4 18h16" /></svg>,
    palm: <svg {...common}><path d="M12 22V9" /><path d="M12 9C9 4 5 3 2 5c4 0 7 2 10 4Z" /><path d="M12 9c3-5 7-6 10-4-4 0-7 2-10 4Z" /><path d="M12 9C8 8 5 9 3 12c4-2 7-2 9-3Z" /><path d="M12 9c4-1 7 0 9 3-4-2-7-2-9-3Z" /></svg>,
    phone: <svg {...common}><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7A2 2 0 0 1 22 16.9Z" /></svg>,
    shell: <svg {...common}><path d="M12 3C7.5 6.5 5 10.7 5 16a7 7 0 0 0 14 0c0-5.3-2.5-9.5-7-13Z" /><path d="M12 3v18M8 8.5l4 12.5M16 8.5 12 21M6 14h12" /></svg>,
    waves: <svg {...common}><path d="M3 7c2 2 4 2 6 0s4-2 6 0 4 2 6 0M3 12c2 2 4 2 6 0s4-2 6 0 4 2 6 0M3 17c2 2 4 2 6 0s4-2 6 0 4 2 6 0" /></svg>,
    x: <svg {...common}><path d="M18 6 6 18M6 6l12 12" /></svg>,
  };
  return icons[name] || icons.shell;
}
function SocialLinks() {
  return (
    <div className="flex items-center gap-3">
      {socialLinks.map((social) => (
        <a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-orange-200 bg-white/70 px-4 py-2 text-sm font-black text-[#07313B] transition hover:bg-orange-100 hover:text-[#E56419]"
        >
          {social.label}
        </a>
      ))}
    </div>
  );
}
function Logo() {
  return (
    <a href="#top" className="block leading-none text-[#07313B]">
      <div className="font-serif text-4xl font-black italic tracking-tight md:text-5xl">The</div>
      <div className="-mt-3 font-serif text-5xl font-black italic tracking-tight md:text-6xl">Be@chcomber</div>
      <div className="mt-1 text-center text-sm font-black uppercase tracking-[0.32em] text-[#E56419]">Virginia Beach</div>
    </a>
  );
}

function Button({ href, children, variant = "primary", className = "" }) {
  const base = "inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-black transition focus:outline-none focus:ring-2 focus:ring-[#E56419] focus:ring-offset-2";
  const styles = variant === "ghost" ? "bg-transparent text-[#07313B] hover:text-[#E56419]" : "bg-gradient-to-r from-[#E87814] to-[#D85A1A] text-white shadow-lg shadow-orange-500/20 hover:scale-[1.02]";
  return <a href={href} className={`${base} ${styles} ${className}`}>{children}</a>;
}

function SectionHeader({ eyebrow, title, children }) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      <div className="mx-auto mb-4 flex items-center justify-center gap-4 text-[#E56419]"><span className="h-px w-10 bg-[#E56419]" /><Icon name="shell" className="h-6 w-6" /><span className="h-px w-10 bg-[#E56419]" /></div>
      {eyebrow && <p className="mb-2 text-sm font-black uppercase tracking-[0.25em] text-[#E56419]">{eyebrow}</p>}
      <h2 className="font-serif text-4xl font-black tracking-tight text-[#07313B] md:text-5xl">{title}</h2>
      {children && <p className="mt-4 text-base leading-7 text-[#1C2F35] md:text-lg">{children}</p>}
    </div>
  );
}

function TrailerHeroArt() {
  return (
    <div className="overflow-hidden rounded-[2rem] shadow-2xl ring-1 ring-orange-200 bg-white">
      <img
        src="/beachcomber-hero.png"
        alt="Be@chcomber Seafood Trailer"
        className="h-[360px] w-full object-cover object-center md:h-[460px]"
      />
    </div>
  );
}

function FeatureCard({ icon, title, children }) {
  return (
    <div className="px-8 text-center md:border-r md:border-orange-200 last:border-r-0">
      <Icon name={icon} className="mx-auto mb-4 h-11 w-11 text-[#E56419]" />
      <h3 className="text-xl font-black text-[#07313B]">{title}</h3>
      <p className="mt-2 leading-7 text-[#1C2F35]">{children}</p>
    </div>
  );
}

function Card({ children, className = "" }) {
  return <div className={`rounded-3xl border border-orange-100 bg-white/85 shadow-sm ${className}`}>{children}</div>;
}

export default function BeachcomberWebsite() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Signature Selections");
  const currentMenu = useMemo(() => menuItems.find((group) => group.category === selectedCategory) || menuItems[0], [selectedCategory]);

  return (
    <div id="top" className="min-h-screen bg-[#FFF4E2] text-[#07313B]">
      <header className="sticky top-0 z-50 border-b border-orange-100 bg-[#FFF4E2]/95 backdrop-blur-xl">
<div className="mx-auto flex max-w-7xl items-center px-5 py-5 md:px-8">
  <div className="mr-20">
    <Logo />
  </div>

  <nav className="hidden flex-1 items-center justify-center gap-10 md:flex">
            {navItems.map((item, index) => (
              <a key={item} href={item === "Home" ? "#top" : `#${item.toLowerCase()}`} className={`text-lg font-black transition hover:text-[#E56419] ${index === 0 ? "text-[#E56419] underline decoration-2 underline-offset-[14px]" : "text-[#07313B]"}`}>{item}</a>
            ))}
          </nav>
<a href="#contact" className="ml-20 hidden rounded-full bg-[#07313B] px-8 py-4 text-lg font-black text-white shadow-lg transition hover:bg-[#0F6170] md:inline-flex">Order Catering</a>
          <button className="rounded-xl p-2 md:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Open menu" type="button"><Icon name={mobileOpen ? "x" : "menu"} /></button>
        </div>
        {mobileOpen && <div className="border-t border-orange-100 bg-[#FFF4E2] px-5 pb-5 md:hidden">{navItems.map((item) => <a key={item} href={item === "Home" ? "#top" : `#${item.toLowerCase()}`} onClick={() => setMobileOpen(false)} className="block rounded-xl px-3 py-3 font-black text-[#07313B] hover:bg-orange-100">{item}</a>)}</div>}
      </header>

      <main>
        <section className="relative overflow-hidden border-b border-orange-100 bg-[linear-gradient(110deg,#FFF4E2_0%,#FFF4E2_38%,rgba(255,211,128,0.42)_48%,rgba(230,100,25,0.24)_100%)] px-5 py-14 md:px-8 md:py-20">
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(to_bottom,transparent,rgba(255,244,226,0.92))]" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-[0.82fr_1.18fr]">
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="font-serif text-6xl font-black leading-[0.98] tracking-tight text-[#07313B] md:text-8xl">
                Chef-driven<br />Atlantic seafood<br /><span className="text-[#D85A1A]">on wheels.</span>
              </h1>
              <div className="mt-8 h-1 w-20 bg-[#E56419]" />
              <p className="mt-7 max-w-xl text-xl leading-9 text-[#142E36]">
                The Be@chcomber is a Virginia Beach seafood trailer serving innovative coastal classics made with fresh, high-quality ingredients, friendly service, and a relaxed beachcomber spirit.
              </p>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Button href="#menu">View Our Menu</Button>
                <Button href="#locations" variant="ghost" className="px-4">Find Us Today <span className="ml-2 text-[#E56419]">→</span></Button>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
              <TrailerHeroArt />
            </motion.div>
          </div>
        </section>

        <section className="bg-[#FFF8ED] px-5 py-14 md:px-8">
          <SectionHeader title="Coastal Flavor. Beachcomber Spirit." />
          <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-4 md:gap-0">
            <FeatureCard icon="fish" title="Fresh & Local">We source the freshest seafood from trusted local fishermen whenever possible.</FeatureCard>
            <FeatureCard icon="chef" title="Chef-Driven">Creative, chef-inspired dishes that celebrate bold flavors and coastal comfort.</FeatureCard>
            <FeatureCard icon="palm" title="Beach Vibes">Laid-back service and a relaxed atmosphere that brings the beach to you.</FeatureCard>
            <FeatureCard icon="anchor" title="Catering & Events">We bring the Be@chcomber experience to your private events and celebrations.</FeatureCard>
          </div>
        </section>

        <section id="menu" className="bg-white px-5 py-20 md:px-8">
          <SectionHeader eyebrow="Menu" title="Chef-driven coastal classics with a modern twist.">Signature seafood, creative shrimp preparations, and Virginia Beach-inspired favorites built around freshness, speed, and flavor.</SectionHeader>
          <div className="mx-auto max-w-5xl">
            <div className="mb-8 flex flex-wrap justify-center gap-3">{menuItems.map((group) => <button key={group.category} type="button" onClick={() => setSelectedCategory(group.category)} className={`rounded-full px-5 py-3 text-sm font-black transition ${selectedCategory === group.category ? "bg-[#07313B] text-white shadow-lg shadow-orange-700/20" : "bg-[#FFF4E2] text-[#07313B] ring-1 ring-orange-200 hover:bg-orange-100"}`}>{group.category}</button>)}</div>
            <div className="grid gap-5">{currentMenu.items.map((item) => <Card key={item.name} className="transition hover:-translate-y-1 hover:shadow-lg"><div className="flex flex-col justify-between gap-4 p-6 sm:flex-row sm:items-start"><div><h3 className="text-xl font-black text-[#07313B]">{item.name}</h3><p className="mt-2 max-w-2xl leading-7 text-[#1C2F35]">{item.desc}</p></div><p className="rounded-full bg-orange-100 px-4 py-2 text-sm font-black text-[#9D3C10]">{item.price}</p></div></Card>)}</div>
          </div>
        </section>

        <section id="locations" className="bg-[#FFF4E2] px-5 py-20 md:px-8">
          <SectionHeader eyebrow="Locations" title="Follow the trailer.">Built for rotating locations, private events, breweries, farmers markets, festivals, office parks, and Virginia Beach-area gatherings.</SectionHeader>
          <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-3">{events.map((event) => <Card key={event.title}><div className="p-6"><Icon name="mapPin" className="mb-5 h-9 w-9 text-[#E56419]" /><h3 className="text-xl font-black">{event.title}</h3><p className="mt-3 font-semibold text-[#0F6170]">{event.date}</p><p className="mt-2 leading-7 text-[#1C2F35]">{event.location}</p></div></Card>)}</div>
        </section>

        <section id="about" className="bg-white px-5 py-20 md:px-8">
          <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
            <div>
              <p className="mb-3 text-sm font-black uppercase tracking-[0.25em] text-[#E56419]">About</p>
              <h2 className="font-serif text-5xl font-black tracking-tight text-[#07313B] md:text-6xl">A chef-led trailer with a Virginia Beach heart.</h2>
              <p className="mt-6 text-lg leading-8 text-[#1C2F35]">The Be@chcomber was created to become a leading mobile seafood dining experience in Virginia Beach: fresh, approachable, creative, and rooted in the relaxed treasure-finding spirit of a true beachcomber.</p>
              <p className="mt-4 text-lg leading-8 text-[#1C2F35]">Led by Executive Chef Bobby Scheve, a Culinary Institute of America graduate with more than 20 years in the food industry, the trailer combines culinary skill, speed, hospitality, and a menu designed to stand out from typical food trailer fare.</p>
            </div>
            <TrailerHeroArt />
          </div>
        </section>

        <section id="catering" className="bg-[#07313B] px-5 py-20 text-white md:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 rounded-[2rem] bg-white/8 p-6 ring-1 ring-white/10 md:grid-cols-[0.9fr_1.1fr] md:p-10">
            <div className="rounded-[1.5rem] bg-gradient-to-br from-[#0F6170] to-[#D85A1A] p-8"><Icon name="anchor" className="h-12 w-12" /><h2 className="mt-8 font-serif text-5xl font-black tracking-tight">Bring Be@chcomber to your event.</h2><p className="mt-5 leading-8 text-orange-50">Perfect for private parties, corporate lunches, command functions, weddings, breweries, festivals, farmers markets, neighborhood nights, and beach-area events.</p></div>
            <div className="grid gap-4 md:grid-cols-2">{["Private parties", "Corporate lunches", "Command functions", "Breweries & wineries", "Festivals & markets", "Farmers markets"].map((item) => <div key={item} className="rounded-3xl bg-white/10 p-5 ring-1 ring-white/10"><p className="font-black">{item}</p><p className="mt-2 text-sm leading-6 text-orange-100">Custom service options available based on guest count, location, and menu needs.</p></div>)}</div>
          </div>
        </section>

 <section id="contact" className="bg-[#FFF8ED] px-5 py-20 md:px-8">
          {/* Contact heading removed */}
          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[0.85fr_1.15fr]">
            <Card><div className="space-y-6 p-6">{[{ icon: "mapPin", label: "Service Area", value: "Virginia Beach / Hampton Roads" }, { icon: "mail", label: "Email", value: "vbbeachcomber@gmail.com" }, { icon: "phone", label: "Phone", value: "(757) 386-1426" }].map((row) => <div key={row.label} className="flex gap-4"><Icon name={row.icon} className="h-6 w-6 text-[#E56419]" /><div><p className="font-black">{row.label}</p><p className="text-[#1C2F35]">{row.value}</p></div></div>)}</div></Card>
            <Card>
              <div className="p-6">
                <form
                  action="https://formspree.io/f/xdabrkrz"
                  method="POST"
                  className="grid gap-4"
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <input
                      name="name"
                      className="rounded-2xl border border-orange-200 px-4 py-3 outline-none focus:border-[#E56419]"
                      placeholder="Name"
                    />
                    <input
                      name="email"
                      type="email"
                      className="rounded-2xl border border-orange-200 px-4 py-3 outline-none focus:border-[#E56419]"
                      placeholder="Email"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <input
                      name="phone"
                      className="rounded-2xl border border-orange-200 px-4 py-3 outline-none focus:border-[#E56419]"
                      placeholder="Phone"
                    />
                    <input
  name="eventDate"
  type="date"
  className="rounded-2xl border border-orange-200 px-4 py-3 outline-none focus:border-[#E56419]"
/>
                  </div>

                  <input
                    name="eventLocation"
                    className="rounded-2xl border border-orange-200 px-4 py-3 outline-none focus:border-[#E56419]"
                    placeholder="Event location"
                  />

                  <textarea
                    name="message"
                    className="min-h-32 rounded-2xl border border-orange-200 px-4 py-3 outline-none focus:border-[#E56419]"
                    placeholder="Tell us about your event, guest count, and menu needs"
                  />

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-full bg-[#07313B] px-8 py-4 text-base font-black text-white transition hover:bg-[#0F6170] focus:outline-none focus:ring-2 focus:ring-[#E56419] focus:ring-offset-2"
                  >
                    Send Inquiry
                  </button>
                </form>
              </div>
            </Card>
          </div>
        </section>
      </main>

<footer className="border-t border-orange-200 bg-[#FFF4E2] px-5 py-10 md:px-8">
  <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row md:items-center">
    <Logo />

    <div className="flex items-center gap-3">
      <a
        href="https://instagram.com/vbbeachvomber"
        target="_blank"
        rel="noreferrer"
        className="rounded-full border border-orange-200 bg-white/70 px-4 py-2 text-sm font-black text-[#07313B] transition hover:bg-orange-100 hover:text-[#E56419]"
      >
        Instagram
      </a>

    </div>

    <p className="text-sm font-semibold text-[#9D3C10]">
      © 2026 Be@chcomber LLC. All rights reserved.
    </p>
  </div>
</footer>
    </div>
  );
}
