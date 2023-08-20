import './Header.sass'
import React from "react";
import HeaderCartButton from "./HeaderCartButton";


const Header = () => {
  return (
    <React.Fragment>
      <div className="header">
        <h1>TastyMeals</h1>
        <HeaderCartButton />
      </div>

    </React.Fragment>
  )
}

export default Header;
