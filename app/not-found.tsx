import Link from "next/link";
import { House } from "lucide-react";

export default function NotFound() {
  return (
    <div className="page no-toc">
      <div className="content">
        <header className="page-head">
          <span className="eyebrow">Error 404</span>
          <h1>Page not found</h1>
          <p className="lead">The page you are looking for does not exist or has moved.</p>
        </header>
        <Link href="/" className="btn btn-primary">
          <House size={16} aria-hidden="true" />
          Back to home
        </Link>
      </div>
    </div>
  );
}
