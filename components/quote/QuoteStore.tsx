"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

export type QuoteLine = {
  code: string;
  title: string;
  slug: string;
  category: string;
  qty: number;
};

const KEY = "lakshika.quote.v1";

/**
 * localStorage is an external system, so the cart lives outside React and is
 * read through useSyncExternalStore. That keeps SSR and the first client render
 * consistent without a setState-in-effect cascade.
 */

const EMPTY: QuoteLine[] = [];

let snapshot: QuoteLine[] = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function read(): QuoteLine[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return EMPTY;
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return EMPTY;
    return parsed.filter(
      (l): l is QuoteLine =>
        !!l &&
        typeof l === "object" &&
        typeof (l as QuoteLine).code === "string" &&
        typeof (l as QuoteLine).qty === "number",
    );
  } catch {
    return EMPTY;
  }
}

function persist(next: QuoteLine[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* quota or private mode — the cart still works for this session */
  }
}

function emit() {
  for (const l of listeners) l();
}

function commit(next: QuoteLine[]) {
  snapshot = next;
  persist(next);
  emit();
}

function subscribe(cb: () => void) {
  // First subscription hydrates from storage; this runs during the effect
  // phase of useSyncExternalStore, not during render.
  if (!loaded) {
    loaded = true;
    const stored = read();
    if (stored.length) {
      snapshot = stored;
      queueMicrotask(emit);
    }
  }
  listeners.add(cb);

  const onStorage = (e: StorageEvent) => {
    if (e.key !== KEY) return;
    snapshot = read();
    emit();
  };
  window.addEventListener("storage", onStorage);

  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", onStorage);
  };
}

const getSnapshot = () => snapshot;
const getServerSnapshot = () => EMPTY;

/* ── mutations ── */

function addLine(line: Omit<QuoteLine, "qty">, qty = 1) {
  const found = snapshot.find((l) => l.code === line.code);
  commit(
    found
      ? snapshot.map((l) => (l.code === line.code ? { ...l, qty: l.qty + qty } : l))
      : [...snapshot, { ...line, qty }],
  );
}

function setLineQty(code: string, qty: number) {
  commit(
    qty <= 0
      ? snapshot.filter((l) => l.code !== code)
      : snapshot.map((l) => (l.code === code ? { ...l, qty } : l)),
  );
}

function removeLine(code: string) {
  commit(snapshot.filter((l) => l.code !== code));
}

function clearLines() {
  commit(EMPTY);
}

/* ── hook ── */

export function useQuote() {
  const lines = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const count = useMemo(() => lines.reduce((n, l) => n + l.qty, 0), [lines]);

  const add = useCallback(
    (line: Omit<QuoteLine, "qty">, qty = 1) => addLine(line, qty),
    [],
  );
  const setQty = useCallback((code: string, qty: number) => setLineQty(code, qty), []);
  const remove = useCallback((code: string) => removeLine(code), []);
  const clear = useCallback(() => clearLines(), []);

  return { lines, count, add, setQty, remove, clear };
}

/** Kept so the tree has a single obvious mount point if this grows. */
export function QuoteProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
