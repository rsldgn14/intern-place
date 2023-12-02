import { css } from '@emotion/react';
import { Notices, Sector } from '@intern-place/types';
import NoticeCard from '../NoticeCard';

interface Props {
  notices: Notices.Notice[];
  sector: Sector;
}

export default function SectorNoticeSections(props: Props) {
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {props.notices?.length > 0 && (
        <div css={container}>
          <span css={title}>{props.sector.Name}</span>
          <div css={listContainerCss}>
            {props.notices.map((notice, index) => (
              <NoticeCard notice={notice} notShowTags />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

const listContainerCss = css`
  display: flex;
  gap: 10px;
  padding: 10px;
`;
const title = css`
  font-size: 24px;
  font-weight: 600;
`;
const container = css`
  display: flex;
  flex-direction: column;
  margin-top: 32px;
  padding-bottom: 32px;

  border-bottom: 2px solid rgba(0, 0, 0, 0.2);
`;
