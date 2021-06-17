import React, { useState } from 'react';

import Button from "components/Button";
import InterviewerList from "components/InterviewerList";
import "./styles.scss"

// interview booking form
export default function Form(props) {

  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  // name and interviewer reset 
  const reset = () => {
    setName("")
    setInterviewer(null)
  }

  // cancel changes
  const cancel = () => {
    reset()
    props.onCancel()
  }

  // when user attempts to save without content, throw validation message
  function validate() {
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
  
    setError("");
    props.onSave(name, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off" onSubmit={event => event.preventDefault()} data-testid="form">
      <input
        className="appointment__create-input text--semi-bold"
        name={props.name}
        type="text"
        placeholder="Enter Student Name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        data-testid="student-name-input"
      />
      <section className="appointment__validation">{error}</section>
    </form>
    <InterviewerList 
    interviewers={props.interviewers} 
    value={interviewer}
    onChange={(value) => setInterviewer(value)} />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={cancel}>Cancel</Button>
      <Button confirm onClick={validate}>Save</Button>
    </section>
  </section>
</main>
  )
}