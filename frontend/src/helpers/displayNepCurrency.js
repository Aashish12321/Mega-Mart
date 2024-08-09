const displayNepCurrency = (num) => {
  const formatter = new Intl.NumberFormat("en-NP", {
    style: "currency",
    currency: "NPR",
    minimumFractionDigits: 0,
  });
  return formatter.format(num);
};

export default displayNepCurrency;
