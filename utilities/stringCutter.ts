export function StringCutter(str: string, size: number = 70) {
  return str.length > 70 ? str.slice(0, size - 3) + "..." : str;
}
