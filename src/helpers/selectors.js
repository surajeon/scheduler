

export default function getAppointmentsForDay(state, day) {
  // Find the current day
  const currentDay = state.days.find(elm => state.day === elm.name)
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

