import React from 'react';
import Modal from '../Modal';
import Image from 'next/image';
import Input from '../inputs/Input';
import { css } from '@emotion/react';
import Button from '../Button';

interface Props {
  show: boolean;
  onClose: () => void;
}

export default function LoginModal(props: Props) {
  return (
    <Modal
      onClose={props.onClose}
      show={props.show}
      style={modalCss}
      width="60%"
      height="85%"
    >
      <Image src="/logo.png" height={100} width={300} alt="logo" />
      <span css={stickCss}> </span>
      <div css={inputCss}>
        <span css={titleCss}>Giriş yap</span>
        <Input type="text" label="Kullanıcı Adı" onChange={() => {}} value="" />
        <Input type="password" label="Şifre" onChange={() => {}} value="" />
        <div css={buttonCss}>
          <Button title="Giriş Yap" variant="secondary" onClick={() => {}} />
        </div>
      </div>
    </Modal>
  );
}

const inputCss = css`
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 30px;
  height: 50%;
  width: 50%;
`;

const modalCss = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(rgba(254, 141, 198, 1), rgba(254, 209, 199, 1));
`;

const titleCss = css`
  font-size: 24px;
  font-weight: bold;
`;

const stickCss = css`
  height: 70%;
  border-left: 1px solid black;
`;

const buttonCss = css`
margin-left:50%;
`;
