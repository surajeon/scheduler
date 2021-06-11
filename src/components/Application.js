import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "components/DayList";
// import InterviewerList from "components/InterviewerList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay, getInterview } from "../helpers/selectors";

export default function Application(props) {
  
  
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  console.log("state: ", state);
  
  useEffect(() => {
    const promiseDays = '/api/days';
    const promiseAppointments = '/api/appointments';
    const promiseInterviewers = '/api/interviewers';
  
    Promise.all([
      axios.get(promiseDays),
      axios.get(promiseAppointments),
      axios.get(promiseInterviewers)
    ])
      .then((all) => {
        // console.log(all);
        setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))
      })
  }, [])
  
  const setDay = day => setState(prev => ({ ...prev, day }));
  const appointments = getAppointmentsForDay(state, state.day);
  // console.log("appointments: ", appointments);
  const schedule = appointments.map((appointment) => {
    
    const interview = getInterview(state, appointment.interview);
    // console.log("interview :", interview);
  
    return (
      <Appointment
        key={appointment.id} 
        id={appointment.id}
        time={appointment.time}
        interview={interview}
      />
    );
  });
  // console.log("appointment:", appointment);


  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        {/* <Appointment
          key={schedule.id}
          id={schedule.id}
          time={schedule.time}
          interview={schedule.interview}
        /> */}
      </section>
    </main>
  );
}