import { renderDateTime } from '../../../utils/datetime';
import Form from '../../../components/form/Form';
import { ColumnType } from '../../../components/table/Table';
import { get, Sector, Sectors } from '@intern-place/types';
import { useCallback } from 'react';
import { Modal } from 'antd';
import { useRouter } from 'next/router';
interface Props {
  sector: Sector;
}

const columns: ColumnType<Sector>[] = [
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
    title: 'Name',
    key: 'Name',
  },
];

export default function Index(props: Props) {
  const onSubmit = useCallback(
    (value: any) => {
      Sectors.update(props.sector.ID, value).then((r) => console.log(r));
    },
    [props.sector.ID]
  );

  const [modal, contextHolder] = Modal.useModal();

  const router = useRouter();

  const onDelete = useCallback(async () => {
    modal.confirm({
      onOk: async () => {
        await Sectors.del(props.sector.ID).catch((err) => console.error(err));
        router.back();
      },
      title: 'Are you sure about delete sector.',
      content: 'This process can not be undone.',
      okText: 'Yes',
      cancelText: 'No',
      okButtonProps: {
        danger: true,
      },
    });
  }, [modal, props.sector.ID, router]);

  return (
    <>
      <Form
        initialValues={props.sector}
        items={columns}
        onSubmit={onSubmit}
        onDelete={onDelete}
      />
      {contextHolder}
    </>
  );
}

export const getServerSideProps = async (context: { query: { id: any } }) => {
  try {
    const { id } = context.query;
    const results = await get(id);

    return {
      props: {
        sector: results,
      },
    };
  } catch (e) {
    //do nothing
  }
};
