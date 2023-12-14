import { Company, Notices, Sector } from '@intern-place/types';
import { ColumnType } from '../../../components/table/Table';
import { renderDateTime } from '../../../utils/datetime';
import Form from '../../../components/form/Form';
import { useCallback } from 'react';
import dayjs from 'dayjs';
import { renderCheckIcon } from '../../../utils/render';
import { Button } from 'antd';
import { useRouter } from 'next/router';

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
    title: 'Status',
    key: 'Status',
    description: true,
    render: (value, record) => {
      console.log(value);
      return Notices.StatusArray.find((e) => e.ID === value)?.Name;
    },
  },
  {
    title: 'Published',
    key: 'Published',
    description: true,
    render: renderCheckIcon,
  },
];

export default function Index(props: Props) {
  const router = useRouter();

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

  const onApprove = useCallback(() => {
    Notices.approve(props.notice.ID)
      .then(() => {
        router.back();
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props.notice.ID, router]);

  const onReject = useCallback(() => {
    Notices.reject(props.notice.ID)
      .then(() => {
        router.back();
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props.notice.ID, router]);

  return (
    <>
      <Form
        initialValues={props.notice}
        items={columns}
        onSubmit={onSubmit}
        customButtons={[
          <Button
            onClick={onApprove}
            disabled={props.notice.Status === Notices.Status.Aprroved}
            key={'Approve'}
            type="primary"
          >
            Approve
          </Button>,
          <Button
            onClick={onReject}
            danger
            disabled={props.notice.Status === Notices.Status.Rejected}
            key={'Reject'}
            type="primary"
          >
            Reject
          </Button>,
        ]}
      />
    </>
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
