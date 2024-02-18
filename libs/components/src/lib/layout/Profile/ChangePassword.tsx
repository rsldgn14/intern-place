import { css } from '@emotion/react';
import Input from '../../inputs/Input';

export default function ChangePassword() {
  return (
    <div css={containerCss}>
      <Input type="password" onChange={() => {}} label="Eski Şifre" />
      <Input type="password" onChange={() => {}} label="Yeni Şifre" />
      <Input type="password" onChange={() => {}} label="Yeni Şifre Tekrar" />
    </div>
  );
}

const containerCss = css`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
