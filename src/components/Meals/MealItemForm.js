import './MealItemForm.css'
import MealsContext from "../store/meals-context";
import {useContext, useState} from "react";

const MealItemForm = (props) => {
  //const meals = useContext(MealsContext);
  const { meals, addChosenMeal, updateAmount } = useContext(MealsContext);
  const [inputAmount, setInputAmount] = useState(1);
  // const arrayMeals = {meals}
  //console.log(meals)
  // console.log(arrayMeals)

  const saveChosenMeals = () => {
    // eslint-disable-next-line no-restricted-globals
    event.preventDefault();
    const foundMeal = meals.find((meal) => meal.id === props.id)
    console.log("Id: ", props.id)
    console.log(props)

    if (foundMeal) {
      const chosenMealData = {
        name: foundMeal.name,
        price: foundMeal.price,
        amount: inputAmount, // Add inputAmount to the chosen meal data
      };

      addChosenMeal(chosenMealData);
      updateAmount(meals.amount + inputAmount); // Update the total amount
    } else {
      console.log("Error")
    }
  };

  const inputChangeHandler = (event) => {
    setInputAmount(+event.target.value);
  };

  return (
    <form className="form">
      <input
        className="form-input"
        type="number"
        min="1"
        step="1"
        value={inputAmount}
        onChange={inputChangeHandler} // Update inputAmount state on input change/>
        />
      <button className="form-button" onClick={saveChosenMeals}>+ Add</button>
    </form>
  );
}

export default MealItemForm;
