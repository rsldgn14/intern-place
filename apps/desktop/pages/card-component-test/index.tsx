import { css } from '@emotion/react';
import { NoticeCard } from '@intern-place/components';
import { Notices, Sector } from '@intern-place/types';
import { GetServerSideProps } from 'next';

interface Props {
  notices: Notices.Notice[];
  sectors: Sector[];
}

export default function CardComponentTest(props: Props) {
  return (
    <>
      <div css={noticeCardsCss}>
        {props.notices.map((notice) => (
          <NoticeCard key={notice.ID} notice={notice} />
        ))}
      </div>
    </>
  );
}

const noticeCardsCss = css`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const notices = await Notices.publicList();
  console.log('Notice', notices);

  return {
    props: {
      notices: notices || null,
    },
  };
};
