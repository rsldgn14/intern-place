import { Notices, Utils } from '@intern-place/types';
import Button from '../../../Button';
import { useRouter } from 'next/router';
import Image from 'next/image';
import CompanyNoticeStatus from './CompanyNoticeStatus';
import { css } from '@emotion/react';
import { useCallback } from 'react';

interface Props {
  notice: Notices.Notice;
}

export default function CompanyNoticeCard(props: Props) {
  const router = useRouter();

  const onPublish = useCallback(() => {
    Notices.publish(props.notice.ID)
      .then((res) => {
        router.reload();
      })
      .catch((err) => {
        console.log(err);
      });
    router.reload();
  }, [props.notice.ID, router]);

  const onUnPublish = useCallback(() => {
    Notices.unpublish(props.notice.ID)
      .then((res) => {
        router.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.notice.ID, router]);

  return (
    <div css={containerCss}>
      <img
        css={imgCss}
        src={`https://picsum.photos/id/${270 + props.notice.ID}/200/300`}
        alt="company"
      />
      <div>
        <div
          css={link}
          onClick={() => router.push(`/notice/${props.notice.ID}`)}
        >
          {props.notice.Title}
        </div>
        <div css={sectorCss}>
          <Image src="/sector.svg" height={15} width={15} alt="Sector" />
          {props.notice.Sector.Name}
        </div>
      </div>

      <div css={dateAndStatusCss}>
        <span>
          Oluşturulma Tarihi : {Utils.renderDateTime(props.notice.CreatedAt)}
        </span>
        <div>
          <CompanyNoticeStatus noticeStatus={props.notice.Status} />
          <div>{props.notice.Published ? 'Yayında' : 'Yayında değil'}</div>
        </div>

        <div css={buttonAlignCss}>
          {props.notice.Status === Notices.Status.Aprroved &&
          props.notice.Published ? (
            <Button
              onClick={onUnPublish}
              size="small"
              title="Yayından kaldır"
            />
          ) : (
            <Button
              disabled={props.notice.Status !== Notices.Status.Aprroved}
              onClick={onPublish}
              size="small"
              title="Yayınla"
            />
          )}

          <Button size="small" variant="secondary" title="Güncelle" />
          <Button size="small" danger title="Sil" />
        </div>
      </div>
    </div>
  );
}

const containerCss = css`
  height: 180px;
  display: flex;
  background-color: #fff;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  transition: all 0.3s ease-in-out;
  border: 1px solid #d3bed3;
  &:hover {
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  }
  div {
    margin-left: 10px;
  }
`;

const imgCss = css`
  width: 80px;
  height: 80px;
  border-radius: 5px;
`;

const sectorCss = css`
  display: flex;
  gap: 3px;
  align-items: center;
`;

const dateAndStatusCss = css`
  flex: 1;
  text-align: right;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
`;

const link = css`
  cursor: pointer;
  &:hover {
    color: blue;
  }
`;

const buttonAlignCss = css`
  display: flex;
  gap: 10px;
  padding-top: 15px;
`;
