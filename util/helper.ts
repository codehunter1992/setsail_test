export const groupBy = (list: object[], keyGetter: (value: object) => {}) => {
  const map = new Map();
  list.forEach((item) => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
          map.set(key, [item]);
      } else {
          collection.push(item);
      }
  });
  return map;
};

export const getTotalPrice = (productList: any[]) => { 
    if (!productList) return 0;
    let totalPrice = 0;
    productList.forEach((item: any) => {
        totalPrice += item.price;
    });
    return totalPrice;
};

export const getDiscountPrice = (price: number) => price && price >= 400 ? price * 0.1 : 0;