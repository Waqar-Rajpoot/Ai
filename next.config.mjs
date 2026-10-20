/** @type {import('next').NextConfig} */
const nextConfig = {
  // The site is fully static: nothing is fetched live (Blueprint 1.1).
  output: "export",
  // The default image optimizer needs a server, which a static export does not have.
  images: { unoptimized: true },
};

export default nextConfig;
