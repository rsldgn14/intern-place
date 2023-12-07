import { Applications, Students } from '@intern-place/types';
import { GetServerSideProps } from 'next';

interface Props {
  applications: Applications.Application[];
}

export default function StudentApplication(props: Props) {
  console.log(props.applications);

  return (
    <div>
      <h1>Welcome to StudentApplication!</h1>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const jwt = context.req.cookies['jwt'];

  // if (!jwt) {
  //   return {
  //     redirect: {
  //       destination: '/login',
  //       permanent: false,
  //     },
  //   };
  // }

  if (!jwt) {
    return {
      notFound: true,
    };
  }

  const applications = await Students.studentApplications({
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  console.log(applications);

  return {
    props: {
      applications: applications,
    },
  };
};
