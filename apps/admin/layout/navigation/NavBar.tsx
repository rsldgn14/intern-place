import { Menu, MenuProps } from 'antd';
import { MailOutlined, HomeOutlined, SettingOutlined } from '@ant-design/icons';
import { ReactNode } from 'react';
import Link from 'next/link';
import { getMenuIcon } from './navbaricon';

export interface MenuModel {
  Name: string;
  Icon?: string;
  Path?: string;
  Children?: MenuModel[];
}

type MenuItem = Required<MenuProps>['items'][number];

export default function NavBar() {
  const menus: MenuModel[] = [
    { Path: '/dashboard', Icon: 'MonitorOutlined', Name: 'Dashboard' },
    {
      Path: '',
      Icon: 'UserOutlined',
      Name: 'Users',
      Children: [
        { Path: '/users/students', Icon: 'UserOutlined', Name: 'Students' },
        { Path: '/users/companies', Icon: 'UserOutlined', Name: 'Companies' },
      ],
    },
    { Path: '/sectors', Icon: 'TableOutlined', Name: 'Sectors' },
    { Path: '/notices', Icon: 'TableOutlined', Name: 'Notices' },
    { Path: '/applications', Icon: 'TableOutlined', Name: 'Applications' },
  ];

  const items = menus.map(getItem);

  return (
    <Menu
      style={{ width: '100%' }}
      mode="horizontal"
      selectedKeys={[]}
      items={items}
    />
  );
}

function getItem(item: MenuModel): MenuItem {
  const icon = getMenuIcon(item.Icon);
  return {
    key: item.Path && item.Path.length > 0 ? item.Path : item.Name,
    label:
      //TO-DO router.push working very slow.
      item.Path ? (
        <Link href={item.Path && item.Path.length > 0 ? item.Path : item.Name}>
          {item.Name}
        </Link>
      ) : (
        item.Name
      ),
    icon,
    children: item.Children?.length ? item.Children.map(getItem) : undefined,
  };
}
