import { css } from '@emotion/react';
import { SectorNoticeSections } from '@intern-place/components';
import { Notices, Sector, Sectors } from '@intern-place/types';
import { GetServerSideProps } from 'next';

interface Props {
  notices: Notices.Notice[];
  sectors: Sector[];
}

export default function Index(props: Props) {
  return (
    <div css={containerCss}>
      {props.sectors.map((sector, index) => (
        <SectorNoticeSections
          key={index}
          sector={sector}
          notices={props.notices.filter(
            (notice) => notice.Sector.ID === sector.ID
          )}
        />
        
      ))}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const notices = await Notices.publicList({
    filter: ['Published=true'],
  });
  const sectors = await Sectors.publicGetAllSectors();

  return {
    props: {
      notices: notices || null,
      sectors: sectors || null,
    },
  };
};

const containerCss = css`
  padding: 25px;
`;
