export const updatePuchits = (puchits) => {
  localStorage.setItem('puchits', JSON.stringify(puchits));
};

export const updateGoalStorage = (goal) => {
  localStorage.setItem('puchits-goal', JSON.stringify(goal));
};

export const getDailyPuchits = (puchits) => {
  const todayDate = new Date();
  return puchits.filter(
    ({ date }) => todayDate.toDateString() === new Date(date).toDateString()
  );
};

export const getGroupedPuchits = (puchits) => {
  const groupedPuchits = {};

  for (let i = 0; i < puchits.length; i++) {
    const puchit = puchits[i];

    const puchitDate = new Date(puchit.date).toLocaleDateString();

    if (groupedPuchits[puchitDate]) {
      const count = groupedPuchits[puchitDate].count;
      groupedPuchits[puchitDate].count = count + 1;
    } else {
      groupedPuchits[puchitDate] = {
        count: 1
      };
    }
  }

  return groupedPuchits;
};

export const getTimeString = (date) => {
  const newDate = new Date(date);
  return newDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};
