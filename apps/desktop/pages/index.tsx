import { HighlightedNotices } from '@intern-place/components';
import { Notices } from '@intern-place/types';
import { GetServerSideProps } from 'next';

interface Props {
  mostVisitedNotices: Notices.Notice[];
  mostInterCountNotices: Notices.Notice[];
  newestNotices: Notices.Notice[];
}

export default function Home(props: Props) {
  return (
    <div>
      <HighlightedNotices
        title="En çok ziyaret edilenler"
        notices={props.mostVisitedNotices}
      />
      <HighlightedNotices
        title="En çok alım yapılanlar"
        notices={props.mostInterCountNotices}
      />
      <HighlightedNotices
        title="En yeni ilanlar"
        notices={props.newestNotices}
      />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const mostVisitedNotices = await Notices.publicList({
    limit: 5,
    sort: ['-ViewCount'],
  });

  const mostInterCountNotices = await Notices.publicList({
    limit: 5,
    sort: ['-InternCount'],
  });

  const newestNotices = await Notices.publicList({
    limit: 5,
    sort: ['-CreatedAt'],
  });

  return {
    props: {
      mostVisitedNotices: mostVisitedNotices,
      mostInterCountNotices: mostInterCountNotices,
      newestNotices: newestNotices,
    },
  };
};
