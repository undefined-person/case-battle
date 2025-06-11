import SparkleIcon from '../assets/icons/sparkle.svg?react'
import PeopleIcon from '../assets/icons/people.svg?react'
import CaseIcon from '../assets/icons/case.svg?react'
import ArrowsIcon from '../assets/icons/arrows.svg?react'
import ProfileIcon from '../assets/icons/profile.svg?react'

export const menuItems = [
  {
    label: 'menu.gifts',
    icon: <SparkleIcon />,
    link: '/gifts',
  },
  {
    label: 'menu.partners',
    icon: <PeopleIcon />,
    link: '/partners',
  },
  {
    label: 'menu.cases',
    icon: <CaseIcon />,
    link: '/',
  },
  {
    label: 'menu.upgrade',
    icon: <ArrowsIcon />,
    link: '/upgrade',
  },
  {
    label: 'menu.profile',
    icon: <ProfileIcon />,
    link: '/profile',
  },
]
