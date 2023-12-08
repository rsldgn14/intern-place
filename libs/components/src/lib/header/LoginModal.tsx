import Modal from '../Modal';
import Image from 'next/image';
import Input from '../inputs/Input';
import { css } from '@emotion/react';
import Button from '../Button';
import { useCallback, useContext, useState } from 'react';
import { AuthService } from '@intern-place/services';
import { Auth } from '@intern-place/types';
import { AuthContext } from '../contexts/AuthContext';
import { useKeyPress } from '../hooks/useKeyPress';

interface Props {
  show: boolean;
  onClose: () => void;
}

export default function LoginModal(props: Props) {
  const [loginData, setLoginData] = useState<Auth.LoginReq>({
    Username: '',
    Password: '',
  });

  const authContext = useContext(AuthContext);

  const onUsernameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setLoginData({ ...loginData, Username: e.target.value });
    },
    [loginData]
  );

  const onPasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setLoginData({ ...loginData, Password: e.target.value });
    },
    [loginData]
  );

  const onLogin = useCallback(() => {
    AuthService.login(loginData, authContext)
      .then(() => {
        props.onClose();
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [authContext, loginData, props]);

  useKeyPress('Enter', onLogin);

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
        <Input
          type="text"
          label="Kullanıcı Adı"
          onChange={onUsernameChange}
          value={loginData.Username}
        />
        <Input
          type="password"
          label="Şifre"
          onChange={onPasswordChange}
          value={loginData.Password}
        />
        <div css={buttonCss}>
          <Button title="Giriş Yap" variant="secondary" onClick={onLogin} />
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
  margin-left: 50%;
`;
