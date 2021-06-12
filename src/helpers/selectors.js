

export const getAppointmentsForDay = (state, day) => {
  // Find the current day
  const currentDay = state.days.find(elm => day === elm.name) //state.day
  // Get appointments.id array from the day
  const currentAppointments = currentDay ? currentDay.appointments : [];
  // Create an empty array of full appointments
  const parsedAppointments = [];
  // Push each appointment object
  for (let id of currentAppointments) {
    parsedAppointments.push(state.appointments[id])
  }

  return parsedAppointments;
};

export const getInterview = (state, interview) => {
  if (interview === null) {
    return null;
  }
  const interviewerID = interview.interviewer;
  const interviewer = state.interviewers[interviewerID]
  
  return {...interview, interviewer}
}

export const getInterviewersForDay = (state, day) => {
  // Find the current day
  const currentDay = state.days.find(elm => day === elm.name) //state.day

  const currentInterviewers = currentDay ? currentDay.interviewers : [];
  
  const parsedInterviewers = [];

  for (let id of currentInterviewers) {
    parsedInterviewers.push(state.interviewers[id])
  }

  return parsedInterviewers;
};