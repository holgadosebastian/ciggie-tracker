import React, { useState, useEffect } from 'react'

import { getGroupedPuchits } from '../utils/utils'

const History = ({ puchits }) => {
  const [groupedPuchits, setGroupedPuchits] = useState([])

  useEffect(() => {
    setGroupedPuchits(getGroupedPuchits(puchits))
  }, [puchits])

  return (
    <div className="pt-12 px-4 pb-4 grid grid-cols-3 gap-4">
      {Object.keys(groupedPuchits).map(keyName => {
        const { count } = groupedPuchits[keyName]
        return (
          <div key={keyName} className="text-center p-2 bg-violet-900 rounded-md">
            <p className="mb-2 text-xs">{keyName}</p>
            <p className="text-3xl">
              <span className="inline-block">{count}</span>
            </p>
          </div>
        )
      })}
    </div>
  )
}

export default History