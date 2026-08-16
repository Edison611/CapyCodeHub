import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { SEASONS, DEFAULT_SEASON } from '../constants';

const STORAGE_KEY = 'selectedSeason';

const SeasonContext = createContext(undefined);

function getInitialSeason() {
  if (typeof window === 'undefined') {
    return DEFAULT_SEASON;
  }
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const parsed = stored !== null ? parseInt(stored, 10) : NaN;
    if (!Number.isNaN(parsed) && SEASONS.some(season => season.id === parsed)) {
      return parsed;
    }
  } catch (error) {
    // localStorage may be unavailable (e.g. privacy mode) — fall back to default.
  }
  return DEFAULT_SEASON;
}

export function SeasonProvider({ children }) {
  const [season, setSeason] = useState(getInitialSeason);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, String(season));
    } catch (error) {
      // Ignore write failures (e.g. storage disabled/full).
    }
  }, [season]);

  const value = useMemo(() => ({ season, setSeason, seasons: SEASONS }), [season]);

  return (
    <SeasonContext.Provider value={value}>
      {children}
    </SeasonContext.Provider>
  );
}

export function useSeason() {
  const context = useContext(SeasonContext);
  if (context === undefined) {
    throw new Error('useSeason must be used within a SeasonProvider');
  }
  return context;
}
