import {
  BOOKINGS,
  CABINS,
  DASHBOARD,
  SETTINGS,
  USERS,
} from '../utils/constants.ts';
import { HiHome, HiMiniHomeModern, HiUsers } from 'react-icons/hi2';
import { FaCalendarAlt } from 'react-icons/fa';
import { MdSettings } from 'react-icons/md';

export const navItems = [
  {
    to: DASHBOARD,
    icon: <HiHome />,
    label: 'Home',
  },
  {
    to: BOOKINGS,
    icon: <FaCalendarAlt />,
    label: 'Bookings',
  },
  {
    to: CABINS,
    icon: <HiMiniHomeModern />,
    label: 'Cabins',
  },
  {
    to: USERS,
    icon: <HiUsers />,
    label: 'Users',
  },
  {
    to: SETTINGS,
    icon: <MdSettings />,
    label: 'Settings',
  },
];
