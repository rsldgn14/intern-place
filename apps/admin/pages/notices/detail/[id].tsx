import { Company, Notices, Sector } from '@intern-place/types';
import { ColumnType } from '../../../components/table/Table';
import { renderDateTime } from '../../../utils/datetime';
import Form from '../../../components/form/Form';
import { useCallback } from 'react';
import dayjs from 'dayjs';
import { renderCheckIcon } from '../../../utils/render';

interface Props {
  notice: Notices.Notice;
}

const columns: ColumnType<Notices.Notice>[] = [
  {
    title: 'ID',
    key: 'ID',
    description: true,
  },
  {
    title: 'Created Date',
    key: 'CreatedAt',
    description: true,
    render: renderDateTime,
  },
  {
    title: 'Update Date',
    key: 'UpdatedAt',
    description: true,
    render: renderDateTime,
  },
  {
    title: 'Title',
    key: 'Title',
  },
  {
    title: 'Description',
    key: 'Description',
    type: 'textarea',
  },
  {
    title: 'Company',
    key: 'Company',
    description: true,
    render: (value: Company) => value?.Name,
  },
  {
    title: 'Sector',
    key: 'Sector',
    description: true,
    render: (value: Sector) => value?.Name,
  },
  {
    title: 'Start Time',
    key: 'StartTime',
    type: 'datepicker',
  },
  {
    title: 'End Time',
    key: 'EndTime',
    type: 'datepicker',
  },
  {
    title: 'Intern Count',
    key: 'InternCount',
    description: true,
  },
  {
    title: 'Active',
    key: 'Active',
    description: true,
    render: renderCheckIcon,
  },
];

export default function Index(props: Props) {
  const onSubmit = useCallback(
    (value: any) => {
      value.StartTime = dayjs(value.StartTime).format(
        'YYYY-MM-DD HH:mm:ss.SSS'
      );
      value.EndTime = dayjs(value.EndTime).format('YYYY-MM-DD HH:mm:ss.SSS');
      Notices.update(props.notice.ID, value);
    },
    [props.notice.ID]
  );

  return (
    <Form initialValues={props.notice} items={columns} onSubmit={onSubmit} />
  );
}

export const getServerSideProps = async (context: { query: { id: any } }) => {
  try {
    const { id } = context.query;
    const results = await Notices.get(id);

    return {
      props: {
        notice: results,
      },
    };
  } catch (e) {
    //do nothing
  }
};
