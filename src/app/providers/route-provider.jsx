import { Routes, Route, BrowserRouter } from 'react-router'
import MainLayout from '../../shared/layouts/main-layout'
import Cases from '../../pages/cases'

const routes = [
  {
    path: '/',
    element: <Cases />,
  },
  {
    path: '/partners',
    element: <div>Partners</div>,
  },
  {
    path: '/gifts',
    element: <div>Gifts</div>,
  },
  {
    path: '/upgrade',
    element: <div>Upgrade</div>,
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
