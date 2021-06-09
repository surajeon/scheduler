import React from "react";
import Header from "components/Appointment/Header"
import Show from "components/Appointment/Show"
import Empty from "components/Appointment/Empty"

import "./styles.scss";

export default function Appoinment (props) {

  return (

  <article className="appointment">
    
    <Header time={props.time} />
    {props.interview ? (
      <Show
        student={props.interview.student}
        interviewer={props.interview.interviewer}  
      />
    ) : (
      <Empty />
    )}   
  </article>
  )

}
