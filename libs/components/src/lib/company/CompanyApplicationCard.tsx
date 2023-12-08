import { css } from '@emotion/react';
import { Applications, Utils } from '@intern-place/types';
import Image from 'next/image';
import StatusBar from '../ApplicationStatusBar';
import { useRouter } from 'next/router';
import Button from '../Button';
import { useCallback } from 'react';

interface Props {
  application: Applications.Application;
}

export default function CompanyApplicationCard(props: Props) {
  const router = useRouter();

  const onApprove = useCallback(() => {
    Applications.approve(props.application.ID).then(() => {
      router.reload();
    });
  }, [props.application.ID, router]);

  const onReject = useCallback(() => {
    Applications.reject(props.application.ID).then(() => {
      router.reload();
    });
  }, [props.application.ID, router]);

  return (
    <div css={containerCss}>
      <img
        css={imgCss}
        src={`https://picsum.photos/id/${
          270 + props.application.StudentID
        }/200/300`}
        alt="company"
      />
      <div>
        <div
          css={link}
          onClick={() => router.push(`/student/${props.application.StudentID}`)}
        >
          {props.application.Student?.User.FirstName +
            ' ' +
            props.application.Student?.User.LastName}
        </div>
        <div css={sectorCss}>
          <Image src="/sector.svg" height={15} width={15} alt="Sector" />
          {props.application.Notice?.Sector.Name}
        </div>
        <div
          css={link}
          onClick={() => router.push(`/notice/${props.application.NoticeID}`)}
        >
          {props.application.Notice?.Title}
        </div>
      </div>

      <div css={dateAndStatusCss}>
        <span>
          Başvuru Tarihi : {Utils.renderDateTime(props.application.CreatedAt)}
        </span>
        <StatusBar applicationStatus={props.application.Status} />
        {props.application.Status === Applications.Status.Waiting && (
          <div css={buttonAlignCss}>
            <Button onClick={onApprove} size="small" title="Kabul Et" />
            <Button onClick={onReject} size="small" danger title="Reddet" />
          </div>
        )}
      </div>
    </div>
  );
}

const containerCss = css`
  height: 140px;
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
