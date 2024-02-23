import Modal from '../Modal';
import Image from 'next/image';
import Input from '../inputs/Input';
import { css } from '@emotion/react';
import Button from '../Button';
import RegisterRoleSelect from '../RegisterRoleSelect';
import { Auth, Users, Utils } from '@intern-place/types';
import { useCallback, useState } from 'react';
import { sha256 } from 'js-sha256';

interface Props {
  show: boolean;
  onClose: () => void;
}

export default function RegisterModal(props: Props) {
  const [selectedRole, setSelectedRole] = useState<Users.Role>(
    Users.Role.STUDENT
  );

  const [registerRequest, setRegisterRequest] = useState<Auth.RegisterReq>({
    FirstName: '',
    LastName: '',
    Username: '',
    Password: '',
    Role: Users.Role.STUDENT,
  });

  const [rePassword, setRePassword] = useState('' as string);

  const checkRePassword = useCallback(() => {
    if (rePassword.length > 0)
      return Utils.checkPasswords(registerRequest.Password, rePassword);
  }, [registerRequest.Password, rePassword]);

  const onSubmitted = useCallback(() => {
    if (checkRePassword()) {
      Auth.register({
        ...registerRequest,
        Password: registerRequest.Password
          ? sha256(registerRequest.Password)
          : '',
        Role: selectedRole,
      }).then((res) => {
        if (!res?.error) {
          alert('Kayıt başarılı');
          props.onClose();
          setRegisterRequest({
            FirstName: '',
            LastName: '',
            Username: '',
            Password: '',
            Role: Users.Role.STUDENT,
          });
          setRePassword('');
        } else {
          alert(res.error.message);
        }
      });
    } else {
      alert('Şifreler uyuşmuyor');
    }
  }, [checkRePassword, props, registerRequest, selectedRole]);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterRequest((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  }, []);

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
        <span css={titleCss}>
          <span> Kayıt Ol</span> <RegisterRoleSelect setSelectedRole={setSelectedRole} />
        </span>
        <Input
          type="text"
          label="Ad"
          name="FirstName"
          onChange={onChange}
          value={registerRequest.FirstName}
        />
        <Input
          type="text"
          label="Soyad"
          name="LastName"
          onChange={onChange}
          value={registerRequest.LastName}
        />
        <Input
          type="email"
          label="E-mail"
          name="Username"
          onChange={onChange}
          value={registerRequest.Username}
        />
        <Input
          type="password"
          label="Şifre"
          name="Password"
          onChange={onChange}
          value={registerRequest.Password}
        />
        <Input
          type="password"
          label="Şifre Tekrar"
          onChange={(e) => {
            setRePassword(e.target.value);
          }}
          value={rePassword}
        />
        <div css={buttonCss}>
          <Button title="Kayıt ol" variant="secondary" onClick={onSubmitted} />
        </div>
      </div>
    </Modal>
  );
}

const inputCss = css`
  display: flex;
  flex-direction: column;
  justify-content: start;
  gap: 10px;
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
  width: 100%;
  display: flex;
  justify-content:space-between;
  gap: 50px;
  align-items: center;
`;

const stickCss = css`
  height: 70%;
  border-left: 1px solid black;
`;

const buttonCss = css`
  margin-left: 50%;
`;
