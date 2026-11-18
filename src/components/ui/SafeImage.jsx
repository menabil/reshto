"use client";

import { useState } from "react";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80";

export const SafeImage = ({
  src,
  alt = "Dish image",
  className = "",
  fallbackSrc = FALLBACK_IMAGE,
  ...props
}) => {
  const [error, setError] = useState(false);

  return (
    <img
      src={error || !src ? fallbackSrc : src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
      loading="lazy"
      {...props}
    />
  );
};

export default SafeImage;
