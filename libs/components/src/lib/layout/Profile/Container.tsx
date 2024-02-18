import { Company, Students, Users } from '@intern-place/types';
import SideMenu from './SideMenu';
import { useState } from 'react';
import { css } from '@emotion/react';

interface Props {
  user?: Users.User;
  detailUser?: Company | Students.Student;
}

export default function ProfileContainer(props: Props) {
  const [component, setComponent] = useState<React.ReactNode>(null);

  return (
    <div css={containerCss}>
      <SideMenu user={props.user} setComponent={setComponent} />
      {component}
    </div>
  );
}

const containerCss = css`
  display: flex;
  gap: 50px;
  padding: 50px 120px;
`;
