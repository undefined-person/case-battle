import { Routes, Route, BrowserRouter } from 'react-router'
import MainLayout from '../../shared/layouts/main-layout'
import Cases from '../../pages/cases/cases'
import Case from '../../pages/case/case'
import Partners from '../../pages/partners/partners'
import Gifts from '../../pages/gifts/gifts'
import Upgrade from '../../pages/upgrade/upgrade'
import Profile from '../../pages/profile/profile'
import Inventory from '../../pages/inventory/inventory'
import History from '../../pages/history/history'
import Upgrades from '../../pages/profile/upgrades/upgrades'

const routes = [
  {
    path: '/',
    element: <Cases />,
    isMainLayout: true,
  },
  {
    path: '/case/:id',
    element: <Case />,
    isMainLayout: false,
  },
  {
    path: '/partners',
    element: <Partners />,
    isMainLayout: true,
  },
  {
    path: '/gifts',
    element: <Gifts />,
    isMainLayout: true,
  },
  {
    path: '/upgrade',
    element: <Upgrade />,
    isMainLayout: true,
  },
  {
    path: '/profile',
    element: <Profile />,
    isMainLayout: true,
  },
  {
    path: '/profile/inventory',
    element: <Inventory />,
    isMainLayout: true,
  },
  {
    path: '/profile/history',
    element: <History />,
    isMainLayout: true,
  },
  {
    path: '/profile/upgrade',
    element: <Upgrades />,
    isMainLayout: true,
  },
  {
    path: '*',
    element: <div>Page not found</div>,
  },
]

export default function RouteProvider() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={route.isMainLayout ? <MainLayout>{route.element}</MainLayout> : route.element}
          />
        ))}
      </Routes>
    </BrowserRouter>
  )
}
