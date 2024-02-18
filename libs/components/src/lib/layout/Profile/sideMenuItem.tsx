import { Users } from '@intern-place/types';
import React from 'react';
import UserProfile from './UserProfile';
import ChangePassword from './ChangePassword';
import StudentProfile from './Student/StudentProfile';

export interface SideMenuItem {
  title: string;
  component: React.ReactNode;
  icon?: string;
  children?: SideMenuItem[];
}

export const sideMenuItem = (
  user?: Users.User,
  userRole?: Users.Role
): SideMenuItem[] => [
  {
    title: 'Kullanıcı',
    component: <UserProfile user={user} />,
    children: [
      {
        title: 'Şifre İşlemleri',
        component: <ChangePassword />,
        icon: '/down-arrow-child.svg',
      },
    ],
  },
  {
    title: userRole === Users.Role.STUDENT ? 'Öğrenci' : 'Şirket',
    component:
      userRole === Users.Role.STUDENT ? <StudentProfile /> : <div>Şirket</div>,
  },
];
