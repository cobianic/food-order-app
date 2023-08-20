import React, {useState} from 'react';

const MealsContext = React.createContext({
  amount: 0,
  meals: [],
  addChosenMeal: (chosenMeal) => {},
  updateAmount: (newAmount) => {},
  editCartMeals: (cartMeal) => {},
});


export const MealsContextProvider = ({children, initialMeals}) => {
  const meals = initialMeals;
  const [chosenMeals, setChosenMeals] = useState([]);
  const [amount, setAmount] = useState(0)

  const addChosenMeal = (chosenMeal) => {
    const existingMealIndex = chosenMeals.findIndex(
      (meal) => meal.name === chosenMeal.name
    );

    if (existingMealIndex !== -1) {
      const updatedChosenMeals = [...chosenMeals];
      updatedChosenMeals[existingMealIndex].amount += chosenMeal.amount;
      setChosenMeals(updatedChosenMeals);
    } else {
      setChosenMeals((prevChosenMeals) => [...prevChosenMeals, chosenMeal]);
    }
  };

  const updateAmount = (newAmount) => {
    setAmount(newAmount);
  };

  const editCartMeals = (cartMeal) => {
    const existingMealIndex = chosenMeals.findIndex(
      (meal) => meal.name === cartMeal.name
    );

    if (existingMealIndex !== -1) {
      const updatedChosenMeals = [...chosenMeals];
      updatedChosenMeals[existingMealIndex].amount = cartMeal.amount;
      if (updatedChosenMeals[existingMealIndex].amount <= 0) {
        updatedChosenMeals.splice(existingMealIndex, 1);
      }
      setChosenMeals(updatedChosenMeals);

      // Update the "amount" state
      const newAmount = updatedChosenMeals.reduce(
        (total, meal) => total + meal.amount,
        0
      );
      setAmount(newAmount);
    }
  };

  return (
    <MealsContext.Provider value={{ meals, chosenMeals, amount, addChosenMeal, updateAmount, editCartMeals }}>
      {children}
    </MealsContext.Provider>
  );
};

export default MealsContext;
