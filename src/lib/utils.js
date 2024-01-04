export const storeTabInfo = (id, data) =>
  localStorage.setItem(`HABIT_TRACKER::TAB::${id}`, JSON.stringify(data));

export const getStoredTabInfo = (id) =>
  JSON.parse(localStorage.getItem(`HABIT_TRACKER::TAB::${id}`));

export const storeTabsData = (data) =>
  localStorage.setItem('HABIT_TRACKER::TABS', JSON.stringify(data));

export const getStoredTabsData = () => {
  const storedData = JSON.parse(
    localStorage.getItem('HABIT_TRACKER::TABS') || '[]'
  );

  if (storedData.length === 0) {
    const oldData = JSON.parse(localStorage.getItem('puchits') || '[]');

    if (oldData.length > 0) {
      const tabs = [
        {
          id: 'old-data',
          name: 'Item 1',
          themeColor: 'violet',
          current: true
        }
      ];

      storeTabsData(tabs);
      storeTabInfo(tabs[0].id, {
        ...tabs[0],
        occurrences: oldData,
        goal: 0,
        delay: 0
      });

      return tabs;
    }

    return storedData;
  }

  return storedData;
};

export const getDailyOccurrences = (occurrences, chosenDate) => {
  chosenDate = chosenDate || new Date();

  return occurrences.filter(
    ({ date }) => chosenDate.toDateString() === new Date(date).toDateString()
  );
};

export const getDaysInMonth = (month, year) => {
  var date = new Date(year, month, 1);
  var days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
};

export const formatDateNth = (d) => {
  let suffix;

  if (d > 3 && d < 21) {
    suffix = 'th';
  } else {
    switch (d % 10) {
      case 1:
        suffix = 'st';
        break;
      case 2:
        suffix = 'nd';
        break;
      case 3:
        suffix = 'rd';
        break;
      default:
        suffix = 'th';
    }
  }

  return `${d}${suffix}`;
};

export const formatMonthAndYear = (month, year) => {
  const monthName = new Date(2009, month, 10).toLocaleDateString('default', {
    month: 'long'
  });
  return `${monthName}, ${year}`;
};

export const formatDateToNumeric = (date) => {
  return date.toLocaleDateString('default', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  });
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

export const msToTime = (duration) => {
  let seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  return hours + ':' + minutes + ':' + seconds;
};
