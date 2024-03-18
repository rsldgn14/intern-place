import React from 'react';
import { css } from '@emotion/react';
import { Applications } from '@intern-place/types';
import ApplicationInfoBar from './ApplicationInfoBar';

interface Props {
  title: string;
  applicationFilterItemIcons: Applications.ApplicationFilterItemIcons;
  onClick?: () => void;
}

const ApplicationFilterItem: React.FC<Props> = ({
  title,
  onClick,
  applicationFilterItemIcons,
}) => {
  return (
    <div css={itemCss} onClick={onClick}>
      <span>{title} </span>
      <div css={iconsSidecss}>
        <ApplicationInfoBar
          Icon={applicationFilterItemIcons.Approved.Icon}
          Count={applicationFilterItemIcons.Approved.Count}
        />
        <ApplicationInfoBar
          Icon={applicationFilterItemIcons.Rejected.Icon}
          Count={applicationFilterItemIcons.Rejected.Count}
        />
        <ApplicationInfoBar
          Icon={applicationFilterItemIcons.Waiting.Icon}
          Count={applicationFilterItemIcons.Waiting.Count}
        />
      </div>
    </div>
  );
};

const itemCss = css`
  cursor: pointer;
  padding: 10px 0;
  &:hover {
    background-color: #f0f0f0;
  }
  display: flex;
  justify-content: space-between;
`;

const iconsSidecss = css`
  align-self: end;
  display: flex;
  gap: 10px;
`;

export default ApplicationFilterItem;
