const displayNepCurrency = (num) => {
  const formatter = new Intl.NumberFormat("ne-NP", {
    style: "currency",
    currency: "NPR",
    minimumFractionDigits: 0,
  });
  return formatter.format(num);
};

export default displayNepCurrency;
