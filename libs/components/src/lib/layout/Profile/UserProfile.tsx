import { Storages, Users } from '@intern-place/types';
import Input from '../../inputs/Input';
import TextArea from '../../inputs/TextArea';
import { css } from '@emotion/react';
import { useCallback, useContext, useState } from 'react';
import Button from '../../Button';
import { useRouter } from 'next/router';
import { AuthContext } from '../../contexts/AuthContext';
import { USER_STORAGE_KEY } from 'libs/services/src/lib/AuthService';

interface Props {
  user?: Users.User;
}

export default function UserProfile(props: Props) {
  const [user, setUser] = useState<Partial<Users.User> | undefined>({
    ID: props.user?.ID,
    FirstName: props.user?.FirstName,
    LastName: props.user?.LastName,
    UserName: props.user?.UserName,
    Address: props.user?.Address,
    Description: props.user?.Description,
    RoleID: props.user?.RoleID,
  });

  const router = useRouter();

  const userCtx = useContext(AuthContext);

  console.log(userCtx?.user);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const name = e.target.name;
      const value = e.target.value;

      setUser((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const onSave = useCallback(() => {
    Users.update(user as Users.User).then((res) => {
      if (!res?.error) {
        alert('Güncelleme başarılı');
        Storages.setItemToStorage(USER_STORAGE_KEY, JSON.stringify(user));
        userCtx?.setUser({
          ...userCtx.user,
          FirstName: user?.FirstName || '',
          LastName: user?.LastName || '',
          Address: user?.Address || '',
          Description: user?.Description || '',
          UserName: user?.UserName || '',
          RoleID: user?.RoleID || 0,
        });
        router.reload();
      } else {
        alert('Güncelleme başarısız');
      }
    });
  }, [router, user, userCtx]);
  return (
    <div css={bodyCss}>
      <div css={containerCss}>
        <Input
          type="text"
          name="FirstName"
          onChange={onChange}
          label="İsim"
          value={user?.FirstName}
        />
        <Input
          type="text"
          name="LastName"
          onChange={onChange}
          label="Soyisim"
          value={user?.LastName}
        />
        <Input
          type="text"
          name="UserName"
          onChange={onChange}
          label="E-posta"
          value={user?.UserName}
        />
        <Input
          type="text"
          name="Address"
          onChange={onChange}
          label="Adres"
          value={user?.Address}
        />
        <TextArea
          onChange={onChange}
          name="Description"
          label="Açıklama"
          value={user?.Description}
        />
      </div>
      <div css={buttonCss}>
        <Button title="Kaydet " onClick={onSave} />
      </div>
    </div>
  );
}

const containerCss = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const bodyCss = css`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  border-radius: 10px;
  background-color: #f5f5f5;
  border: 1px solid #e0e0e0;
  width: 100%;
  margin: auto;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const buttonCss = css`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;
