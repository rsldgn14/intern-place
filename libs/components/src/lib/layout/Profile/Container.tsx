import { Company, Students, Users } from '@intern-place/types';
import SideMenu from './SideMenu';
import { use, useContext, useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { AuthContext } from '../../contexts/AuthContext';

interface Props {
  detailUser?: Company | Students.Student;
}

export default function ProfileContainer(props: Props) {
  const [component, setComponent] = useState<React.ReactNode>(null);

  const userCtx = useContext(AuthContext);

  console.log(props.detailUser);

  useEffect(() => {
    console.log(component);
  }, [component]);

  return (
    <div css={containerCss}>
      <SideMenu user={userCtx.user} setComponent={setComponent} />
      {component}
    </div>
  );
}

const containerCss = css`
  display: flex;
  gap: 50px;
  padding: 50px 120px;
`;
