export const costColorStops = [
  { offset: 0, color: "#22c55e" },
  { offset: 0.25, color: "#14b8a6" },
  { offset: 0.5, color: "#6366f1" },
  { offset: 0.75, color: "#f59e0b" },
  { offset: 1, color: "#ef4444" },
] as const;

export const adoptionColorStops = [
  { offset: 0, color: "#ef4444" },      // Rouge (0% adoption)
  { offset: 0.25, color: "#f59e0b" },   // Orange
  { offset: 0.5, color: "#6366f1" },    // Indigo
  { offset: 0.75, color: "#14b8a6" },   // Teal
  { offset: 1, color: "#22c55e" },      // Vert (100% adoption)
] as const;

function hexToRgb(hex: string) {
  const value = hex.replace("#", "");
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  return { r, g, b };
}

function interpolateColor(startHex: string, endHex: string, factor: number) {
  const start = hexToRgb(startHex);
  const end = hexToRgb(endHex);
  const r = Math.round(start.r + (end.r - start.r) * factor);
  const g = Math.round(start.g + (end.g - start.g) * factor);
  const b = Math.round(start.b + (end.b - start.b) * factor);
  return `rgb(${r}, ${g}, ${b})`;
}

export function getColorFromCost(cost: number, maxCost: number) {
  if (maxCost <= 0) return costColorStops[0].color;

  const ratio = Math.min(Math.max(cost / maxCost, 0), 1);

  for (let i = 0; i < costColorStops.length - 1; i += 1) {
    const current = costColorStops[i];
    const next = costColorStops[i + 1];

    if (ratio >= current.offset && ratio <= next.offset) {
      const localFactor = (ratio - current.offset) / (next.offset - current.offset);
      return interpolateColor(current.color, next.color, localFactor);
    }
  }

  return costColorStops[costColorStops.length - 1].color;
}

export function getColorsFromCosts(costs: number[]) {
  const maxCost = Math.max(...costs, 0);
  return costs.map((cost) => getColorFromCost(cost, maxCost));
}

export function getColorFromAdoption(adoption: number) {
  // adoption est déjà un pourcentage (0-100)
  const ratio = Math.min(Math.max(adoption / 100, 0), 1);

  for (let i = 0; i < adoptionColorStops.length - 1; i += 1) {
    const current = adoptionColorStops[i];
    const next = adoptionColorStops[i + 1];

    if (ratio >= current.offset && ratio <= next.offset) {
      const localFactor = (ratio - current.offset) / (next.offset - current.offset);
      return interpolateColor(current.color, next.color, localFactor);
    }
  }

  return adoptionColorStops[adoptionColorStops.length - 1].color;
}

export function getColorsFromAdoption(adoptionRates: number[]) {
  return adoptionRates.map((rate) => getColorFromAdoption(rate));
}
