export const formatPrice = (priceText: string, currencyText: string) => {
    const price = Number(priceText);
    if (isNaN(price)) {
      return priceText;
    }
    return price.toLocaleString(undefined, {
      style: 'currency',
      currency: currencyText,
      minimumFractionDigits: 2,
    });
  };