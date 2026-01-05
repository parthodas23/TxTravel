export const calculateTime = (spaceYears, speed) => {
  const time = spaceYears / Math.sqrt(1 - speed * speed);
  return Number(time.toFixed(3));
};
