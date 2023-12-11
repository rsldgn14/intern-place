import { CreateNoticeContainer } from '@intern-place/components';
import { Companies, Company, Sector, Sectors } from '@intern-place/types';
import { GetServerSideProps } from 'next';

interface Props {
  company: Company | null;
  sectors: Sector[] | null;
}

export default function Index(props: Props) {
  console.log(props);
  return (
    <div>
      <CreateNoticeContainer sectors={props.sectors ?? []} />
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

  const result = await Promise.all([
    await Companies.me({
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }),
    await Sectors.publicGetAllSectors(),
  ]);

  console.log(result);

  if (result.some((e) => e.error)) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      company: result[0] || null,
      sectors: result[1] || null,
    },
  };
};
