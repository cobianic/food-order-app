import React, {useState} from 'react';

const MealsContext = React.createContext({
  amount: 0,
  meals: [],
  addChosenMeal: (chosenMeal) => {},
  updateAmount: (newAmount) => {},
});


export const MealsContextProvider = ({children, initialMeals}) => {
  const meals = initialMeals;
  const [chosenMeals, setChosenMeals] = useState([]);
  const [amount, setAmount] = useState(0)

  const addChosenMeal = (chosenMeal) => {
    setChosenMeals((prevChosenMeals) => [...prevChosenMeals, chosenMeal]);
  };

  const updateAmount = (newAmount) => {
    setAmount(newAmount);
  };

  return (
    <MealsContext.Provider value={{ meals, amount, addChosenMeal, updateAmount }}>
      {children}
    </MealsContext.Provider>
  );
};

export default MealsContext;
