import { Users } from '@intern-place/types';
import { SideMenuItem, sideMenuItem } from './sideMenuItem';
import { css } from '@emotion/react';
import { Dispatch, ReactNode, SetStateAction, useEffect } from 'react';

interface Props {
  user?: Users.User;
  setComponent: Dispatch<SetStateAction<ReactNode>>;
}

export default function SideMenu(props: Props) {
  useEffect(() => {
    props.setComponent(
      sideMenuItem(props.user, props.user?.RoleID)[0].component
    );
  }, []);

  return (
    <div css={profileCss}>
      <span css={headerCss}>
        {props.user?.RoleID === Users.Role.COMPANY ? 'Şirket' : 'Öğrenci'}{' '}
        Profili
      </span>
      <div css={containerCss}>
        {sideMenuItem(props.user, props?.user?.RoleID).map(
          (item: SideMenuItem) => {
            return (
              <span
                css={itemCss}
                onClick={() => props.setComponent(item.component)}
              >
                {item.title}
              </span>
            );
          }
        )}
      </div>
    </div>
  );
}

const containerCss = css`
  background-color: #f5f5f5;
  width: 200px;
  border-radius: 10px;
  border: 1px solid #e0e0e0;
`;
const itemCss = css`
  display: block;
  padding: 10px;
  cursor: pointer;
  box-sizing: border-box;

  border-shadow: 0 1px 0 0 #e0e0e0;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const profileCss = css`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const headerCss = css`
  align-self: center;
  font-size: 24px;
  font-weight: bold;
`;
