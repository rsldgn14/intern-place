import { css } from '@emotion/react';
import SectorInfo from './SectorInfo';
import CardOwner from './CardOwner';
import NoticeReminder from './NoticeReminder';
import { Notices } from '@intern-place/types';
import { useRouter } from 'next/router';

interface Props {
  notice: Notices.Notice;
  notShowTags?: boolean;
}

export default function NoticeCard(props: Props) {
  const router = useRouter();

  return (
    <div css={noticeCardContainer}>
      <img
        css={imgCss}
        src={`https://picsum.photos/id/${props.notice.ID + 300}/200/300`}
        alt=""
      />
      <div css={noticeCardContentCss}>
        <div css={middleCss}>
          {!props.notShowTags && (
            <SectorInfo
              title={props.notice.Sector?.Name}
              directLink={`sectors/${props.notice.Sector.ID}`}
              color="yellow"
            />
          )}

          {
            //TO-DO implement notice reminder for is endig function
            //props.notice.isEnding && <NoticeReminder/>
          }
        </div>
        <div
          css={cursor}
          onClick={() => router.push(`/notice/${props.notice.ID}`)}
        >
          <span css={sectorTitleCss}>{props.notice.Title}</span>
          <span css={descriptionCss}>
            {' '}
            <div
              dangerouslySetInnerHTML={{ __html: props.notice.Description }}
            />
          </span>
        </div>
      </div>
      <CardOwner notice={props.notice} />
    </div>
  );
}

const noticeCardContainer = css`
  border: 1px solid black;
  width: 250px;
  height: 420px;
  border-radius: 10px;
  background: linear-gradient(
    rgba(254, 141, 198, 0.6),
    rgba(254, 209, 199, 0.6)
  );
`;

const imgCss = css`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 10px 10px 0 0;
`;

const noticeCardContentCss = css`
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 10px 0;
  min-height: 186px;
`;

const sectorTitleCss = css`
  font-size: 18px;
  font-weight: bold;
`;

const descriptionCss = css`
  font-size: 14px;
  font-weight: 400;
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  height: 60px;
`;

const middleCss = css`
  display: flex;
  justify-content: space-between;
`;

const cursor = css`
  cursor: pointer;
`;
