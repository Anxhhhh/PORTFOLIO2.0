/**
 * Preloader.jsx
 *
 * Thin wrapper — maintains the existing App.jsx import path.
 * All animation logic lives in Loader.jsx + usePreloader.js.
 *
 * Props:
 *   isLoading  — boolean, controls whether the loader is mounted
 *   onComplete — callback fired when GSAP exit animation finishes
 */
import Loader from "../Loader";

export default function Preloader({ isLoading, onComplete }) {
  if (!isLoading) return null;
  return <Loader onComplete={onComplete} />;
}
