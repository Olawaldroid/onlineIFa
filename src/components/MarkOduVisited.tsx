"use client";

import { useEffect } from "react";
import { markProgressFlag } from "@/lib/progress";

// Invisible: records the "Opened an Odù" badge flag (see /learn#practice) once this
// detail page has actually been viewed.
export function MarkOduVisited() {
  useEffect(() => {
    markProgressFlag("odu");
  }, []);
  return null;
}
