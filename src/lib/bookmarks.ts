// Saved skills, kept in this browser only (localStorage). Works as an external store for useSyncExternalStore.
import { useSyncExternalStore } from "react";

const KEY = "skillhub:bookmarks";
const EMPTY: string[] = [];
const listeners = new Set<() => void>();

let cache: string[] = EMPTY;
let cachedRaw: string | null | undefined;
let memoryOnly = false; // storage blocked (private mode, sandbox): keep saves for this page view

function parse(raw: string | null): string[] {
  try {
    const value: unknown = JSON.parse(raw ?? "[]");
    return Array.isArray(value) ? value.filter((v): v is string => typeof v === "string") : EMPTY;
  } catch {
    return EMPTY;
  }
}

export function getBookmarks(): string[] {
  if (memoryOnly) return cache;
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(KEY);
  } catch {
    return cache;
  }
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cache = parse(raw);
  }
  return cache;
}

export function toggleBookmark(slug: string): void {
  const current = getBookmarks();
  const next = current.includes(slug) ? current.filter((s) => s !== slug) : [slug, ...current];
  const raw = JSON.stringify(next);
  try {
    window.localStorage.setItem(KEY, raw);
    cachedRaw = raw;
  } catch {
    memoryOnly = true;
  }
  cache = next;
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key === KEY) listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function useBookmarks(): string[] {
  return useSyncExternalStore(subscribe, getBookmarks, () => EMPTY);
}
