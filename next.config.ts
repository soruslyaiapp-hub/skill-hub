import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pages read skill files from disk at build time. Ship them too, in case a route ever renders on request.
  outputFileTracingIncludes: { "/**": ["./content/**/*"] },
};

export default nextConfig;
