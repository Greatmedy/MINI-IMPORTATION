export const formatNaira = (amount) => {
  const value = Number(amount) || 0;
  return `₦${value.toLocaleString("en-NG", { maximumFractionDigits: 0 })}`;
};
