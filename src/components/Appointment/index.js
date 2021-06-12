import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "../../hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";

import "./styles.scss";

export default function Appointment(props) {

  // console.log("props.int: ", props.interviewers);

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVE = "SAVE";
  const DELETE = "DELETE";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    transition(SAVE);
    
    const interview = {
      student: name,
      interviewer
    };

    props.bookInterview(props.id, interview)
    .then(()=>{  
      transition(SHOW)
    })

  }

  const deleteInterview = () => {
    transition(DELETE)

    props.cancelInterview(props.id)
    .then(()=>{  
      transition(EMPTY)
    })
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && (<Empty onAdd={() => transition(CREATE)} />)}
      {mode === CREATE && (
        <Form 
          interviewers={props.interviewers} 
          onCancel={() => back} 
          onSave={save}
        />
      )}
      {mode === SAVE && (<Status message="Saving"/>)}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => {transition(CONFIRM)}}
          onEdit={() => {transition(EDIT)}}
        />
      )}
      {mode === DELETE && (<Status message="Deleting"/>)}
      {mode === CONFIRM && (
        <Confirm 
          message="Are you sure you would like to delete?"
          onCancel={() => back}
          onConfirm={deleteInterview }
        />
      )} 
      {mode === EDIT && (transition(CREATE))}
    </article>
  );
}
