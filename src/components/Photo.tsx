"use client";

import { useState } from "react";

// Image slot with a graceful empty/error state and a credit overlay.
// Used for openly-licensed museum/reference photos loaded from remote URLs.
export function Photo({
  src,
  alt,
  placeholder,
  credit,
  creditHref,
  className = "",
}: {
  src?: string;
  alt: string;
  placeholder: string;
  credit?: string;
  creditHref?: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const filled = !!src && !failed;

  if (!filled) {
    return (
      <div className={`relative flex h-full w-full items-center justify-center rounded-lg border-[1.5px] border-dashed border-ifa-cream/25 bg-ifa-cream/[0.04] p-4 text-center ${className}`}>
        <span className="text-xs text-ifa-cream/45">{placeholder}</span>
      </div>
    );
  }

  return (
    <div className={`relative h-full w-full ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element -- remote openly-licensed
          photos; next/image would need remotePatterns config for each host. */}
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
        loading="lazy"
        onError={() => setFailed(true)}
      />
      {credit ? (
        <a
          href={creditHref || undefined}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-1.5 left-1.5 max-w-[calc(100%-12px)] truncate rounded bg-black/55 px-1.5 py-0.5 text-[10px] leading-tight text-white/85 hover:text-white"
        >
          {credit}
        </a>
      ) : null}
    </div>
  );
}
