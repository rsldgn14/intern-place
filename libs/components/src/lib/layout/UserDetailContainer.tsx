import { css } from '@emotion/react';
import { Sector } from '@intern-place/types';
import InfoBox from './InfoBox';
import SectorInfoBox from './SectorInfoBox';

interface Props {
  items: {
    title: string;
    value: string | number;
  }[];
  userDesc: string;
  desc: string;
  sectors: Sector[];
}

export default function UserDetailContainer(props: Props) {
  return (
    <div css={containerCss}>
      <div css={leftSideCss}>
        <img
          src="https://picsum.photos/id/237/200/300"
          alt="student"
          height={250}
          width={250}
        />

        <div css={descriptionCss}>{props.userDesc}</div>
        <div css={sectorCss}>
          <span css={sectorTitleCss}>Sektörler</span>
          <SectorInfoBox sectors={props.sectors} />
        </div>
      </div>
      <div css={rightSideCss}>
        <InfoBox items={props.items} />
        <div css={descCss} dangerouslySetInnerHTML={{ __html: props.desc }} />
      </div>
    </div>
  );
}

const containerCss = css`
  display: flex;
  padding: 50px 120px;
  gap: 50px;
  width: 100%;
`;

const leftSideCss = css`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 20%;
`;

const rightSideCss = css`
  flex: 1;
`;

const sectorCss = css`
  display: flex;
  flex-direction: column;
  gap: 5px;
  justify-content: center;
  padding: 10px;
`;

const descriptionCss = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: gray;
`;

const descCss = css`
  margin-top: 20px;
  padding: 20px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  width: 100%;
`;

const sectorTitleCss = css`
  font-size: 20px;
  font-weight: bold;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  margin-bottom: 10px;
`;
