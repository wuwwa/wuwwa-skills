import { useEffect, useState } from "react";

export const favoritesKey = "collection.favorites.v1";

function parseFavorites(value: string | null): string[] {
  if (!value) return [];
  const parsed: unknown = JSON.parse(value);
  if (!Array.isArray(parsed) || !parsed.every((id) => typeof id === "string")) {
    throw new Error("Invalid saved favorites");
  }
  return [...new Set(parsed)];
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  const [storageError, setStorageError] = useState(false);

  useEffect(() => {
    try {
      setFavorites(parseFavorites(window.localStorage.getItem(favoritesKey)));
    } catch {
      setStorageError(true);
    }
    setReady(true);
    const sync = (event: StorageEvent) => {
      if (event.key !== favoritesKey && event.key !== null) return;
      try {
        setFavorites(parseFavorites(event.newValue));
        setStorageError(false);
      } catch {
        setStorageError(true);
      }
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(favoritesKey, JSON.stringify(favorites));
      setStorageError(false);
    } catch {
      setStorageError(true);
    }
  }, [favorites, ready]);

  const toggleFavorite = (id: string) =>
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((value) => value !== id)
        : [...current, id],
    );
  return { favorites, ready, storageError, toggleFavorite };
}
