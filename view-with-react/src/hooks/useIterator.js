import { useState, useCallback, useMemo } from 'react'

export const useIterator = (items = [], initialIndex = 0) => {
  const [i, setIndex] = useState(initialIndex)

  const prev = useCallback(() => {
    if (i === 0) return setIndex(items.length - 1)
    setIndex(i - 1)
  }, [i, items.length])

  const next = useCallback(() => {
    if (i === items.length - 1) return setIndex(0)
    setIndex(i + 1)
  }, [i, items.length])

  const item = useMemo(() => items[i], [i, items])

  return [item || items[0], prev, next]
}
