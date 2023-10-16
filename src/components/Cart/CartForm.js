import './CartForm.sass'

const CartForm = (props) => {

  const formSubmissionHandler = event => {
    event.preventDefault();

    if (!props.enteredFirstNameIsValid || !props.enteredLastNameIsValid) {
      return;
    }
    props.resetFirstNameInput();
    props.resetLastNameInput();
  };

  const firstNameInputClasses = props.enteredFirstNameIsValid === false ? 'form-control invalid' : 'form-control';
  const lastNameInputClasses = props.enteredLastNameIsValid === false ? 'form-control invalid' : 'form-control';

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={firstNameInputClasses}>
        <label htmlFor={'name'}>First Name</label>
        <input
          type='text'
          id='name'
          onChange={props.firstNameChangeHandler}
          onBlur={props.firstNameBlurHandler}
          value={props.enteredFirstName}
        />
        {props.enteredFirstNameIsValid === false && <p className={'error-text'}>Name must not be empty.</p>}
      </div>
      <div className={lastNameInputClasses}>
        <label htmlFor='name'>Last Name</label>
        <input
          type='text'
          id='name'
          onChange={props.lastNameChangeHandler}
          onBlur={props.lastNameBlurHandler}
          value={props.enteredLastName}
        />
        {props.enteredLastNameIsValid === false && <p className={'error-text'}>Last name must not be empty.</p>}
      </div>
    </form>
  )

};

export default CartForm
