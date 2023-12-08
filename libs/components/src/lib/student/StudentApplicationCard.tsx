import { css } from '@emotion/react';
import { Applications, Utils } from '@intern-place/types';
import Image from 'next/image';
import StatusBar from '../ApplicationStatusBar';
import { useRouter } from 'next/router';

interface Props {
  application: Applications.Application;
}

export default function StudentApplicationCard(props: Props) {
  const router = useRouter();

  return (
    <div css={containerCss}>
      <img
        css={imgCss}
        src={`https://picsum.photos/id/${
          270 + props.application.CompanyID
        }/200/300`}
        alt="company"
      />
      <div>
        <div
          css={link}
          onClick={() => router.push(`/company/${props.application.CompanyID}`)}
        >
          {' '}
          {props.application.Company?.Name}{' '}
        </div>
        <div css={sectorCss}>
          <Image src="/sector.svg" height={15} width={15} alt="Sector" />
          {props.application.Notice?.Sector.Name}
        </div>
        <div
          css={link}
          onClick={() => router.push(`/notice/${props.application.NoticeID}`)}
        >
          {' '}
          {props.application.Notice?.Title}{' '}
        </div>
      </div>

      <div css={dateAndStatusCss}>
        <span>
          Başvuru Tarihi : {Utils.renderDateTime(props.application.CreatedAt)}
        </span>
        <StatusBar applicationStatus={props.application.Status} />
      </div>
    </div>
  );
}

const containerCss = css`
  height: 100px;
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
