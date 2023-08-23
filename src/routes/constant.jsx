import { LazyLoad } from '@/routes/utils'
const LayoutIndex = LazyLoad(() => import('@/pages/layouts/index'))
const Login = LazyLoad(() => import('@/pages/login/index'))
const NotFound = LazyLoad(() => import('@/pages/notFound/index'))
const FullPage = LazyLoad(() => import('@/views/Maphome/index'))
const DevicePage = LazyLoad(() => import('@/views/DeviceQueryNew/index'))

export { LayoutIndex, Login, NotFound, FullPage,DevicePage }
