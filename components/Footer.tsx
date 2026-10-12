import Link from "next/link";

export function Footer() {
  return (
    <footer className="site-footer">
      <span>© {new Date().getFullYear()} Esco Lifesciences Group. Internal use.</span>
      <nav aria-label="Footer">
        <Link href="/get-started/contributing">Contribute</Link>
        <Link href="/resources/changelog">Changelog</Link>
        <Link href="/get-started/faq">FAQ</Link>
      </nav>
    </footer>
  );
}
