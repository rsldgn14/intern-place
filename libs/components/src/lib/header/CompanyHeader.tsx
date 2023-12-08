import { css } from '@emotion/react';
import router from 'next/router';

export default function CompanyHeader() {
  return (
    <>
      <div css={selectedCss} onClick={() => router.push('/company/notices')}>
        İlanlarım
      </div>
      <div
        css={selectedCss}
        onClick={() => router.push('/applications/company')}
      >
        Başvurular
      </div>
      <div
        css={selectedCss}
        onClick={() => router.push('/company/notices/create')}
      >
        İlan Ekle
      </div>
    </>
  );
}

const selectedCss = css`
  &:hover {
    border-bottom: 1.5px solid black;
  }
`;
