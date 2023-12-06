import { Notices } from '@intern-place/types';
import NoticeCard from './NoticeCard';
import { css } from '@emotion/react';

interface Props {
  notices: Notices.Notice[];
  title?: string;
}

export default function HighlightedNotices(props: Props) {
  return (
    <div css={containerCss}>
      <span css={titleCss}>{props.title}</span>

      <div css={noticeContainerCss}>
        {props.notices.map((notice) => (
          <NoticeCard notice={notice} key={notice.ID} />
        ))}
      </div>
    </div>
  );
}

const noticeContainerCss = css`
  display: flex;
    justify-content: space-between;
`;

const containerCss = css`
 margin: 32px 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const titleCss = css`
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 10px;
`
