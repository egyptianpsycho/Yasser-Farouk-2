"use client";

import Image from "next/image";

/**
 * Thin wrapper around next/image for images that fill a positioned parent
 * (object-cover backgrounds, thumbnails, hero art). The parent element must be
 * `position: relative` with a defined size (an aspect-ratio box or inset-0
 * container). Provides sensible responsive defaults so every call site stays
 * lean while still getting lazy loading, srcset and no layout shift.
 */
export default function OptimizedImage({
  src,
  alt,
  className = "",
  sizes = "100vw",
  priority = false,
  quality = 85,
  ...rest
}) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      quality={quality}
      className={className}
      {...rest}
    />
  );
}
