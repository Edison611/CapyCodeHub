// Shared app-wide constants.

// Base URL for the VEX (formerly RobotEvents) public API.
// Note: no trailing slash — build paths as `${API_BASE_URL}/events/...`
export const API_BASE_URL = 'https://events.vex.com/api/v2';

// VEX competition seasons, keyed by the RobotEvents API `season[]` id.
// Add new seasons here as they are released (check the RobotEvents API for new ids).
export const SEASONS = [
  { id: 204, name: '2026-2027: Override' },
  { id: 197, name: '2025-2026: High Stakes' },
  { id: 190, name: '2024-2025: Over Under' },
];

// Default season used across the app until the user selects a different one.
export const DEFAULT_SEASON = 197;
