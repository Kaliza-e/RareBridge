"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogOut, LayoutDashboard, UserCheck, ShieldAlert, Sparkles } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Diseases", href: "/diseases" },
    { name: "Research", href: "/research" },
    { name: "Specialists", href: "/specialists" },
    { name: "Community", href: "/community" },
    { name: "About", href: "/about" },
    { name: "FAQ", href: "/faq" },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="sticky top-0 z-50 w-full premium-glass transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold font-heading tracking-tight text-primary flex items-center gap-1.5">
              <Sparkles className="w-5 h-5 text-sapphire animate-pulse" />
              Rare<span className="text-sapphire font-normal">Bridge</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium tracking-wide transition-colors relative py-1 ${
                  isActive(link.href) ? "text-primary" : "text-sapphire hover:text-primary"
                }`}
              >
                {link.name}
                {isActive(link.href) && (
                  <motion.div
                    layoutId="navbar-active-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-sapphire rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {session ? (
              <div className="flex items-center gap-4">
                <Link
                  href={session.user?.role === "ADMIN" ? "/admin" : "/dashboard"}
                  className="flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full border border-taupe/40 text-primary hover:bg-white transition-colors"
                >
                  {session.user?.role === "ADMIN" ? (
                    <>
                      <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
                      Admin Panel
                    </>
                  ) : (
                    <>
                      <LayoutDashboard className="w-3.5 h-3.5 text-sapphire" />
                      Dashboard
                    </>
                  )}
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="flex items-center gap-1 text-xs font-medium text-sapphire hover:text-red-700 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  href="/auth/signin"
                  className="text-sm font-medium text-sapphire hover:text-primary transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  className="bg-primary hover:bg-primary-light text-white text-sm font-semibold px-6 py-2.5 rounded-full shadow-premium hover:shadow-premium-hover transition-all duration-200"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-primary hover:text-primary-light transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-taupe/20 bg-white"
          >
            <div className="px-6 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block text-base font-semibold py-2 ${
                    isActive(link.href) ? "text-primary" : "text-sapphire"
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              <hr className="border-taupe/20 my-4" />

              {session ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-sapphire pb-2">
                    <UserCheck className="w-4 h-4" />
                    <span>Signed in as {session.user?.name}</span>
                  </div>
                  <Link
                    href={session.user?.role === "ADMIN" ? "/admin" : "/dashboard"}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-center bg-white border border-taupe text-primary font-semibold py-3 rounded-full text-sm"
                  >
                    {session.user?.role === "ADMIN" ? "Admin Panel" : "My Dashboard"}
                  </Link>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      signOut({ callbackUrl: "/" });
                    }}
                    className="w-full text-center bg-red-50 text-red-700 font-semibold py-3 rounded-full text-sm flex items-center justify-center gap-1.5"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <Link
                    href="/auth/signin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-center border border-taupe/40 text-sapphire font-semibold py-3 rounded-full text-sm"
                  >
                    Login
                  </Link>
                  <Link
                    href="/auth/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-center bg-primary text-white font-semibold py-3 rounded-full text-sm shadow-premium"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
