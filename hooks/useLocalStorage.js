import { useEffect, useState } from 'react'

const localStorageExist = typeof localStorage !== 'undefined' ? true : false

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const localValue = localStorageExist && localStorage.getItem(key)
    if (localValue != null) return JSON.parse(localValue)
    if (typeof initialValue === 'function') return initialValue()
    if (typeof initialValue === 'undefined') return null
    else return initialValue
  })

  useEffect(() => {
    localStorageExist && localStorage.setItem(key, JSON.stringify(value))
  }, [value, key])

  return [value, setValue]
}
