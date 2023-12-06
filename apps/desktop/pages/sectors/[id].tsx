import { css } from '@emotion/react';
import { NoticeCard } from '@intern-place/components';
import { Notices, Sector } from '@intern-place/types';
import { GetServerSideProps } from 'next';

interface Props {
  notices: Notices.Notice[];
}

export default function Sector(props: Props) {
  return (
    <div css={noticeCardsCss}>
      {props.notices.length === 0 ? (
        <span css={titleCss}>İlan bulunamadı</span>
      ) : (
        <>
          <span css={titleCss}>{props.notices[0].Sector.Name}</span>
          <div css={contentCss}>
            {props.notices.map((notice) => (
              <NoticeCard key={notice.ID} notice={notice} notShowTags />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

const noticeCardsCss = css`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const contentCss = css`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin: 0 20px;
  gap: 20px;
`;

const titleCss = css`
  padding: 0 20px;
    font-size: 24px;
    font-weight: 600;
`;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id;

  const notices = await Notices.publicList({
    filter: [`SectorID=${id}`],
  });

  return {
    props: {
      notices: notices || null,
    },
  };
};
