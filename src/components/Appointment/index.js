import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "../../hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

import "./styles.scss";

export default function Appointment(props) {

  // Modes
  const EMPTY = "EMPTY"; // no appointment, user can see add button
  const SHOW = "SHOW"; // show interview appointment details
  const CREATE = "CREATE"; // create form
  const SAVING = "SAVING"; // status indicator: Saving
  const DELETING = "DELETING"; // status indicator: Deleting
  const CONFIRM = "CONFIRM"; // save or cancel message
  const EDIT = "EDIT"; // show existing interview details before edit it
  const ERROR_SAVE = "ERROR_SAVE"; // save error message
  const ERROR_DELETE = "ERROR_DELETE" // delete error message

  // setting up initial mode state, transition and back
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  // save interview function
  const save = (name, interviewer) => {
    transition(SAVING, true);
    const interview = {
      student: name,
      interviewer
    };

    props.bookInterview(props.id, interview)
    .then(()=>{  
      transition(SHOW)
    })
    .catch((error) => {
      transition(ERROR_SAVE, true)
    })
  
  }

  // delete interview function
  const deleteInterview = () => {
    transition(DELETING, true)

    props.cancelInterview(props.id)
    .then(()=>{  
      transition(EMPTY)
    })
    .catch((error) => {
      transition(ERROR_DELETE, true)
    })
  }

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && (<Empty onAdd={() => transition(CREATE)} />)} 
      {mode === CREATE && (
        <Form 
          interviewers={props.interviewers} 
          onCancel={back} 
          onSave={save}
        />
      )}
      {mode === SAVING && (<Status message="Saving"/>)}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => {transition(CONFIRM)}}
          onEdit={() =>{transition(EDIT)}}
        />
      )}
      {mode === EDIT && (
        <Form
        name={props.interview.student}
        interviewer={props.interview.interviewer.id}
        interviewers={props.interviewers}
        onCancel= {() => back()}
        onSave= {save}
        />
      )}
      {mode === DELETING && (<Status message="Deleting"/>)}
      {mode === CONFIRM && (
        <Confirm 
          message="Are you sure you would like to delete?"
          onCancel={back}
          onConfirm={deleteInterview }
        />
      )} 
      {mode === ERROR_SAVE && (
        <Error 
          message="Could not save appointment"
          onClose={() => transition(SHOW)}
        />
      )} 
      {mode === ERROR_DELETE && (
        <Error 
          message="Could not delete appointment"
          onClose={() => transition(SHOW)}
        />
      )} 

    </article>
  );
}
