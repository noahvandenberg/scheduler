import React from "react";
import Header from "./Header";
import Show from "./Show"
import Empty from "./Empty";
import Form from "./Form"
import Status from "./Status"
import Confirm from "./Confirm";
import Error from "./Error";

import 'components/Appointment/styles.scss'
import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = 'CREATE';
const STATUS = 'STATUS';
const CONFIRM = 'CONFIRM';
const EDIT = 'EDIT';
const ERROR_SAVE = 'ERROR_SAVE';
const ERROR_DELETE = 'ERROR_DELETE';


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
    if (!name || !interviewer) {
      transition(ERROR_SAVE);
      return;
    }
    const interview = {
      student: name,
      interviewer
    };
    onSave(id, interview)
      .then(() => transition(SHOW) )
      .catch(() => transition(ERROR_SAVE, true) );
  };

  const deleteAppointment = (id) => {
    if (!id) {
      transition(ERROR_DELETE);
      return;
    }
    transition(STATUS);
    onDelete(id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true) );
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
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
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

      {/* EDIT FORM */}
      {mode === EDIT && (
        <Form 

          student={interview.student}
          interviewer={interview.interviewer.id}

          interviewers={interviewers}
          onSave={saveAppointment}
          onCancel={back}
        />
      )}

      {/* LOADING PAGE */}
      {mode === STATUS && (
        <Status 
          message={'Loading'}
        />
      )}

      {/* DELETE CONFIRM PAGE */}
      {mode === CONFIRM && (
        <Confirm 
          id={id}
          message={'Are you sure you want to cancel?'}
          onCancel={back}
          onConfirm={deleteAppointment}
        />
      )}

      {/* SAVE ERROR PAGE */}
      {mode === ERROR_SAVE && (
        <Error 
        message={'Cannot Save'}
        onClose={back}
        />
      )}

      {/* DELETE ERROR PAGE */}
      {mode === ERROR_DELETE && (
        <Error 
        message={'Cannot Delete'}
        onClose={back}
        />
      )}


    </article>
  );
}