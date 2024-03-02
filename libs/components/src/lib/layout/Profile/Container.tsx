import { Companies, Company, Students, Users } from '@intern-place/types';
import SideMenu from './SideMenu';
import { useContext, useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { StudentContext } from '../../contexts/StudentContext';
import { CompanyContext } from '../../contexts/CompanyContext';

interface Props {
  user?: Users.User;
  detailUser?: Company | Students.Student;
}

export default function ProfileContainer(props: Props) {
  const [component, setComponent] = useState<React.ReactNode>(null);

  const studentCtx = useContext(StudentContext);
  const companyCtx = useContext(CompanyContext);

  useEffect(() => {
    if (props.user?.RoleID === Users.Role.STUDENT) {
      Students.me().then((res) => {
        studentCtx.setStudent(res);
      });
    } else {
      Companies.me().then((res) => {
        companyCtx.setCompany(res);
      });
    }
  }, []);

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
