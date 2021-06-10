
export const getAppointmentsForDay = (state, day) => {
  console.log(state);
  let filteredAppointments = state.days.filter(time => time.name === day)
  console.log("filteredAppointments", filteredAppointments);

  if (filteredAppointments.length === 0 || state.days.length === 0) {
    return [];
  }
  return filteredAppointments[0].appointments.map(id => state.appointments[id]);
};