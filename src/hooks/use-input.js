import { useReducer } from "react";

const initialInputState = {
  value: '',
  enteredValueIsValid: null
};

const inputStateReducer = (state, action) => {
  switch (action.type) {
    case "INPUT":
      return { value: action.value, enteredValueIsValid: action.isValid };
    case "BLUR":
      return { ...state, enteredValueIsValid: action.isValid };
    case "RESET":
      return initialInputState;
    default:
      return initialInputState;
  }
}

const useInput = (validate) => {
  const [inputState, dispatch] = useReducer(inputStateReducer, initialInputState)

  const valueChangeHandler = event => {
    dispatch({type: 'INPUT', value: event.target.value, isValid: validate(event.target.value)})
  };

  const inputBlurHandler = () => {
    dispatch({type: 'BLUR', isValid: validate(inputState.value)})
  };

  const reset = () => {
    dispatch({type: 'RESET'})
  };

  return {
    value: inputState.value,
    isValid: inputState.enteredValueIsValid,
    valueChangeHandler,
    inputBlurHandler,
    reset
  };
};

export default useInput;
