import { AuthContext, ProfileContainer } from '@intern-place/components';
import { Companies, Company, Students, Users } from '@intern-place/types';
import { GetServerSidePropsContext } from 'next';
import { useContext } from 'react';

interface Props {
  detailUser?: Company | Students.Student;
}

export default function Profile(props: Props) {
  return (
    <div>
      <ProfileContainer detailUser={props.detailUser} />
    </div>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const jwt = context.req.cookies['jwt'];

  if (!jwt) {
    return {
      notFound: true,
    };
  }

  const user = await Users.me({
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  if (user.error) {
    return {
      notFound: true,
    };
  }

  let me;

  if (user.RoleID === Users.Role.STUDENT) {
    me = await Students.me({
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
  } else if (user.RoleID === Users.Role.COMPANY) {
    me = await Companies.me({
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
  }

  if (!me) {
    return {
      notFound: true,
    };
  }

  console.log(me);

  if (me.error) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      detailUser: me || null,
    },
  };
};
