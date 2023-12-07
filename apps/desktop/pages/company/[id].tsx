import { UserDetailContainer } from '@intern-place/components';
import { Companies, Company, Students } from '@intern-place/types';
import { GetServerSideProps } from 'next';

interface Props {
  company: Company;
}

export default function Student(props: Props) {
  return (
    <UserDetailContainer
      items={[
        {
          title: 'İsim',
          value: props.company.Name,
        },
        {
          title: 'Address',
          value: props.company.Address,
        },
        {
          title: 'E-Mail',
          value: props.company.Email,
        },
      ]}
      userDesc={props.company.User.Description}
      desc={props.company.Description}
      sectors={props.company.Sector}
    />
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.params?.id;

  const company = await Companies.publicRead(id as string);

  return {
    props: {
      company: company,
    },
  };
};
