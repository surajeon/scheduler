import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "components/DayList";
// import InterviewerList from "components/InterviewerList";
import Appointment from "components/Appointment";
import getAppointmentsForDay from "../helpers/selectors";
import getInterview from "../helpers/selectors";

// const days = [
//   {
//     id: 1,
//     name: "Monday",
//     spots: 2
//   },
//   {
//     id: 2,
//     name: "Tuesday",
//     spots: 5,
//   },
//   {
//     id: 3,
//     name: "Wednesday",
//     spots: 0,
//   },
// ];

export default function Application(props) {
  // const appointments = 
  // [
  //   {
  //     id: 1,
  //     time: "12pm",
  //   },
  //   {
  //     id: 2,
  //     time: "1pm",
  //     interview: {
  //       student: "Lydia Miller-Jones",
  //       interviewer: {
  //         id: 1,
  //         name: "Sylvia Palmer",
  //         avatar: "https://i.imgur.com/LpaY82x.png",
  //       }
  //     }
  //   },
  //   {
  //     id: 3,
  //     time: "2pm",
  //   },
  //   {
  //     id: 4,
  //     time: "3pm",
  //     interview: {
  //       student: "Cookie Monster",
  //       interviewer: {
  //         id: 3,
  //         name: "Mildred Nazir",
  //         avatar: "https://i.imgur.com/T2WwVfS.png",
  //       }
  //     }
  //   },
  //   {
  //     id: 5,
  //     time: "4pm",
  //     interview: {
  //       student: "Hello Kitty",
  //       interviewer: {
  //         id: 4,
  //         name: "Cohana Roy",
  //         avatar: "https://i.imgur.com/FK8V841.jpg",
  //       }
  //     }
  //   }
  // ];


  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  console.log("state: ", state);



  //   console.log("HERE",state);

  // console.log("state.. appt day: ",state.appointments, state.day);
  // const dailyAppointments = getAppointmentsForDay(state.appointments, state.day);
  const setDay = day => setState(prev => ({ ...prev, day }));
  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const appointment = dailyAppointments.map(appt => {
    return (
      <Appointment key={appt.id} id={appt.id} time={appt.time} interview={appt.interview} />
    )
  })
  console.log("appointment:", appointment);

  // const schedule = dailyAppointments.map((appointment) => {
  //   const interview = getInterview(state, appointment.interview);

  //   return (
  //     <Appointment
  //       key={appointment.id}
  //       id={appointment.id}
  //       time={appointment.time}
  //       interview={interview}
  //     />
  //   );
  // });


  // const setDays = days => setState(prev => ({ ...prev, days }));

  // const [interviewer, setInterviewer] = useState("");
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
        console.log(all);
        setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))
      })
  }, [])

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
        {appointment}
        <Appointment
          key={appointment.id}
          id={appointment.id}
          time={appointment.time}
          interview={appointment.interview}
        />
      </section>
    </main>
  );
}
