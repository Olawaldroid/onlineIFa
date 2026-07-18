import Link from "next/link";
import { CONSULTATION_DISCLAIMER } from "@/lib/safety/guardrails";

// Onboarding step: cultural & educational disclaimer.
// The user must accept before continuing on as a guest. `next` carries the
// destination. (Accounts are not part of onboarding — sign-up lives at /signup
// for those who want to save history later.)
export default function DisclaimerPage({
  searchParams,
}: {
  searchParams: { next?: string };
}) {
  const next = searchParams.next ?? "/learn";

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="font-serif text-3xl font-bold text-ifa-gold">
        Before you begin
      </h1>

      <div className="card space-y-4 text-sm text-ifa-cream/85">
        <p>
          Ifá is a living spiritual and cultural tradition of the Yoruba people.
          Online Ifá approaches it with respect, as a tool for learning and
          reflection.
        </p>
        <p>{CONSULTATION_DISCLAIMER}</p>
        <ul className="list-disc space-y-1 pl-5 text-ifa-cream/75">
          <li>This app does not claim spiritual authority.</li>
          <li>Interpretations are original, licensed, or contributor-reviewed — never copied from books.</li>
          <li>Sensitive concerns are redirected to qualified professionals.</li>
          <li>You can delete your data at any time.</li>
        </ul>
      </div>

      <form action="/api/onboarding/accept" method="post" className="space-y-4">
        <input type="hidden" name="next" value={next} />
        <label className="flex items-start gap-3 text-sm">
          <input type="checkbox" name="accept" required className="mt-1" />
          <span>
            I understand this is an educational and cultural tool and I accept
            the disclaimer above.
          </span>
        </label>

        <button type="submit" className="btn-primary">
          Accept &amp; continue
        </button>
      </form>

      <p className="text-xs text-ifa-sage">
        Prefer to look around first?{" "}
        <Link href={next}>Skip to {next === "/consult" ? "consultation" : "learning"}</Link>.
      </p>
    </div>
  );
}
