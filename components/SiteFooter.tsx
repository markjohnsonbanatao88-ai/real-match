import Link from "next/link";
import { LegalDisclaimer } from "@/components/LegalDisclaimer";

const footerColumns = [
  {
    heading: "Service",
    links: [
      { href: "/how-it-works", label: "How it works" },
      { href: "/pricing", label: "Membership" },
      { href: "/safety", label: "Safety" },
      { href: "/apply", label: "Apply" }
    ]
  },
  {
    heading: "Company",
    links: [
      { href: "/contact", label: "Contact" },
      { href: "/safety", label: "Member standards" }
    ]
  },
  {
    heading: "Legal",
    links: [
      { href: "/terms", label: "Terms of Service" },
      { href: "/privacy", label: "Privacy Notice" }
    ]
  }
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <Link href="/" className="brand" aria-label="Real Match home">
              <span className="brand-mark" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21s-6.7-4.35-9.33-8.02C.9 10.36 1.4 6.9 4.1 5.6c2.02-.97 4.2-.2 5.4 1.36L12 9.9l2.5-2.94c1.2-1.56 3.38-2.33 5.4-1.36 2.7 1.3 3.2 4.76 1.43 7.38C18.7 16.65 12 21 12 21z" />
                </svg>
              </span>
              Real Match
            </Link>
            <p>
              A discreet, personal matchmaking service for verified consenting adults who are serious about finding a
              genuine relationship.
            </p>
          </div>
          {footerColumns.map((column) => (
            <nav className="footer-col" key={column.heading} aria-label={column.heading}>
              <h4>{column.heading}</h4>
              {column.links.map((link) => (
                <Link key={`${column.heading}-${link.href}-${link.label}`} href={link.href}>
                  {link.label}
                </Link>
              ))}
            </nav>
          ))}
        </div>

        <LegalDisclaimer />

        <div className="footer-legal">
          <p>© {new Date().getFullYear()} Real Match. All rights reserved.</p>
          <p>Verified members · Mutual consent · No guaranteed outcomes</p>
        </div>
      </div>
    </footer>
  );
}
