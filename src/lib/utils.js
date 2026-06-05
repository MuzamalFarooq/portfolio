import clsx from "clsx";

export function cn(...inputs) {
  return clsx(inputs);
}

export function lerp(start, end, factor) {
  return start + (end - start) * factor;
}
