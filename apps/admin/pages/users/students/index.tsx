import { renderDateTime } from '../../../utils/datetime';
import Table, { ColumnType } from '../../../components/table/Table';

import { useEffect, useState } from 'react';
import { Students } from '@intern-place/types';

const columns: ColumnType<Students.Student>[] = [
  {
    title: 'ID',
    dataIndex: 'ID',
    key: 'ID',
  },
  {
    title: 'First Name',
    dataIndex: ['User', 'FirstName'],
    key: 'FirstName',
  },
  {
    title: 'Last Name',
    dataIndex: ['User', 'LastName'],
    key: 'LastName',
  },
  {
    title: 'E mail',
    dataIndex: ['User', 'UserName'],
    key: 'UserName',
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
];

export default function Index() {
  const [data, setData] = useState<any>(undefined);

  useEffect(() => {
    Students.getAll().then((res) => setData(res));
  }, []);

  return (
    <Table
      path={'students'}
      columns={columns}
      dataSource={data}
      actions={{ detail: true }}
    />
  );
}
