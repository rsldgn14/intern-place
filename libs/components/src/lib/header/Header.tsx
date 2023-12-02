import { css } from '@emotion/react';

export default function Header() {
  return <div css={headercss}>Header</div>;
}

const headercss = css`
  height: 50px;
  width: 100%;
  border: 1px solid black;
`;
