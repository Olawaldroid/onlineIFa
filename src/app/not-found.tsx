import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md py-16 text-center">
      <h1 className="font-serif text-3xl font-bold text-ifa-gold">Not found</h1>
      <p className="mt-2 text-ifa-cream/70">That page or Odù does not exist.</p>
      <Link href="/" className="btn-primary mt-6">Back home</Link>
    </div>
  );
}
