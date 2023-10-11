import useInput from "../../hooks/use-input";
import './CartForm.sass'

const validateName = (name) => name.trim() !== '';

const CartForm = () => {

  const {
    value: enteredFirstName,
    isValid: enteredFirstNameIsValid,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset: resetFirstNameInput
  } = useInput(validateName);

  const {
    value: enteredLastName,
    isValid: enteredLastNameIsValid,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetLastNameInput
  } = useInput(validateName);

  let formIsValid = false;
  if (enteredFirstNameIsValid && enteredLastNameIsValid) {
    formIsValid = true;
  }

  const formSubmissionHandler = event => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }
    resetFirstNameInput();
    resetLastNameInput();
  };

  const firstNameInputClasses = enteredFirstNameIsValid === false ? 'form-control invalid' : 'form-control';
  const lastNameInputClasses = enteredLastNameIsValid === false ? 'form-control invalid' : 'form-control';

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={firstNameInputClasses}>
        <label htmlFor={'name'}>First Name</label>
        <input
          type='text'
          id='name'
          onChange={firstNameChangeHandler}
          onBlur={firstNameBlurHandler}
          value={enteredFirstName}
        />
        {enteredFirstNameIsValid === false && <p className={'error-text'}>Name must not be empty.</p>}
      </div>
      <div className={lastNameInputClasses}>
        <label htmlFor='name'>Last Name</label>
        <input
          type='text'
          id='name'
          onChange={lastNameChangeHandler}
          onBlur={lastNameBlurHandler}
          value={enteredLastName}
        />
        {enteredLastNameIsValid === false && <p className={'error-text'}>Last name must not be empty.</p>}
      </div>
    </form>
  )

};

export default CartForm
