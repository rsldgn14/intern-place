import { Applications, Company, Students } from '@intern-place/types';
import Table, { ColumnType } from '../../components/table/Table';
import { renderDateTime } from '../../utils/datetime';
import { renderCheckIcon, renderLink } from '../../utils/render';
import { useEffect, useState } from 'react';

const columns: ColumnType<Applications.Application>[] = [
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
    title: 'Student Name',
    dataIndex: 'Student',
    render: (value: Students.Student) =>
      renderLink(
        `/users/students/detail/${value.ID}`,
        `${value.User.FirstName} ${value.User.LastName}`
      ),
  },
  {
    title: 'Company',
    dataIndex: ['Company'],
    key: 'Company.Name',
    render: (value: Company) =>
      renderLink(`/users/companies/detail/${value.ID}`, `${value.Name}`),
  },
  {
    title: 'Status',
    dataIndex: 'Status',
    render: (value: Applications.Status) => Applications.getStatus(value)?.Name,
  },
];

export default function Index() {
  const [data, setData] = useState<Applications.Application[] | undefined>(
    undefined
  );

  useEffect(() => {
    Applications.getAll().then((res) => setData(res));
  }, []);

  return <Table path={'/applications'} columns={columns} dataSource={data} />;
}
