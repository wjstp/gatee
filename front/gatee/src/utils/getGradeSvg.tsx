const getGradeSvg = (score: number | null | undefined) => {
  if (score === null || score === undefined) return 0;
  if (score >= 90 && score <= 100) {
    return 1
  } else if (score >= 80) {
    return 2
  } else if (score >= 70) {
    return 3
  } else if (score >= 60) {
    return 4
  } else if (score >= 50) {
    return 5
  } else if (score >= 40) {
    return 6
  } else if (score >= 30) {
    return 7
  } else if (score >= 10 && score <= 20) {
    return 8
  } else if (score === 0) {
    return 9
  } else {
    return 0
  }
};

export default getGradeSvg;