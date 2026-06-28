import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import logo from "@/assets/logo.webp"; // Script converts png to webp, but usually logos are better left as PNG for transparency if not verified. Or better, update import if file exists.

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [expandedMobileMenu, setExpandedMobileMenu] = useState<string | null>(null);
  const location = useLocation();

  const menuItems = [
    { label: "Home", href: "/" },
    {
      label: "About Us",
      href: "/about/story",
      submenu: [
        { label: "Our Story", href: "/about/story" },
        { label: "Our Team", href: "/about/team" },
        { label: "Resources", href: "/resources" },
        { label: "Global Impact", href: "/about/global-impact" },
        { label: "Reports", href: "/about/reports" }
      ]
    },
    {
      label: "Programmes",
      href: "/services",
      submenu: [
        { label: "Rescue", href: "/services/rescue" },
        { label: "Rehabilitation", href: "/services/rehabilitation" },
        { label: "Reintegration", href: "/services/reintegration" },
        { label: "Prevention", href: "/services/prevention" },
        { label: "Community Empowerment", href: "/services/community-empowerment" }
      ]
    },

    { label: "Impact", href: "/impact" },
    { label: "Career", href: "/career" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname === href || location.pathname.startsWith(href + "/");
  };

  const toggleMobileSubmenu = (label: string) => {
    if (expandedMobileMenu === label) {
      setExpandedMobileMenu(null);
    } else {
      setExpandedMobileMenu(label);
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1a1a1a] shadow-lg flex flex-col">

        <div className="w-full text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 md:h-20">
              {/* Logo */}
              <Link to="/" className="flex items-center gap-2 group">
                <img loading="lazy"
                  src={logo}
                  alt="Logo"
                  className="h-12 md:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </Link>

              {/* Desktop Menu */}
              <div className="hidden md:flex items-center gap-8">
                {menuItems.map((item) => (
                  item.submenu ? (
                    <div
                      key={item.label}
                      className="relative group/dropdown"
                      onMouseEnter={() => setActiveDropdown(item.label)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <Link
                        to={item.href}
                        className={`text-sm font-medium transition-all duration-300 relative group/link hover:-translate-y-0.5 flex items-center gap-1 ${isActive(item.href) ? "text-accent" : "hover:text-[hsl(var(--orange))]"
                          }`}
                      >
                        {item.label}
                        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[hsl(var(--orange))] group-hover/link:w-full transition-all duration-300"></span>
                      </Link>

                      {/* Dropdown Menu */}
                      <div className={`absolute top-full left-0 mt-2 w-48 bg-white text-gray-900 rounded-lg shadow-xl border border-gray-200 overflow-hidden transition-all duration-300 ${activeDropdown === item.label ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.label}
                            to={subItem.href}
                            className={`block px-4 py-3 text-sm font-medium transition-colors hover:bg-[hsl(var(--orange))]/10 hover:text-[hsl(var(--orange))] ${isActive(subItem.href) ? 'bg-[hsl(var(--orange))]/10 text-[hsl(var(--orange))]' : ''}`}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      key={item.label}
                      to={item.href}
                      className={`text-sm font-medium transition-all duration-300 relative group/link hover:-translate-y-0.5 ${isActive(item.href) ? "text-accent" : "hover:text-[hsl(var(--orange))]"
                        }`}
                    >
                      {item.label}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[hsl(var(--orange))] group-hover/link:w-full transition-all duration-300"></span>
                    </Link>
                  )
                ))}
              </div>

              {/* CTA Button */}
              <div className="hidden md:flex items-center gap-2">
                <Link to="/donate" className="group/btn">
                  <Button size="default" className="bg-[hsl(var(--orange))] hover:bg-[hsl(var(--orange))]/90 text-white group-hover/btn:-translate-y-1 group-hover/btn:shadow-2xl group-hover/btn:shadow-[hsl(var(--orange))]/20 transition-all duration-300">
                    Donate
                  </Button>
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 hover:bg-white/10 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="w-6 h-6 text-[hsl(var(--orange))]" /> : <Menu className="w-6 h-6 text-[hsl(var(--orange))]" />}
              </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
              <div className="md:hidden pb-4 animate-in fade-in slide-in-from-top-2 bg-white/95 backdrop-blur-sm rounded-b-2xl shadow-xl -mx-4 px-4 mt-2 max-h-[80vh] overflow-y-auto">
                <div className="flex flex-col gap-4">
                  {menuItems.map((item) => (
                    item.submenu ? (
                      <div key={item.label}>
                        <div className="flex items-center justify-between pr-2">
                          <Link
                            to={item.href}
                            className={`text-base font-bold transition-colors py-2 flex-1 ${isActive(item.href) ? "text-[hsl(var(--orange))]" : "text-gray-900 hover:text-[hsl(var(--orange))]"
                              }`}
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {item.label}
                          </Link>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleMobileSubmenu(item.label);
                            }}
                            className="p-2 text-gray-500 hover:text-[hsl(var(--orange))] hover:bg-gray-100 rounded-md transition-colors"
                          >
                            <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${expandedMobileMenu === item.label ? "rotate-180" : ""}`} />
                          </button>
                        </div>

                        {/* Collapsible Submenu */}
                        <div className={`pl-4 overflow-hidden transition-all duration-300 ${expandedMobileMenu === item.label ? "max-h-96 opacity-100 mt-2 space-y-2" : "max-h-0 opacity-0"}`}>
                          {item.submenu.map((subItem) => (
                            <Link
                              key={subItem.label}
                              to={subItem.href}
                              className={`block text-sm font-semibold transition-colors py-2 ${isActive(subItem.href) ? "text-[hsl(var(--orange))]" : "text-gray-700 hover:text-[hsl(var(--orange))]"
                                }`}
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        key={item.label}
                        to={item.href}
                        className={`text-base font-bold transition-colors py-2 ${isActive(item.href) ? "text-[hsl(var(--orange))]" : "text-gray-900 hover:text-[hsl(var(--orange))]"
                          }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    )
                  ))}
                  <Link to="/donate" onClick={() => setIsMenuOpen(false)}>
                    <Button size="default" className="w-full bg-[hsl(var(--orange))] hover:bg-[hsl(var(--orange))]/90 text-white">
                      Donate
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
      {location.pathname !== "/" && <div className="h-16 md:h-20" aria-hidden="true" />}
    </>
  );
};

export default Navbar;
