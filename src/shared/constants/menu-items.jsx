import SparkleIcon from '../assets/icons/sparkle.svg?react'
import PeopleIcon from '../assets/icons/people.svg?react'
import CaseIcon from '../assets/icons/case.svg?react'
import ArrowsIcon from '../assets/icons/arrows.svg?react'
import ProfileIcon from '../assets/icons/profile.svg?react'

export const menuItems = [
  {
    label: 'Конкурсы',
    icon: <SparkleIcon />,
    link: '/gifts',
  },
  {
    label: 'Партнеры',
    icon: <PeopleIcon />,
    link: '/partners',
  },
  {
    label: 'Кейсы',
    icon: <CaseIcon />,
    link: '/',
  },
  {
    label: 'Апгрейд',
    icon: <ArrowsIcon />,
    link: '/upgrade',
  },
  {
    label: 'Профиль',
    icon: <ProfileIcon />,
    link: '/profile',
  },
]
