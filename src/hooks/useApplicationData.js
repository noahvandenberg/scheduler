import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  // Set Default State
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  });

  // Make a setDay Function
  const setDay = (day) => setState({ ...state, day: day });

  // GET ;) all the data from the DB via axios
  useEffect(() => {
    const daysUrl = "/api/days";
    const interviewersUrl = "/api/interviewers";
    const appointmentsUrl = "/api/appointments";
    Promise.all([
      axios.get(daysUrl),
      axios.get(interviewersUrl),
      axios.get(appointmentsUrl),
    ]).then((all) => {
      const [days, interviewers, appointments] = all;
      setState((prev) => ({
        ...prev,
        days: days.data,
        appointments: appointments.data,
        interviewers: interviewers.data,
      }));
    });
  }, []);

  // find Day Helper Function
  function findDay(day) {
    const daysOfWeek = {
      Monday: 0,
      Tuesday: 1,
      Wednesday: 2,
      Thursday: 3,
      Friday: 4,
    };
    return daysOfWeek[day];
  }

  // Book an Interview
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const dayOfWeek = findDay(state.day);

    let day = {
      ...state.days[dayOfWeek],
      spots: state.days[dayOfWeek],
    };

    if (!state.appointments[id].interview) {
      day = {
        ...state.days[dayOfWeek],
        spots: state.days[dayOfWeek].spots - 1,
      };
    } else {
      day = {
        ...state.days[dayOfWeek],
        spots: state.days[dayOfWeek].spots,
      };
    }

    let days = state.days;
    days[dayOfWeek] = day;

    const URL = `/api/appointments/${id}`;
    return axios
      .put(URL, { interview })
      .then(() => {
        setState({ ...state, appointments, days })
      });
  }

  // Cancel an Interview
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const dayOfWeek = findDay(state.day);

    const day = {
      ...state.days[dayOfWeek],
      spots: state.days[dayOfWeek].spots + 1,
    };

    let days = state.days;
    days[dayOfWeek] = day;

    const URL = `/api/appointments/${id}`;
    return axios
      .delete(URL)
      .then(() => {
        setState({ ...state, appointments, days });
      });
  }

  return { state, setDay, bookInterview, cancelInterview };
}