/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Server actions are stable in Next 14; left here for clarity.
  },
  async redirects() {
    return [
      // /lab was a standalone showcase of the IFA LAB design; that design is
      // now the site itself. Redirect any bookmarked/shared links to the
      // closest real equivalent.
      { source: "/lab", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
