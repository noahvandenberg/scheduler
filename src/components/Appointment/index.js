import React from "react";
import Header from "./Header";
import Show from "./Show"
import Empty from "./Empty";

import 'components/Appointment/styles.scss'
import { useVisualMode } from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";


export default function Appointment(props) {

  const { time, interview } = props

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );


  return (
    <article className="appointment">
      <Header time={time}/>
      {interview ? <Show student={interview.student} interviewer={interview.interviewer}/> : <Empty />}
    </article>
  );
}