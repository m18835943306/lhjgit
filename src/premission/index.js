import { useMemo, useEffect } from 'react'
import { useMatches, useNavigate } from 'react-router-dom'

const RouterLoader = (res) => {
  // console.log(res, '------------res')
  return res
}

const useRoutePremission = () => {
  const user = useMemo(() => JSON.parse(localStorage.getItem('user')) || {}, [])
  const matches = useMatches()
  const navigate = useNavigate()
  useEffect(() => {
    if (Array.isArray(matches) && matches.length > 1) {
      const { handle } = matches[1]
      if (handle) {
        const { premission = [] } = handle
        // 判断
        if (!premission.every((p) => p >= user.role_level)) {
          navigate('/404')
        }
      }
    }
  }, [matches, user, navigate])
}

export { useRoutePremission, RouterLoader }
