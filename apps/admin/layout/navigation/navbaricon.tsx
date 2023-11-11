

import {
  AuditOutlined,
  ContainerOutlined,
  MonitorOutlined,
  TableOutlined,
  UserOutlined
} from '@ant-design/icons';

export function getMenuIcon(icon?: string): JSX.Element | undefined {
  switch (icon) {
    case 'MonitorOutlined':
      return <MonitorOutlined />;
    case 'AuditOutlined':
      return <AuditOutlined />;
    case 'ContainerOutlined':
      return <ContainerOutlined />;
    case 'TableOutlined':
      return <TableOutlined />;
    case 'UserOutlined':
      return <UserOutlined />
    default:
      return undefined;
  }
}
