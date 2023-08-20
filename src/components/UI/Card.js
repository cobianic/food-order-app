import React from 'react';
import './Card.css';

/**
 * Represents a card component for styling and structuring content.  It accepts a className prop for
 * additional customization and wraps the content passed as children within the card's structure.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.className - Additional CSS classes to apply to the card.
 * @param {React.ReactNode} props.children - Content to be placed inside the card.
 * @returns {JSX.Element} - The JSX element representing the card.
 *
 */
const Card = (props) => {
  // Combine provided classes with the default 'card' class
  const classes = 'card ' + props.className;

  return <div className={classes}>{props.children}</div>;
}

export default Card;
