import { css } from '@emotion/react';
import { Notices, Utils } from '@intern-place/types';

interface Props {
  notice: Notices.Notice | null;
}

export default function NoticeInformationArea(props: Props) {
  return (
    <div css={containerCss}>
      <div css={informationCss}>
        <div css={datesCss}>
          <span css={titleCss}>{props.notice?.Title} </span>

          <div css={timesCss}>
            <span>
              Başlangıç Tarihi :{' '}
              {Utils.renderDateTime(props.notice?.StartTime ?? '')}
            </span>
            <span>
              Bitiş Tarihi : {Utils.renderDateTime(props.notice?.EndTime ?? '')}
            </span>
          </div>
        </div>
        <span
          dangerouslySetInnerHTML={{
            __html: props.notice ? props.notice?.Description : '',
          }}
        />
      </div>
    </div>
  );
}

const containerCss = css`
  display: flex;
  flex-direction: column;
  gap: 64px;
  padding-bottom: 24px;
`;

const informationCss = css`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 32px 160px 0 160px;
`;

const datesCss = css`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

const timesCss = css`
  font-size: 14px;
  display: flex;
  gap: 32px;
  padding: 12px 24px;
  border-radius: 10px 10px 0 0;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.3s ease-in-out;
`;

const titleCss = css`
  font-size: 20px;
  font-weight: 600;
`;
