import { useContext, useMemo } from 'react';

import MainContext from '../context/MainContext';
import { getDailyOccurrences } from '../lib/utils';

export const useOccurrences = () => {
  const {
    currentTab: { occurrences }
  } = useContext(MainContext);

  const todayOccurrences = useMemo(() => {
    return getDailyOccurrences(occurrences).reverse();
  }, [occurrences]);

  return {
    occurrences,
    occurrencesCount: occurrences.length,
    todayOccurrences,
    todayOccurrencesCount: todayOccurrences.length
  };
};
