import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import Link from 'next/link';

export function renderCheckIcon(check: boolean) {
  return check ? <CheckOutlined /> : <CloseOutlined />;
}

export function renderLink(url: string, title: string) {
  return <Link href={url}> {title} </Link>;
}
