export function getAppointmentsForDay(state, day) {
  const selected = state.days.filter(dayObj => dayObj.name === day)[0]
  return selected ? selected.appointments.map(id => state.appointments[id]) : []
}

export function getInterviewersForDay(state, day) {
  const selected = state.days.filter(dayObj => dayObj.name === day)[0]
  return selected ? selected.interviewers.map(interviewer => state.interviewers[interviewer]) : []
}

export function getInterview(state, interview) {
  return interview && interview.interviewer && state.interviewers ?
    {
      ...interview, 
      interviewer: state.interviewers[interview.interviewer]
    } : null;
}

