/**
   * Calculates the magnitude of the vector.
   *
   * @param {number} x - The horizontal component of the vector.
   * @param {number} y - The vertical component of the vector.
   * @return {number} The magnitude of the vector.
   */
const getMagnitude = (x:number, y:number): number => {
  return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}

/**
 * Checks if any of the vector components are non-zero.
 *
 * @param {number} x - The horizontal component of the vector.
 * @param {number} y - The vertical component of the vector.
 * @return {boolean} The result of the check.
 */
const checkNonZeroComponents = (x:number, y:number): boolean => {
  return Math.abs(x) > 0 || Math.abs(y) > 0;
}

/**
 * Calculates the normalized velocity vector.
 *
 * @param {number} x - The horizontal component of the vector.
 * @param {number} y - The vertical component of the vector.
 * @return {number} The normalized velocity vector.
 */
export const getNormalization= (x:number, y:number): number => {
  return checkNonZeroComponents(x, y) ? 1 / getMagnitude(x, y) : 0;
}