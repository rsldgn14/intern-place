import { css } from '@emotion/react';
import { CompanyNoticeContainer } from '@intern-place/components';
import { Notices } from '@intern-place/types';
import { GetServerSideProps } from 'next';

interface Props {
  notices: Notices.Notice[] | null;
}

export default function Index(props: Props) {
  console.log(props.notices);

  return (
    <div css={containerCSs}>
      <CompanyNoticeContainer notices={props.notices ?? []} />
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

  if (!jwt) {
    return {
      notFound: true,
    };
  }

  const result = await Promise.all([
    await Notices.mine({
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }),
  ]);

  if (result.some((e) => e.error)) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      notices: result[0] || null,
    },
  };
};
