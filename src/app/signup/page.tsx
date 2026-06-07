import Link from "next/link";

// Account creation placeholder. The auth provider (e.g. Auth.js) is wired in a
// later phase; this page documents the step so the onboarding flow is complete.
export default function SignupPage({ searchParams }: { searchParams: { next?: string } }) {
  const next = searchParams.next ?? "/learn";
  return (
    <div className="mx-auto max-w-md space-y-6">
      <h1 className="font-serif text-3xl font-bold text-ifa-gold">Create your account</h1>
      <div className="card space-y-3 text-sm text-ifa-cream/80">
        <p>
          Account creation is part of the authentication phase of the roadmap.
          Once enabled you will be able to save consultations, add private notes,
          and (for contributors) submit interpretations.
        </p>
        <p className="text-ifa-sage">Planned providers: email magic link + OAuth.</p>
      </div>
      <Link href={next} className="btn-primary">Continue as guest for now</Link>
    </div>
  );
}
