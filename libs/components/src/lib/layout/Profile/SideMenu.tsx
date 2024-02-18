import { Users } from '@intern-place/types';
import { SideMenuItem, sideMenuItem } from './sideMenuItem';
import { css } from '@emotion/react';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
} from 'react';
import SideMenuChild from './SideMenuChild';
import AvatarImage from './AvatarImage';

interface Props {
  user?: Users.User;
  setComponent: Dispatch<SetStateAction<ReactNode>>;
}

export default function SideMenu(props: Props) {
  useEffect(() => {
    props.setComponent(
      sideMenuItem(props.user, props.user?.RoleID)[0].component
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.user]);

  const selectItem = useCallback(
    (item: SideMenuItem) => {
      props.setComponent(item.component);
    },
    [props]
  );

  return (
    <div css={profileCss}>
      <span css={headerCss}>
        {props.user?.RoleID === Users.Role.COMPANY ? 'Şirket' : 'Öğrenci'}{' '}
        Profili
      </span>
      <AvatarImage />
      <div css={containerCss}>
        {sideMenuItem(props.user, props?.user?.RoleID).map(
          (item: SideMenuItem) => {
            return (
              <>
                <SideMenuChild item={item} selectItem={selectItem} />
                <div css={childCss}>
                  {item.children?.map((child) => {
                    return (
                      <SideMenuChild item={child} selectItem={selectItem} />
                    );
                  })}
                </div>
              </>
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

const childCss = css`
  padding-left: 20px;
  gap: 10px;
  cursor: pointer;
  &:hover {
    background-color: #e0e0e0;
  }
`;
