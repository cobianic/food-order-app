import React, {useContext} from 'react';
import './AvailableMeals.css';
import MealItem from './MealItem';
import Card from '../UI/Card';
import MealsContext from "../store/meals-context";

const AvailableMeals = () => {
  const { meals } = useContext(MealsContext);
  //const meals = useContext(MealsContext);
  //console.log(meals)

  return (
    <section className='meals'>
      <Card>
          <ul>
            {meals.map((meal) => (
              <MealItem
                key={meal.id}
                id={meal.id}
                name={meal.name}
                description={meal.description}
                price={meal.price}
              />
            ))}
          </ul>
      </Card>
    </section>
  )
}

export default AvailableMeals;
