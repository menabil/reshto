"use client";

import { useState } from "react";
import Image from "next/image";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80";

export const SafeImage = ({
  src,
  alt = "Dish image",
  className = "",
  fallbackSrc = FALLBACK_IMAGE,
  fill,
  width,
  height,
  priority = false,
  sizes,
  unoptimized,
  onError,
  ...props
}) => {
  const [error, setError] = useState(false);

  const imageSrc = error || !src ? fallbackSrc : src;
  const isDataOrBlob =
    typeof imageSrc === "string" &&
    (imageSrc.startsWith("data:") || imageSrc.startsWith("blob:"));
  const shouldUnoptimize = Boolean(unoptimized || isDataOrBlob);

  const handleError = (e) => {
    setError(true);
    if (typeof onError === "function") {
      onError(e);
    }
  };

  if (fill) {
    return (
      <Image
        src={imageSrc}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes || "(max-width: 768px) 100vw, 50vw"}
        unoptimized={shouldUnoptimize}
        className={className}
        onError={handleError}
        {...props}
      />
    );
  }

  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={width || 600}
      height={height || 600}
      priority={priority}
      sizes={sizes}
      unoptimized={shouldUnoptimize}
      className={className}
      onError={handleError}
      {...props}
    />
  );
};

export default SafeImage;
