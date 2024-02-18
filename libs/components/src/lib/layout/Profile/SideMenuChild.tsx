import { css } from '@emotion/react';
import { SideMenuItem } from './sideMenuItem';

interface Props {
  item: SideMenuItem;
  selectItem: (item: SideMenuItem) => void;
  isChild?: boolean;
}

export default function SideMenuChild(props: Props) {
  return (
    <div css={itemCss} onClick={() => props.selectItem(props.item)}>
      {props.item.icon && (
        <img
          src={props.item.icon}
          alt={props.item.title}
          height={20}
          width={20}
        />
      )}

      {props.item.title}
    </div>
  );
}

const itemCss = css`
  display: block;
  padding: 10px;
  cursor: pointer;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 10px;
  border-shadow: 0 1px 0 0 #e0e0e0;

  &:hover {
    background-color: #e0e0e0;
  }
`;
