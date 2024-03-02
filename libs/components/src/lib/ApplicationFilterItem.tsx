import React from 'react';
import { css } from '@emotion/react';

interface Props {
  title: string;
  onClick?: () => void;
}

const ApplicationFilterItem: React.FC<Props> = ({ title, onClick }) => {
  return (
    <div css={itemCss} onClick={onClick}>
      {title}
    </div>
  );
};

const itemCss = css`
  cursor: pointer;
  padding: 10px 0;
  &:hover {
    background-color: #f0f0f0;
  }
`;

export default ApplicationFilterItem;
