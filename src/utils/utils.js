export const updatePuchits = (puchits) => {
  localStorage.setItem('puchits', JSON.stringify(puchits))
}

export const getTimeString = date => {
  const newDate = new Date(date)
  return newDate.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})
}