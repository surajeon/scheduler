import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Tuesday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {
    const promiseDays = '/api/days';
    const promiseAppointments = '/api/appointments';
    const promiseInterviewers = '/api/interviewers';

    Promise.all([
      axios.get(promiseDays),
      axios.get(promiseAppointments),
      axios.get(promiseInterviewers),
    ])
      .then((all) => {
        setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))
      })
  }, [])

  const setDay = day => setState(prev => ({ ...prev, day }));

  // const updateSpots = (dayName, days, appointments) => { // state.days.spots
    
  //   let currentDay = '';
  //   let spots = 0;
    
  //   for (let day of days) {
  //     if (day.name === dayName) {
  //       currentDay = day;
  //     }
  //   }
  
  //   for (let id of currentDay.appointments) {
  //     if (appointments[id].interview === null) {
  //       spots ++;
  //     }
  //   }
  
  //   return spots;
  
  // }

  // booking function
  const bookInterview = (id, interview) => { // id and newInterview obj

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        
        setState((state) => {
          const days = state.days.map((day) => {
            // const spots = updateSpots(day.name, state.days, state.appointments)

            if (state.day === day.name) {
              day.spots = day.spots -1;
            }
            return day;
          });

          return { ...state, appointments, days: days}
        })
      })
  
  }

  // canceling function
  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`, { interview: null })
      .then(() => {
        setState((state) => {
          const days = state.days.map((day) => {
            // const spots = updateSpots(day.name, state.days, state.appointments)

            if (state.day === day.name) {
              day.spots = day.spots + 1;
            }
            return day;
          });

          return { ...state, appointments, days: days}
        });
      })

  }

  return { state, setDay, bookInterview, cancelInterview }
}