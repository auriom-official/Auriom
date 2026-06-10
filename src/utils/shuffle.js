/**
 * Returns a seed that changes once every 24 hours (UTC).
 * @returns {number}
 */
export const getDailySeed = () => {
  return Math.floor(Date.now() / 86400000);
};

/**
 * Performs a deterministic pseudo-random shuffle on an array using a numeric seed.
 * @template T
 * @param {T[]} array
 * @param {number} seed
 * @returns {T[]}
 */
export const seededShuffle = (array, seed) => {
  const shuffled = [...array];
  let currentSeed = seed;
  
  const random = () => {
    const x = Math.sin(currentSeed++) * 10000;
    return x - Math.floor(x);
  };

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    const temp = shuffled[i];
    shuffled[i] = shuffled[j];
    shuffled[j] = temp;
  }
  
  return shuffled;
};
