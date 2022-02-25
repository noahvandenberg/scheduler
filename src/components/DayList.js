import React from "react";
import DayListItem from "./DayListItem";


export default function DayList(props) {
  const {days, value, onChange} = props
  
  const arrDays = days.map(day => (
    <DayListItem 
    key={day.id} 
    spots={day.spots} 
    setDay={onChange()} 
    name={day.name}
    selected={value === day.name}
    />
  ));

  return (
    <ul>
      {arrDays}
    </ul>
  );
}