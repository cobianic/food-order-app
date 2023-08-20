/**
 * `MealsContext` is a React context that provides a global state for the application.
 *
 * @context
 *
 * The context's default value is an object with the following properties:
 * - `amount`: The total amount of chosen meals.
 * - `meals`: An array of all available meals.
 * - `addChosenMeal`: A function that adds a meal to the chosen meals.
 * - `updateAmount`: A function that updates the total amount of chosen meals.
 * - `editCartMeals`: A function that edits the amount of a meal in the cart.
 *
 * `MealsContextProvider` is a component that provides the `MealsContext` to its children.
 * It uses the `useState` hook to manage the state of the chosen meals and the total amount.
 *
 * The `addChosenMeal` function adds a meal to the chosen meals. If the meal is already chosen, it increases
 * its amount; otherwise, it adds the meal to the chosen meals.
 *
 * The `updateAmount` function updates the total amount of chosen meals.
 *
 * The `editCartMeals` function edits the amount of a meal in the cart. If the new amount is 0 or less, it removes
 * the meal from the cart. It also updates the total amount of chosen meals.
 *
 * The component returns a `MealsContext.Provider` with the value set to an object containing the state and
 * the functions. It also renders its children inside the provider.
 *
 * @example
 * <MealsContextProvider initialMeals={meals}>
 *   <App />
 * </MealsContextProvider>
 */
import React, {useState} from 'react';

// Create a context with default values and functions
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

  /**
   * `addChosenMeal` is a function that adds a meal to the chosen meals.
   *
   * @function
   * @param {Object} chosenMeal - The meal to be added. It should have the following properties:
   * @param {string} chosenMeal.name - The name of the meal.
   * @param {number} chosenMeal.price - The price of the meal.
   * @param {number} chosenMeal.amount - The amount of the meal to be added.
   *
   * The function first checks if the meal is already in the chosen meals by finding its index in
   * the `chosenMeals` array. If the meal is found, it creates a copy of the `chosenMeals` array, increases
   * the amount of the meal in the copy, and updates the `chosenMeals` state with the copy. If the meal is not found,
   * it adds the meal to the `chosenMeals` state.
   */
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


  // Function to update the total amount of chosen meals
  const updateAmount = (newAmount) => {
    setAmount(newAmount);
  };

  /**
   * `editCartMeals` is a function that edits the amount of a meal in the cart.
   *
   * @function
   * @param {Object} cartMeal - The meal to be edited. It should have the following properties:
   * @param {string} cartMeal.name - The name of the meal.
   * @param {number} cartMeal.amount - The new amount of the meal.
   *
   * The function first checks if the meal is in the cart by finding its index in the `chosenMeals` array.
   * If the meal is found, it creates a copy of the `chosenMeals` array, sets the amount of the meal in the copy
   * to the new amount, and if the new amount is 0 or less, it removes the meal from the copy. Then, it updates
   * the `chosenMeals` state with the copy and the `amount` state with the total amount of the meals in the copy.
   */
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
