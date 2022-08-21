export const updatePuchits = puchits => {
  localStorage.setItem('puchits', JSON.stringify(puchits))
}

export const getDailyPuchits = puchits => {
  const todayDate = new Date()
  return puchits.filter(({date}) => todayDate.toDateString() === (new Date(date)).toDateString())
}

export const getTimeString = date => {
  const newDate = new Date(date)
  return newDate.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
}