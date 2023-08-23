import { createHashRouter } from 'react-router-dom'
import { LayoutIndex, Login, NotFound, FullPage,DevicePage } from './constant'
import gererateRoute from './utils/generateRoute'
import AuthWrapComponent from './auth'
import { RouterLoader } from '../premission'

const routes = gererateRoute()
const rootRoutes = [
  {
    path: '/login',
    element: <AuthWrapComponent component={Login} />
  },
  {
    path: '/',
    element: (
      <AuthWrapComponent
        auth={true}
        component={LayoutIndex}
        premissionRoles={[1, 2]}
      />
    ),
    children: [
      ...routes.map((r) => {
        return {
          path: r.path,
          index: true,
          element: <AuthWrapComponent auth={true} component={r.element} />,
          loader: (res) => {
            return RouterLoader(res)
          },
          handle: { premission: r.premissionRoles }
        }
      }),
      {
        path: '404',
        element: <AuthWrapComponent auth={true} component={NotFound} />
      },
      {
        path: '*',
        element: <AuthWrapComponent auth={true} component={NotFound} />
      }
    ]
  },
  {
    path: '/fullpage',
    element: <AuthWrapComponent component={FullPage} />
  },
  {
    path: '/devicepage',
    element: <AuthWrapComponent component={DevicePage} />
  }
]
const Router = () => {
  // const routes = useRoutes(rootRoutes)
  return createHashRouter(rootRoutes)
}

export default Router
