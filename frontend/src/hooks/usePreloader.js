import { useState, useCallback } from "react";

/**
 * usePreloader
 *
 * Manages the preloader lifecycle.
 * Always starts as loading on every page load/reload.
 * `onComplete` is called by Loader.jsx when the GSAP exit animation finishes.
 */
export default function usePreloader() {
  const [isLoading, setIsLoading] = useState(true);

  const onComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return { isLoading, onComplete };
}
