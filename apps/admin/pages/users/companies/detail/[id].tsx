import { Companies, Company, Sector } from '@intern-place/types';
import { renderDateTime } from '../../../../utils/datetime';
import { ColumnType } from '../../../../components/table/Table';
import Form from '../../../../components/form/Form';
import { useCallback } from 'react';

interface Props {
  company: Company;
}

const columns: ColumnType<Company>[] = [
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
  {
    title: 'Description',
    key: 'Description',
    type: 'textarea',
  },
  {
    title: 'Email',
    key: 'Email',
  },
  {
    title: 'Sectors',
    key: 'Sector',
    description: true,

    render: (value: Sector[]) => (
      <ul>
        {value.map((v) => (
          <li key={v.Name}> {v.Name} </li>
        ))}
      </ul>
    ),
  },
];

export default function Index(props: Props) {
  const onSubmit = useCallback(
    (value: any) => {
      Companies.update(props.company.ID, value);
    },
    [props.company.ID]
  );

  return (
    <Form initialValues={props.company} items={columns} onSubmit={onSubmit} />
  );
}

export const getServerSideProps = async (context: { query: { id: any } }) => {
  try {
    const { id } = context.query;
    const result = await Companies.get(id);

    return {
      props: {
        company: result,
      },
    };
  } catch (e) {
    //do nothing
  }
};
