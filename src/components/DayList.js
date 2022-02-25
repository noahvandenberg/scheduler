import React from "react";
import DayListItem from "./DayListItem";


export default function DayList(props) {
  const {days, day, setDay} = props

  const arrDays = days.map(da => (
    <DayListItem 
    key={da.id} 
    spots={da.spots} 
    setDay={() => setDay(da.name)} 
    name={da.name}
    selected={day === da.name}
    />
  ));

  return (
    <ul>
      {arrDays}
    </ul>
  );
}