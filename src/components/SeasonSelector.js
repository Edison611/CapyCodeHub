import React from 'react';
import { useSeason } from '../context/SeasonContext';
import '../component-styles/SeasonSelector.css';

function SeasonSelector() {
  const { season, setSeason, seasons } = useSeason();

  return (
    <select
      className="season-selector"
      aria-label="Select season"
      value={season}
      onChange={(e) => setSeason(parseInt(e.target.value, 10))}
    >
      {seasons.map((s) => (
        <option key={s.id} value={s.id}>
          {s.name}
        </option>
      ))}
    </select>
  );
}

export default SeasonSelector;
