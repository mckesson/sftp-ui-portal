export const getTypeForYear = (effectiveDate: string) => {
  const currentYear = new Date().getFullYear();
  const effectiveYear = new Date(effectiveDate).getFullYear();

  if (effectiveYear === currentYear) {
    return "Current";
  } else if (effectiveYear < currentYear) {
    return "Expired";
  } else {
    return "Future";
  }
};
