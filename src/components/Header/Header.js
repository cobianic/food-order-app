//import './Header.sass'
import React from "react";
import './Header.css'
import HeaderCartButton from "./HeaderCartButton";


const Header = () => {
  return (
    <React.Fragment>
      <div className="header">
        <h1>From React with 💙</h1>
        <HeaderCartButton />
      </div>

    </React.Fragment>
  )
}

export default Header;
