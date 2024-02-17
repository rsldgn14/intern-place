import { Users } from '@intern-place/types';
import React from 'react';
import UserProfile from './UserProfile';

export interface SideMenuItem {
  title: string;
  component: React.ReactNode;
  icon: string;
}

export const sideMenuItem = (
  user?: Users.User,
  userRole?: Users.Role
): SideMenuItem[] => [
  {
    title: 'Kullanıcı',
    component: <UserProfile user={user} />,
    icon: 'user',
  },
  {
    title: userRole === Users.Role.STUDENT ? 'Öğrenci' : 'Şirket',
    component:
      userRole === Users.Role.STUDENT ? <div>Öğrenci</div> : <div>Şirket</div>,
    icon: 'user',
  },
];
