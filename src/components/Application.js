import React, { useState, useEffect } from "react";

import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import useApplicationData from "hooks/useApplicationData"
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors";

export default function Application(props) {
  // setup state for current state, setDay, bookInterview, cancelInterview
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

  const DailyAppointments = getAppointmentsForDay(state, state.day);

  // mapping daily appointments and get specific appointment with details
  const schedule = DailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    const dailyInterviewers = getInterviewersForDay(state, state.day);

    return (
      <Appointment
      key={appointment.id}
      {...appointment}
      time={appointment.time}
      interview={interview}
      interviewers={dailyInterviewers}
      bookInterview={bookInterview}
      cancelInterview={cancelInterview}
      />
    );
  });

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
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        <section className="schedule">
          {schedule}
          <Appointment key="last" time="5pm" />
        </section>
      </section>
    </main>
  );
}