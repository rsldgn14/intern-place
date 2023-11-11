import { renderDateTime } from '../../utils/datetime';
import Table, { ColumnType } from '../../components/table/Table';

import { useEffect, useState } from 'react';
import { Notices } from '@intern-place/types';
import { renderCheckIcon } from '../../utils/render';

const columns: ColumnType<Notices.Notice>[] = [
  {
    title: 'ID',
    dataIndex: 'ID',
    key: 'ID',
  },
  {
    title: 'Title',
    dataIndex: 'Title',
    key: 'Title',
  },
  {
    title: 'Company',
    dataIndex: ['Company', 'Name'],
    key: 'Company.Name',
  },
  {
    title: 'Sector',
    dataIndex: ['Sector', 'Name'],
    key: 'Sector.Name',
  },
  {
    title: 'Created Date',
    dataIndex: 'CreatedAt',
    key: 'CreatedAt',
    render: renderDateTime,
  },
  {
    title: 'Update Date',
    dataIndex: 'UpdatedAt',
    key: 'UpdatedAt',
    render: renderDateTime,
  },
  {
    title: 'Intern Count',
    dataIndex: 'InternCount',
    key: 'InterCount',
  },
  {
    title: 'Start Time',
    dataIndex: 'StartTime',
    key: 'StartTime',
    render: renderDateTime,
  },
  {
    title: 'End Time',
    dataIndex: 'EndTime',
    key: 'EndTime',
    render: renderDateTime,
  },
  {
    title: 'Active',
    dataIndex: 'Active',
    key: 'Active',
    render: renderCheckIcon,
    align: 'center',
  },
];

export default function Index() {
  const [data, setData] = useState<any>(undefined);

  useEffect(() => {
    Notices.getAll().then((res) => setData(res));
  }, []);

  return (
    <Table
      path={'notices'}
      columns={columns}
      dataSource={data}
      actions={{ detail: true }}
    />
  );
}
