import './App.css';
import Header from "./components/Header/Header";
import './components/Header/Header.css'
import MealsSummary from "./components/Meals/MealsSummary";
import AvailableMeals from "./components/Meals/AvailableMeals";
import {MealsContextProvider} from "./components/store/meals-context";
import DUMMY_MEALS from "./dummy-meals";
import mealsImage from './components/Header/meals.jpg';


function App() {
  return (
    <div className="App">
      <Header/>
      <div className={'main-image'}>
        <img src={mealsImage} alt="A table full of delicious food!"/>
      </div>
      <MealsSummary/>
      {/*<MealsContext.Provider value={DUMMY_MEALS}>*/}
      {/*  <AvailableMeals/>*/}
      {/*</MealsContext.Provider>*/}
      <MealsContextProvider initialMeals={DUMMY_MEALS}>
        <AvailableMeals />
      </MealsContextProvider>

    </div>
  );
}

export default App;
