// Color palette for the app
export const colors = {
  // Main palette
  purple: "#B3A9C6",
  blue: "#9FBCCF",
  green: "#C9EDA8",
  dark: "#272727",
  light: "#F5FAFA",

  // Ghost score levels
  ghostLow: "#C9EDA8",
  ghostMedium: "#9FBCCF",
  ghostHigh: "#B3A9C6",
  ghostExtreme: "#272727",

  // UI elements
  primary: "#9FBCCF",
  secondary: "#B3A9C6",
  accent: "#C9EDA8",
  background: {
    light: "#F5FAFA",
    dark: "#272727",
  },
  text: {
    light: "#272727",
    dark: "#F5FAFA",
  },
}

// Helper function to get ghost level color
export const getGhostLevelColor = (score: number) => {
  if (score < 30) return colors.ghostLow
  if (score < 60) return colors.ghostMedium
  if (score < 85) return colors.ghostHigh
  return colors.ghostExtreme
}

// Helper function to get recovery level color
export const getRecoveryLevelColor = (probability: number) => {
  if (probability < 20) return colors.ghostExtreme
  if (probability < 40) return colors.ghostHigh
  if (probability < 60) return colors.ghostMedium
  if (probability < 80) return colors.ghostMedium
  return colors.ghostLow
}
