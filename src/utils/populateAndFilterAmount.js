const populateAndFilterAmount = (initialState, tags) => ([
  ...initialState
    .filter((drink) => { // eslint-disable-line
      if (tags.includes(drink.bukka.toLowerCase()) && drink.deliveryCost < 5000) {
          drink.bukka = `${drink.bukka} under ₦5000`; // eslint-disable-line
        return drink;
      }
    }),
  ...initialState
]);

export default populateAndFilterAmount;
