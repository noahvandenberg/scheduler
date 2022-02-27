export function getAppointmentsForDay(state, day) {
  const selected = state.days.filter(dayObj => dayObj.name === day)[0]
  return selected ? selected.appointments.map(id => state.appointments[id]) : []
}

export function getInterview(state, interview) {
  return interview && interview.interviewer && state ?
    {
      ...interview, 
      interviewer: state.interviewers[interview.interviewer]
    } : null;
}