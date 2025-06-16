export const calculateCAGR = (current: number, previous: number): number => {
  if (!previous) return 0;
  return ((current / previous) * 100 - 100);
};
