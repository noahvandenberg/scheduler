import React from "react";
import Header from "./Header";
import Show from "./Show"
import Empty from "./Empty";
import Form from "./Form"

import 'components/Appointment/styles.scss'
import useVisualMode from "hooks/useVisualMode";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = 'CREATE';


export default function Appointment(props) {

  const { time, interview } = props

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );


  return (
    <article className="appointment">
      <Header time={time}/>

      {/* {interview ? <Show student={interview.student} interviewer={interview.interviewer}/> : <Empty />} */}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && (
        <Form 
        interviewers={() => getInterviewersForDay()}
        onSave={() => {}}
        onCancel={() => back()}
        />
      )}


    </article>
  );
}