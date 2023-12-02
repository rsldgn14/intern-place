import { css } from '@emotion/react';
import { NoticeCard } from '@intern-place/components';
import { Notices, Sector, Sectors } from '@intern-place/types';
import { GetServerSideProps } from 'next';
import Link from 'next/link';

interface Props {
  notices: Notices.Notice[];
  sectors: Sector[];
}

export default function CardComponentTest(props: Props) {
  return (
    <>
      {props.sectors.map((sector) => (
        <Link key={sector.ID} href={`sectors/${sector.ID}`}>
          {sector.Name}
        </Link>
      ))}
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
  const sectors = await Sectors.getAll();

  console.log('Notice', notices);

  return {
    props: {
      notices: notices || null,
      sectors: sectors || null,
    },
  };
};
