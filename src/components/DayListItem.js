import React from "react";
import classnames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {

  const dayClass = classnames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  const formatSpots = (props) => {
    if (!props.spots) {
      return "no spots remaining"  
    }

    if (props.spots === 1) {
      return "1 spot remaining"
    }

    return `${props.spots} spots remaining`;
  }

  return (
    <li onClick={()=>props.setDay(props.name)} className={dayClass} data-testid="day">
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots(props)}</h3>
    </li>
  );
}