import './MealItem.css';
import MealItemForm from './MealItemForm';

const MealItem = (props) => {

  return (
    <li className='meal'>
      <div>
        <h3>{props.name}</h3>
        <div className='description'>{props.description}</div>
        <div className='price'>${props.price}</div>
      </div>
      <div>
        <MealItemForm id={props.id} />
      </div>
    </li>
  )
}

export default MealItem;
