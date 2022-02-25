import React from "react";
import classNames from "classnames";

import "components/DayListItem.scss"


export default function DayListItem(props) {
  const { spots, setDay, name } = props

  const dayClass = classNames('day-list__item', {
    'day-list__item--selected': props.selected,
    'day-list__item--full': spots === 0,
  })

  const formatSpots = () => {
    if (spots === 0) {
      return 'no spots'
    }
    if (spots === 1) {
      return '1 spot'
    }
    return `${spots} spots`
  };


  return (
    <li className={dayClass} onClick={setDay}>
      <h2 className="text--regular">{name}</h2>
      <h3 className="text--light">{formatSpots()} remaining</h3>
    </li>
  );
}

