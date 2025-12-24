export const timeCalculator = (spaceYears, speed) => {
  return spaceYears / Math.sqrt(1- speed * speed);
};


