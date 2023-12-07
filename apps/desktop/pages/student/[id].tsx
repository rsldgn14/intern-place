import { UserDetailContainer } from '@intern-place/components';
import { Students } from '@intern-place/types';
import { GetServerSideProps } from 'next';

interface Props {
  student: Students.Student;
}

export default function Student(props: Props) {
  return (
    <UserDetailContainer
      items={[
        {
          title: 'Ad Soyad',
          value:
            props.student.User.FirstName + ' ' + props.student.User.LastName,
        },
        {
          title: 'Üniversite',
          value: props.student.University,
        },
        {
          title: 'Sınıf',
          value: props.student.Grade,
        },
        {
          title: 'E-Mail',
          value: props.student.User.UserName,
        },
      ]}
      userDesc={props.student.User.Description}
      desc={props.student.Description}
      sectors={props.student.Sectors}
    />
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id;

  const student = await Students.publicRead(id as string);

  return {
    props: {
      student: student,
    },
  };
};
