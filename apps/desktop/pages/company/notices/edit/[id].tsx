import { CompanyNoticeEdit } from '@intern-place/components';
import { Company, Notices, Sector, Sectors } from '@intern-place/types';
import { GetServerSideProps } from 'next';

interface Props {
  sectors: Sector[] | null;
  notice: Notices.Notice | null;
}

export default function Edit(props: Props) {
  return (
    <div>
      <CompanyNoticeEdit
        sectors={props.sectors ?? undefined}
        notice={props.notice ?? undefined}
      />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const jwt = context.req.cookies['jwt'];

  if (!jwt) {
    return {
      notFound: true,
    };
  }

  const id = context.params?.id;

  const result = await Promise.all([
    await Notices.mine({
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }),
    await Sectors.publicGetAllSectors(),
  ]);

  if (result.some((e) => e.error)) {
    return {
      notFound: true,
    };
  }

  const notice = result[0].find((e: any) => e.ID === parseInt(id as string));


  if (!notice) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
        sectors: result[1] || null,
      notice: notice,
    },
  };
};
