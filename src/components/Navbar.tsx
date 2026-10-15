import { Menu, X, ChevronDown, Phone, Mail, Heart, Users } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo.webp";

// ─── Menu structure ─────────────────────────────────────────────────────────
const menuItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about/story" },
  {
    label: "Programmes",
    href: "/services",
    submenu: [
      { label: "Rescue",                href: "/services/rescue" },
      { label: "Rehabilitation",        href: "/services/rehabilitation" },
      { label: "Reintegration",         href: "/services/reintegration" },
      { label: "Prevention",            href: "/services/prevention" },
      { label: "Community Empowerment", href: "/services/community-empowerment" },
    ],
  },
  { label: "Impact",   href: "/impact" },
  { label: "Stories",  href: "/stories" },
  { label: "Gallery",  href: "/gallery" },
  { label: "Career",   href: "/career" },
  { label: "Contact",  href: "/contact" },
];

// ─── Component ──────────────────────────────────────────────────────────────
const Navbar = () => {
  const [mobileOpen,      setMobileOpen]      = useState(false);
  const [activeDropdown,  setActiveDropdown]  = useState<string | null>(null);
  const [expandedMobile,  setExpandedMobile]  = useState<string | null>(null);
  const [scrolled,        setScrolled]        = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setExpandedMobile(null);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname === href || location.pathname.startsWith(href + "/");
  };

  const toggleMobile = (label: string) =>
    setExpandedMobile(prev => (prev === label ? null : label));

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 flex flex-col transition-shadow duration-300 ${scrolled ? "shadow-md" : ""}`}>

        {/* ── Tier 1: dark utility bar (disappears smoothly on scroll) ─────── */}
        <div
          className={`hidden lg:block bg-[#1a1a1a] text-white/80 text-xs transition-all duration-300 ease-in-out overflow-hidden ${
            scrolled ? "max-h-0 opacity-0 pointer-events-none" : "max-h-12 opacity-100"
          }`}
        >
          <div className="container mx-auto px-6 lg:px-10">
            <div className="flex items-center justify-between h-9">
              {/* Left: email + phone */}
              <div className="flex items-center gap-6">
                <a
                  href="mailto:office@newlifemwangaza.org"
                  className="flex items-center gap-1.5 hover:text-white transition-colors group"
                >
                  <Mail className="w-3.5 h-3.5 text-orange group-hover:scale-110 transition-transform" />
                  <span>office@newlifemwangaza.org</span>
                </a>
                <a
                  href="tel:+254795822903"
                  className="flex items-center gap-1.5 hover:text-white transition-colors group"
                >
                  <Phone className="w-3.5 h-3.5 text-green group-hover:scale-110 transition-transform" />
                  <span>+254 795 822 903</span>
                </a>
              </div>
              {/* Right: social icons */}
              <div className="flex items-center gap-3">
                <span className="text-white/40">Follow us:</span>

                {/* Facebook: Official Blue Badge with White 'f' */}
                <a
                  href="https://www.facebook.com/profile.php?id=100069760383137"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="hover:scale-110 transition-transform inline-flex items-center justify-center"
                >
                  <svg className="w-4 h-4 rounded-full" viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="12" cy="12" r="11.5" fill="#ffffff" />
                    <path
                      fill="#1877F2"
                      d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                    />
                  </svg>
                </a>

                {/* Instagram: Official Sunset Radial Gradient Tile with White Camera */}
                <a
                  href="https://www.instagram.com/nlmr_center/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="hover:scale-110 transition-transform inline-flex items-center justify-center"
                >
                  <svg className="w-4 h-4 rounded-[4.5px] overflow-hidden" viewBox="0 0 24 24" aria-hidden="true">
                    <defs>
                      <radialGradient id="ig-grad-header" cx="30%" cy="107%" r="150%">
                        <stop offset="0%" stopColor="#fdf497" />
                        <stop offset="5%" stopColor="#fdf497" />
                        <stop offset="45%" stopColor="#fd5949" />
                        <stop offset="60%" stopColor="#d6249f" />
                        <stop offset="90%" stopColor="#285AEB" />
                      </radialGradient>
                    </defs>
                    <rect width="24" height="24" rx="5" fill="url(#ig-grad-header)" />
                    <path
                      fill="#ffffff"
                      d="M12 7.053c1.611 0 1.802.006 2.438.035.588.027.908.125 1.121.208.282.11.483.241.695.453.212.212.343.413.453.695.083.213.181.533.208 1.121.029.636.035.827.035 2.438s-.006 1.802-.035 2.438c-.027.588-.125.908-.208 1.121a1.866 1.866 0 0 1-.453.695c-.212.212-.413.343-.695.453-.213.083-.533.181-1.121.208-.636.029-.827.035-2.438.035s-1.802-.006-2.438-.035c-.588-.027-.908-.125-1.121-.208a1.866 1.866 0 0 1-.695-.453 1.866 1.866 0 0 1-.453-.695c-.083-.213-.181-.533-.208-1.121-.029-.636-.035-.827-.035-2.438s.006-1.802.035-2.438c.027-.588.125-.908.208-1.121.11-.282.241-.483.453-.695.212-.212.413-.343.695-.453.213-.083.533-.181 1.121-.208.636-.029.827-.035 2.438-.035zm0-1.803c-1.638 0-1.844.007-2.488.036-.642.03-1.08.132-1.464.281a3.066 3.066 0 0 0-1.109.722c-.36.36-.582.724-.722 1.109-.15.384-.251.822-.281 1.464-.03.644-.036.85-.036 2.488s.007 1.844.036 2.488c.03.642.132 1.08.281 1.464.14.385.362.749.722 1.109.36.36.724.582 1.109.722.384.15.822.251 1.464.281.644.03.85.036 2.488.036s1.844-.007 2.488-.036c.642-.03 1.08-.132 1.464-.281.385-.14.749-.362 1.109-.722.36-.36.582-.724.722-1.109.15-.384.251-.822.281-1.464.03-.644.036-.85.036-2.488s-.007-1.844-.036-2.488c-.03-.642-.132-1.08-.281-1.464a3.066 3.066 0 0 0-.722-1.109 3.066 3.066 0 0 0-1.109-.722c-.384-.15-.822-.251-1.464-.281-.644-.03-.85-.036-2.488-.036zm0 3.328a3.722 3.722 0 1 0 0 7.444 3.722 3.722 0 0 0 0-7.444zm0 6.144a2.422 2.422 0 1 1 0-4.844 2.422 2.422 0 0 1 0 4.844zm4.738-6.49a.87.87 0 1 1-1.74 0 .87.87 0 0 1 1.74 0z"
                    />
                  </svg>
                </a>

                {/* LinkedIn: Official Blue Square with White 'in' */}
                <a
                  href="https://www.linkedin.com/company/new-life-mwangaza-rehabilitation-center/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="hover:scale-110 transition-transform inline-flex items-center justify-center"
                >
                  <svg className="w-4 h-4 rounded-[3.5px] overflow-hidden" viewBox="0 0 24 24" aria-hidden="true">
                    <rect width="24" height="24" rx="3.5" fill="#ffffff" />
                    <path
                      fill="#0A66C2"
                      d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                    />
                  </svg>
                </a>

                {/* TikTok: Official 3D Chromatic Note (Cyan #25F4EE + Magenta #FE2C55 + White #FFFFFF) */}
                <a
                  href="https://www.tiktok.com/@mwangazarehabcenter"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="hover:scale-110 transition-transform inline-flex items-center justify-center"
                >
                  <svg className="w-4 h-4 overflow-visible" viewBox="0 0 24 24" aria-hidden="true">
                    {/* Cyan chromatic layer */}
                    <path
                      fill="#25F4EE"
                      d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.5.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"
                      transform="translate(-0.9, -0.5)"
                    />
                    {/* Magenta chromatic layer */}
                    <path
                      fill="#FE2C55"
                      d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.5.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"
                      transform="translate(0.9, 0.5)"
                    />
                    {/* White central note */}
                    <path
                      fill="#FFFFFF"
                      d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.5.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── Tier 2: white logo band ────────────────────────────────────── */}
        <div className="hidden lg:block bg-white border-b border-gray-100">
          <div className="container mx-auto px-6 lg:px-10">
            <div className="flex items-center justify-between h-20">

              {/* Logo + org name */}
              <Link to="/" className="flex items-center gap-4 group">
                <img
                  src={logo}
                  alt="New Life Mwangaza Rehabilitation Centre"
                  loading="eager"
                  // @ts-ignore
                  fetchpriority="high"
                  className="h-14 w-auto object-contain"
                />
                <div className="border-l border-gray-200 pl-4">
                  <p className="text-green font-black text-base leading-tight tracking-wide uppercase">
                    New Life Mwangaza
                  </p>
                  <p className="text-foreground font-semibold text-sm leading-tight">
                    Rehabilitation Centre
                  </p>
                </div>
              </Link>

              {/* Right: Donate + Volunteer CTAs */}
              <div className="flex items-center gap-3">
                <Link
                  to="/volunteer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-green text-green font-bold text-sm hover:bg-green hover:text-white transition-all duration-200"
                >
                  <Users className="w-4 h-4" />
                  Volunteer
                </Link>
                <Link
                  to="/donate"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange text-white font-bold text-sm hover:bg-orange/90 transition-all duration-200"
                >
                  <Heart className="w-4 h-4" fill="currentColor" />
                  Donate Now
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ── Tier 3: green nav bar (desktop) ───────────────────────────── */}
        <nav className="hidden lg:block bg-green text-white">
          <div className="container mx-auto px-6 lg:px-10">
            <div className="flex items-center h-12">
              {menuItems.map((item) =>
                item.submenu ? (
                  <div
                    key={item.label}
                    className="relative h-full"
                    onMouseEnter={() => setActiveDropdown(item.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <Link
                      to={item.href}
                      className={`inline-flex items-center gap-1 h-full px-4 text-sm font-semibold transition-colors duration-150 ${
                        isActive(item.href)
                          ? "bg-white/15 text-white"
                          : "text-white/90 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {item.label}
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === item.label ? "rotate-180" : ""}`} />
                    </Link>
                    {/* Active bottom bar */}
                    {isActive(item.href) && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange" />
                    )}
                    {/* Dropdown */}
                    <div className={`absolute top-full left-0 bg-white shadow-xl border-t-2 border-orange overflow-hidden transition-all duration-200 origin-top z-50 ${
                      activeDropdown === item.label ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-1"
                    }`} style={{ minWidth: "210px" }}>
                      {item.submenu.map((sub) => (
                        <Link
                          key={sub.href}
                          to={sub.href}
                          className={`block px-5 py-3 text-sm font-medium border-l-2 transition-colors ${
                            isActive(sub.href)
                              ? "border-orange text-orange bg-orange/5"
                              : "border-transparent text-gray-700 hover:border-green hover:text-green hover:bg-gray-50"
                          }`}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={item.label}
                    to={item.href}
                    className={`relative inline-flex items-center h-full px-4 text-sm font-semibold transition-colors duration-150 ${
                      isActive(item.href)
                        ? "bg-white/15 text-white"
                        : "text-white/90 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {item.label}
                    {isActive(item.href) && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange" />
                    )}
                  </Link>
                )
              )}
            </div>
          </div>
        </nav>

        {/* ── Mobile single bar ─────────────────────────────────────────── */}
        <div className="lg:hidden bg-green text-white shadow-lg">
          <div className="flex items-center justify-between px-4 h-16">
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="NLMRC" loading="eager" className="h-10 w-auto object-contain" />
              <div>
                <p className="text-white font-black text-sm leading-none">New Life Mwangaza</p>
                <p className="text-white/70 text-xs leading-none mt-0.5">Rehabilitation Centre</p>
              </div>
            </Link>
            <button
              className="p-2 rounded hover:bg-white/10 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

      </header>

      {/* ── Mobile drawer backdrop ─────────────────────────────────────────── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setMobileOpen(false)} aria-hidden="true" />
      )}

      {/* ── Mobile drawer ─────────────────────────────────────────────────── */}
      <div className={`fixed top-0 right-0 z-50 h-full w-[300px] bg-white shadow-2xl flex flex-col transition-transform duration-300 lg:hidden ${mobileOpen ? "translate-x-0" : "translate-x-full"}`} aria-hidden={!mobileOpen}>

        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-4 bg-green">
          <Link to="/" onClick={() => setMobileOpen(false)}>
            <img src={logo} alt="NLMRC" className="h-10 w-auto object-contain" loading="eager" />
          </Link>
          <button onClick={() => setMobileOpen(false)} className="p-2 rounded hover:bg-white/10 text-white transition-colors" aria-label="Close menu">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav list */}
        <nav className="flex-1 overflow-y-auto py-4 px-4">
          {menuItems.map((item) => (
            <div key={item.label} className="mb-0.5">
              {item.submenu ? (
                <>
                  <div className="flex items-center">
                    <Link
                      to={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex-1 py-2.5 px-3 text-sm font-semibold transition-colors ${
                        isActive(item.href) ? "text-orange bg-orange/5" : "text-gray-800 hover:text-green hover:bg-gray-50"
                      }`}
                    >{item.label}</Link>
                    <button onClick={() => toggleMobile(item.label)} className="p-2 rounded hover:bg-gray-100 text-gray-500 hover:text-green transition-colors" aria-label={`Toggle ${item.label}`}>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${expandedMobile === item.label ? "rotate-180" : ""}`} />
                    </button>
                  </div>
                  <div className={`overflow-hidden transition-all duration-300 ${expandedMobile === item.label ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                    <div className="ml-3 mt-1 mb-2 border-l-2 border-green/20 pl-3 space-y-0.5">
                      {item.submenu.map((sub) => (
                        <Link key={sub.href} to={sub.href} onClick={() => setMobileOpen(false)}
                          className={`block py-2 px-3 text-sm transition-colors ${isActive(sub.href) ? "text-orange bg-orange/5 font-medium" : "text-gray-600 hover:text-green hover:bg-gray-50"}`}>
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <Link to={item.href} onClick={() => setMobileOpen(false)}
                  className={`block py-2.5 px-3 text-sm font-semibold transition-colors ${isActive(item.href) ? "text-orange bg-orange/5" : "text-gray-800 hover:text-green hover:bg-gray-50"}`}>
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Drawer footer */}
        <div className="border-t border-gray-100 p-4 space-y-3 bg-gray-50">
          <div className="grid grid-cols-2 gap-2">
            <Link to="/volunteer" onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-1.5 py-2.5 border-2 border-green text-green font-bold text-sm hover:bg-green hover:text-white transition-all">
              <Users className="w-3.5 h-3.5" /> Volunteer
            </Link>
            <Link to="/donate" onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-1.5 py-2.5 bg-orange text-white font-bold text-sm hover:bg-orange/90 transition-all">
              <Heart className="w-3.5 h-3.5" fill="currentColor" /> Donate
            </Link>
          </div>
          <div className="flex flex-col gap-1 pt-1">
            <a href="tel:+254795822903" className="flex items-center gap-2 text-xs text-gray-500 hover:text-green transition-colors">
              <Phone className="w-3 h-3" /> +254 795 822 903
            </a>
            <a href="mailto:office@newlifemwangaza.org" className="flex items-center gap-2 text-xs text-gray-500 hover:text-green transition-colors">
              <Mail className="w-3 h-3" /> office@newlifemwangaza.org
            </a>
          </div>
        </div>
      </div>

      {/* ── Height spacer for fixed header ────────────────────────────────── */}
      {location.pathname !== "/" && (
        <div className="h-16 lg:h-[148px]" aria-hidden="true" />
      )}
    </>
  );
};

export default Navbar;
