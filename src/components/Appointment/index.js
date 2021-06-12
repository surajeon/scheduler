import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "../../hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";

import "./styles.scss";

export default function Appointment(props) {

  // console.log("props.int: ", props.interviewers);

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer
    };

    props.bookInterview(props.id, interview)
    .then(()=>{  
      transition(SHOW)
    })

  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === CREATE && (
        <Form 
          interviewers={props.interviewers} 
          onCancel={() => back} 
          onSave={save}
        />
      )}
      {mode === SAVING && (<Status message="Saving"/>)}
      {mode === EMPTY && (<Empty onAdd={() => transition(CREATE)} />)}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
    </article>
  );
}
