import Link from "next/link";
import { requireRole, authEnforced } from "@/lib/auth/session";

// Role gate for the admin area. When AUTH_ENFORCED=true, only ADMIN sessions
// may view admin pages; otherwise the area stays open for local development.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = requireRole(["ADMIN"]);

  if (!session) {
    return (
      <div className="mx-auto max-w-md py-16 text-center">
        <h1 className="font-serif text-2xl font-bold text-ifa-gold">Admin access required</h1>
        <p className="mt-2 text-sm text-ifa-cream/70">
          You must be signed in as an administrator to view this area.
        </p>
        <Link href="/login?next=/admin" className="btn-primary mt-6">Sign in</Link>
      </div>
    );
  }

  return (
    <div>
      {!authEnforced() && (
        <p className="mb-4 rounded-lg border border-ifa-border bg-ifa-surface px-3 py-1.5 text-xs text-ifa-sage">
          Dev mode: admin auth enforcement is off (set <code>AUTH_ENFORCED=true</code> to require an admin login).
        </p>
      )}
      {children}
    </div>
  );
}
