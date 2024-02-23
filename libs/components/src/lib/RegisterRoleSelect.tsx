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
      <div
        onClick={() => onSelected(Users.Role.STUDENT)}
        css={selectCss(true,selectedRole === Users.Role.STUDENT )}
      >
        Öğrenci Hesabı 
      </div>

      <div
        onClick={() => onSelected(Users.Role.COMPANY)}
        css={ selectCss(false,selectedRole === Users.Role.COMPANY )}
      >
        Şirket Hesabı 
      </div>
    </div>
  );
}



const selectCss= (first:boolean,selected:boolean) => css`
  background-color: ${selected ? "#5f5f5f" : "#b19cad"};
  border-radius: 5px;
  padding: 5px;
  color: white;
  border-radius: ${first ?"10px 0 0 10px" : "0 10px 10px 0"};
  width:150px;
  ${first && "border-right:2px solid black" };
  flex:1;
  text-align:center;
  transition: all 1s ease-out;
  font-size:16px;
  cursor:pointer;
`;

const containerCss = css`
 display:flex;
 gap:0;

`;
