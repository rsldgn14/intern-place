import { NoticeDetailContainer } from '@intern-place/components';
import { Notices } from '@intern-place/types';
import { GetServerSideProps } from 'next';

interface Props {
  notice: Notices.Notice | null;
}

export default function Index(props: Props) {
  return <NoticeDetailContainer notice={props.notice} />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id;

  const notice = await Notices.get(id as string);

  return {
    props: {
      notice: notice || null,
    },
  };
};
