import React, {useState} from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

import 'components/Appointment/styles.scss'

export default function Form(props) {

  const { interviewers, onSave, onCancel } = props;

  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");


  const reset = () => {
    setStudent('');
    setInterviewer('');
  };

  const cancel = () => {
    reset();
    onCancel();
  }

  function validate() {
    if (student === "" && interviewer === null) {
      setError("Student name cannot be blank and please select an interviewer");
      return;
    }
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }
    if (interviewer === null) {
      setError("Please select an interviewer");
      return;
    }
    onSave(student, interviewer);
  }
  
  
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event) => setStudent(event.target.value)}
          />
          <section className="appointment__validation">{error}</section>
        </form>
        
        <InterviewerList 
          interviewers={interviewers}
          value={interviewer}
          onChange={setInterviewer}
          {...props}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={() => validate()}>Save</Button>
        </section>
      </section>
    </main>
  );
}