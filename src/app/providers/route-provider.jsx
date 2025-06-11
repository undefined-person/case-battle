import { Routes, Route, BrowserRouter } from 'react-router'
import MainLayout from '../../shared/layouts/main-layout'
import Cases from '../../pages/cases/cases'
import Partners from '../../pages/partners/partners'
import Gifts from '../../pages/gifts/gifts'
import Upgrade from '../../pages/upgrade/upgrade'

const routes = [
  {
    path: '/',
    element: <Cases />,
  },
  {
    path: '/partners',
    element: <Partners />,
  },
  {
    path: '/gifts',
    element: <Gifts />,
  },
  {
    path: '/upgrade',
    element: <Upgrade />,
  },
  {
    path: '/profile',
    element: <div>Profile</div>,
  },
]

export default function RouteProvider() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={<MainLayout>{route.element}</MainLayout>} />
        ))}
      </Routes>
    </BrowserRouter>
  )
}
