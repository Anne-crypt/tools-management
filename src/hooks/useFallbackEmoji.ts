const fallbackEmojis = [
  "🚀",
  "🧭",
  "⚡",
  "🛠️",
  "📦",
  "🧩",
  "🛰️",
  "🎯",
] as const;

function hashSeed(seed: string | number) {
  const value = String(seed);
  let hash = 0;

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) >>> 0;
  }

  return hash;
}

export function useFallbackEmoji() {
  function getFallbackEmoji(seed: string | number) {
    return fallbackEmojis[hashSeed(seed) % fallbackEmojis.length];
  }

  return {
    fallbackEmojis,
    getFallbackEmoji,
  };
}
