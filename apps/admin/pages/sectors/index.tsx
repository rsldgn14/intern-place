import Table from '../../components/table/Table';
import { ColumnType } from 'antd/es/table';
import { getAll, Sector } from '@intern-place/types';
import { useEffect, useState } from 'react';
import { renderDateTime } from '../../utils/datetime';

const columns: ColumnType<Sector>[] = [
  {
    title: 'ID',
    dataIndex: 'ID',
    key: 'ID',
    sorter: (a, b) => a.ID - b.ID,
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
    title: 'Name',
    dataIndex: 'Name',
    key: 'Name',
  },
];

export default function Index() {
  const [data, setData] = useState<any>(undefined);

  useEffect(() => {
    getAll().then((res) => setData(res));
  }, []);

  return (
    <Table
      path={'/sectors'}
      columns={columns}
      dataSource={data}
      actions={{ detail: true, create: true }}
    />
  );
}
