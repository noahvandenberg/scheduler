import React from "react";
import InterviewerListItem from "./InterviewerListItem";

import "components/InterviewerList.scss"

export default function InterviewerList(props) {
  const { interviewers, setInterviewer, interviewer } = props

  const arrInterviewers = interviewers.map(interview => (
    <InterviewerListItem
     key={interview.id}
     name={interview.name}
     avatar={interview.avatar}
     setInterviewer={() => props.setInterviewer(interviewer.id)}
     selected={interview.id === interviewer}
    />
  ));

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {arrInterviewers}
      </ul>
    </section>
  );
}