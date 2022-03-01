import React from "react";
import Header from "./Header";
import Show from "./Show"
import Empty from "./Empty";
import Form from "./Form"
import Status from "./Status"

import 'components/Appointment/styles.scss'
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = 'CREATE';
const STATUS = 'STATUS';


export default function Appointment(props) {

  // Destruct props and console log them as an object;
  const { id, time, interview, interviewers, onSave, onDelete } = props;
  console.log('PROPS',{
    "id": id,
    "time": time,
    "interview": interview,
    "interviewers": interviewers,
    "onSave": onSave,
    "onDelete": onDelete,
  });

  // useVisualMode
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  
  // save function
  const saveAppointment = (name, interviewer) => {
    transition(STATUS);
    const interview = {
      student: name,
      interviewer
    };
    onSave(id, interview)
      .then(() => transition(SHOW) );
  };

  const deleteAppointment = (id) => {
    transition(STATUS);
    onDelete(id)
      .then(() => transition(EMPTY));
  }





  return (
    <article className="appointment">
      <Header time={time}/>

      {/* EMPTY W/ ADD BUTTON */}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {/* SHOW APPOINTMENT */}
      {mode === SHOW && (
        <Show
          id={id}
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={deleteAppointment}
        />
      )}

      {/* CREATE FORM */}
      {mode === CREATE && (
        <Form 
          interviewers={interviewers}
          onSave={saveAppointment}
          onCancel={back}
        />
      )}

      {/* LOADING PAGE */}
      {mode === STATUS && (
        <Status />
      )}


    </article>
  );
}