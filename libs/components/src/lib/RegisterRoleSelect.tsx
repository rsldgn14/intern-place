import { css } from '@emotion/react';
import { Users } from '@intern-place/types';

import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';

interface Props {
  setSelectedRole?: Dispatch<SetStateAction<Users.Role>>;
}

export default function RegisterRoleSelect(props: Props) {
  const [selectedRole, setSelectedRole] = useState<Users.Role>(
    Users.Role.STUDENT
  );

  const onSelected = useCallback((role: Users.Role) => {
    setSelectedRole(role);
  }, []);

  useEffect(() => {
    props.setSelectedRole?.(selectedRole);
  }, [props, selectedRole]);

  return (
    <div css={containerCss}>
      <span
        onClick={() => onSelected(Users.Role.STUDENT)}
        css={selectedRole === Users.Role.STUDENT && selectedCss}
      >
        Öğrenci
      </span>
      <span css={stickCss}></span>
      <span
        onClick={() => onSelected(Users.Role.COMPANY)}
        css={selectedRole === Users.Role.COMPANY && selectedCss}
      >
        Şirket
      </span>
    </div>
  );
}

const containerCss = css`
  border: 1px solid black;
  background-color: #b19cad;
  border-radius: 10px;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
`;

const stickCss = css`
  height: 100%;
  border-left: 1px solid black;
  margin: 0 10px;
`;

const selectedCss = css`
  background-color: #5f5f5f;
  border-radius: 5px;
  padding: 5px;
  color: white;
`;
