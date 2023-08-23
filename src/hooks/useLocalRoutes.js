import { useEffect, useState } from 'react'

export const useLocalRoutes = (code) => {
  const [routes, setRoutes] = useState({})

  useEffect(() => {
    const m = {}
    const r = import.meta.glob('@/views/**/*.tsx', {})
    for (const [key, value] of Object.entries(r)) {
      const k =
        key
          .split('/')
          .filter((item) => !item.includes('.tsx'))
          .pop() || ''
      m[`${code}/${k}`] = value
    }
    setRoutes(m)
  }, [])
  return { routes }
}
