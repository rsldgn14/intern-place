import { css } from '@emotion/react';
import { ApplicationFilterItemIconsItem } from 'libs/types/src/lib/applications';

export default function ApplicationInfoBar(
  props: ApplicationFilterItemIconsItem
) {
  return (
    <div css={boxCss}>
      <img src={props.Icon} alt={props.Icon} height={15} width={15} />
      <span>{props.Count || 0}</span>
    </div>
  );
}

const boxCss = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  span {
    font-weight: bold;
  }
`;
