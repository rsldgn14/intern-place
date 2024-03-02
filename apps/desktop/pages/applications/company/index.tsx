import { css } from '@emotion/react';
import {
  ApplicationFilter,
  CompanyApplicationCard,
} from '@intern-place/components';
import { Applications, Companies, Notices } from '@intern-place/types';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';

interface Props {
  applications: Applications.Application[];
  notices: Notices.Notice[];
}

export default function Index(props: Props) {
  const [applications, setApplications] = useState<Applications.Application[]>(
    props.applications
  );
  const [filteredData, setFilteredData] = useState<number | undefined>(
    undefined
  );

  useEffect(() => {
    if (filteredData) {
      const filteredApplications = props.applications.filter(
        (app) => app.NoticeID === filteredData
      );
      setApplications(filteredApplications);
    } else {
      setApplications(props.applications);
    }
  }, [filteredData, props.applications]);

  return (
    <div css={bodyCss}>
      <ApplicationFilter
        notices={props.notices}
        setFilteredData={(id: number) => setFilteredData(id)}
      />
      <div css={containerCSs}>
        {applications.length > 0
          ? applications.map((app, key) => (
              <CompanyApplicationCard key={key} application={app} />
            ))
          : 'Not found'}
      </div>
    </div>
  );
}

const containerCSs = css`
  /* 2x2 grid */
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
`;

const bodyCss = css`
  display: flex;
  gap: 50px;
  padding: 20px;
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

  const notices = await Notices.mine({
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  return {
    props: {
      applications: applications,
      notices: notices,
    },
  };
};
