import React, {useEffect, useState} from 'react';
import './AvailableMeals.sass';
import MealItem from './MealItem';
import Card from '../UI/Card';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    setIsLoading(true)
    setError(null)
    const fetchMeals = async () => {
      const response = await fetch(
        'https://react-fetch-movies-ad76e-default-rtdb.europe-west1.firebasedatabase.app/food-order-app.json'
      )
      if (!response.ok) {
        throw new Error('An error occurred. Status: ' + response.status)
      }
      const data = await response.json();
      const loadedMeals = []
      for (const key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price
        })
      }
      setMeals(loadedMeals);
      setIsLoading(false)
    }

    fetchMeals().catch(error => {
      setIsLoading(false)
      setError(error.message)
    })
  }, [])

  let content = <Card>Found no meals</Card>

  if (meals.length > 0) {
    content = <Card>
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
  }

  if (error) {
    content = <Card>{error}</Card>
  }

  if (isLoading) {
    content = <Card>Loading...</Card>
  }

  return (
    <section className='meals'>
      {content}
    </section>
  )
}

export default AvailableMeals;
