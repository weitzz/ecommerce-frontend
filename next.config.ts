import type { NextConfig } from "next";

const remotePatterns: NonNullable<NextConfig["images"]>["remotePatterns"] = [
  {
    protocol: "http",
    hostname: "localhost",
    port: "4000",
    pathname: "/media/**",
  },
];

const apiBase = process.env.NEXT_PUBLIC_API_BASE;

if (apiBase) {
  try {
    const apiUrl = new URL(apiBase);

    remotePatterns.push({
      protocol: apiUrl.protocol.replace(":", "") as "http" | "https",
      hostname: apiUrl.hostname,
      port: apiUrl.port,
      pathname: "/media/**",
    });
  } catch {
    console.warn("NEXT_PUBLIC_API_BASE is not a valid URL for next/image");
  }
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns,
  }
};

export default nextConfig;
