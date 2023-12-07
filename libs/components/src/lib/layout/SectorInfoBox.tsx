import { css } from '@emotion/react';
import { Sector } from '@intern-place/types';
import Image from 'next/image';

interface Props {
  sectors: Sector[];
}

export default function SectorInfoBox(props: Props) {
  return (
    <>
      {props.sectors.map((sector) => {
        return (
          <span css={sectorItemCss}>
            <Image src={'/sector.svg'} height={20} width={20} alt="sector" />{' '}
            {sector.Name}
          </span>
        );
      })}
    </>
  );
}

const sectorItemCss = css`
  display: flex;
  align-items: center;
  gap: 5px;
`;
