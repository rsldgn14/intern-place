import { renderDateTime } from '../../../utils/datetime';
import Table, { ColumnType } from '../../../components/table/Table';
import { Companies, Company } from '@intern-place/types';
import { useEffect, useState } from 'react';

const columns: ColumnType<Company>[] = [
  {
    title: 'ID',
    dataIndex: 'ID',
    key: 'ID',
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
    Companies.getAll().then((res) => setData(res));
  }, []);

  return (
    <Table
      path={'companies'}
      columns={columns}
      dataSource={data}
      actions={{ detail: true }}
    />
  );
}
