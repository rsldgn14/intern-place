import { css } from '@emotion/react';
import { API, Images, Notices, Utils } from '@intern-place/types';
import useImageLoader from '../../hooks/useImageLoader';

interface Props {
  notice: Notices.Notice | null;
}

export default function NoticeInformationArea(props: Props) {
  const image = useImageLoader(
    `${API.BACKEND_URL}/public/images/content/${Images.EntityType.Notice}/${
      props.notice!.ID! ?? 0
    }`,
    'https://media.istockphoto.com/id/1147544807/tr/vekt%C3%B6r/hay%C4%B1r-k%C3%BC%C3%A7%C3%BCk-resim-vekt%C3%B6r-grafi%C4%9Fi.jpg?s=2048x2048&w=is&k=20&c=tY3WAYBvW78d65y1HKmcUV91wZjzF-MKEyL3XmFOZAg='
  );

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
            <span>Kontenjan Sayısı : {props.notice?.InternCount ?? 0}</span>
          </div>
        </div>
        <div css={imageCss}>
          <img src={image} alt="notice" height={300} width={300} />
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
  padding: 32px;
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
  gap: 20px;
  padding: 12px 24px;
  border-radius: 10px 10px 0 0;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.3s ease-in-out;
`;

const titleCss = css`
  font-size: 20px;
  font-weight: 600;
`;

const imageCss = css`
  display: flex;
  width: 100%;
  justify-content: center;
`;
