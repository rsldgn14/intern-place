import { css } from '@emotion/react';
import NoticeCompanyArea from './NoticeCompanyArea';
import { Applications, Notices, Users } from '@intern-place/types';
import NoticeInformationArea from './NoticeInformationArea';
import Button from '../../Button';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { StudentApplicationContext } from '../../contexts/StudentApplicationContext';
import { useRouter } from 'next/router';

interface Props {
  notice: Notices.Notice | null;
}

export default function NoticeDetailContainer(props: Props) {
  const [hasApplication, setHasApplication] = useState<boolean>(false);

  const authCtx = useContext(AuthContext);
  const appCtx = useContext(StudentApplicationContext);

  const router = useRouter();

  useEffect(() => {
    const hasApplication = appCtx.applications?.some(
      (app) => app.NoticeID === props.notice?.ID
    );
    setHasApplication(hasApplication ?? false);

    console.log(appCtx.applications);
  }, [appCtx.applications, props.notice?.ID]);

  return (
    <div css={containerCss}>
      <div css={detailCss}>
        <div css={pageTitleCss}> Şirket Detayı </div>
        <NoticeCompanyArea company={props.notice?.Company} />
        <div css={pageTitleCss}> Başvuru Detayı </div>
        <NoticeInformationArea notice={props.notice} />
        {authCtx.user?.RoleID === Users.Role.STUDENT && !hasApplication && (
          <div
            css={buttonCss}
            onClick={() =>
              Applications.create({
                CompanyID: props.notice?.Company.ID ?? 0,
                NoticeID: props.notice?.ID ?? 0,
                Status: Applications.ApplicationStatus.WAITING,
              }).then(() => router.reload())
            }
          >
            <Button size="large" title="Başvur" />
          </div>
        )}
      </div>
    </div>
  );
}

const containerCss = css`
  display: flex;
  justify-content: center;
  background-color: #d3bed3;
`;

const detailCss = css`
  min-height: 80vh;
  width: 70%;
  margin-top: 64px;
  margin-bottom: 64px;
  background-color: white;
  border-radius: 10px 10px 0 0;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.6);
  transition: box-shadow 0.3s ease-in-out;
`;

const pageTitleCss = css`
  font-size: 32px;
  margin: 16px 32px;
  font-weight: 700;
`;

const buttonCss = css`
  margin: 25px 0;
  display: flex;
  justify-content: center;
  width: 100%;
`;
