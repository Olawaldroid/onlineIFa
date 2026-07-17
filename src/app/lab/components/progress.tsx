"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

// Cross-section progress used by the badge row: which parts of the lab the
// visitor has touched, and their best streaks in the learning games.

export type LabFlag = "cast" | "odu" | "graph";

interface LabProgress {
  flags: Record<LabFlag, boolean>;
  bestStreak: number;
  markFlag: (flag: LabFlag) => void;
  reportStreak: (best: number) => void;
}

const LabProgressContext = createContext<LabProgress>({
  flags: { cast: false, odu: false, graph: false },
  bestStreak: 0,
  markFlag: () => {},
  reportStreak: () => {},
});

export function LabProgressProvider({ children }: { children: React.ReactNode }) {
  const [flags, setFlags] = useState<Record<LabFlag, boolean>>({
    cast: false,
    odu: false,
    graph: false,
  });
  const [bestStreak, setBestStreak] = useState(0);

  const markFlag = useCallback((flag: LabFlag) => {
    setFlags((f) => (f[flag] ? f : { ...f, [flag]: true }));
  }, []);
  const reportStreak = useCallback((best: number) => {
    setBestStreak((b) => Math.max(b, best));
  }, []);

  const value = useMemo(
    () => ({ flags, bestStreak, markFlag, reportStreak }),
    [flags, bestStreak, markFlag, reportStreak],
  );
  return <LabProgressContext.Provider value={value}>{children}</LabProgressContext.Provider>;
}

export function useLabProgress() {
  return useContext(LabProgressContext);
}
