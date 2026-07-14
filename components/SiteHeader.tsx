import Link from "next/link";

const navItems = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/safety", label: "Safety" },
  { href: "/apply", label: "Apply" }
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="brand" aria-label="Real Match home">
          <span className="brand-mark" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21s-6.7-4.35-9.33-8.02C.9 10.36 1.4 6.9 4.1 5.6c2.02-.97 4.2-.2 5.4 1.36L12 9.9l2.5-2.94c1.2-1.56 3.38-2.33 5.4-1.36 2.7 1.3 3.2 4.76 1.43 7.38C18.7 16.65 12 21 12 21z" />
            </svg>
          </span>
          Real Match
        </Link>
        <nav className="site-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
