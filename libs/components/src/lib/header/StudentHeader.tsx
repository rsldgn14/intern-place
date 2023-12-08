import { css } from '@emotion/react';
import router from 'next/router';

export default function StudentHeader() {
  return (
    <div css={selectedCss} onClick={() => router.push('/applications/student')}>
      Başvurularım
    </div>
  );
}

const selectedCss = css`
  &:hover {
    border-bottom: 1.5px solid black;
  }
`;
