import { renderBirthDate, renderDateTime } from '../../../../utils/datetime';
import { ColumnType } from '../../../../components/table/Table';
import Form from '../../../../components/form/Form';
import { useCallback } from 'react';
import { Sector, Students, Users } from '@intern-place/types';
import { BookOutlined } from '@ant-design/icons';
interface Props {
  student: Students.Student;
}

const columns: ColumnType<Students.Student>[] = [
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
    title: 'Birth Date',
    key: 'BirthDate',
    description: true,
    render: renderBirthDate,
  },
  {
    title: 'University',
    key: 'University',
  },
  {
    title: 'Grade',
    key: 'Grade',
  },
  {
    title: 'Email',
    key: 'User',
    description: true,
    render: (value: Users.User, _) => value.UserName,
  },
  {
    title: 'Description',
    key: 'User',
    description: true,
    render: (value: Users.User, _) => value.Description,
  },
  {
    title: 'Sectors',
    key: 'Sectors',
    description: true,
    render: (value: Sector[]) => (
      <div>
        {value.map((v) => (
          <div key={v.Name}>
            <BookOutlined /> {v.Name}
          </div>
        ))}
      </div>
    ),
  },
];

export default function Index(props: Props) {
  const onSubmit = useCallback(
    (value: any) => {
      Students.update(props.student.ID, value);
    },
    [props.student.ID]
  );

  return (
    <Form initialValues={props.student} items={columns} onSubmit={onSubmit} />
  );
}

export const getServerSideProps = async (context: { query: { id: any } }) => {
  try {
    const { id } = context.query;
    const result = await Students.get(id);

    console.log(result);

    return {
      props: {
        student: result,
      },
    };
  } catch (e) {
    //do nothing
  }
};
