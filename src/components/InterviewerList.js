import React from "react"
import PropTypes from 'prop-types';

import InterviewerListItem from "components/InterviewerListItem"
import "components/InterviewerList.scss"

function InterviewerList(props) {

  // get each interviewer

  const interviewer = props.interviewers.map((interviewer) => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value}
        setInterviewer={event => props.onChange(interviewer.id)}
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewer}</ul>
    </section>
  )
}

export default InterviewerList;