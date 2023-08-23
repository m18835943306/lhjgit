import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
  const logined = localStorage.getItem('logined')
  if (!logined) {
    return <Navigate to="/login" />
  }

  return <>{children}</>
}

const AuthWrapComponent = ({ auth, component }) => {
  if (auth) {
    return <PrivateRoute>{component}</PrivateRoute>
  }
  return <>{component}</>
}

export default AuthWrapComponent
