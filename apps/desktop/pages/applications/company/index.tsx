import { css } from '@emotion/react';
import { CompanyApplicationCard } from '@intern-place/components';
import { Applications, Companies } from '@intern-place/types';
import { GetServerSideProps } from 'next';

interface Props {
  applications: Applications.Application[];
}

export default function Index(props: Props) {
  console.log(props.applications);
  return (
    <div css={containerCSs}>
      {props.applications.length > 0
        ? props.applications.map((app, key) => (
            <CompanyApplicationCard key={key} application={app} />
          ))
        : 'Not found'}
    </div>
  );
}

const containerCSs = css`
  /* 2x2 grid */
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
`;

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

  const applications = await Companies.compniesApplication({
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  return {
    props: {
      applications: applications,
    },
  };
};
