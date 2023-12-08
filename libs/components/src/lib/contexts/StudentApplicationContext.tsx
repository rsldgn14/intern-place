import { Applications, Students, Users } from '@intern-place/types';
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { AuthContext } from './AuthContext';

export const StudentApplicationContext =
  createContext<Applications.StudentApplicationContextProps>({
    applications: undefined,
  });

interface StudentApplicationProviderProps {
  children: ReactNode;
}

export function StudentApplicationProvider(
  props: StudentApplicationProviderProps
) {
  const { children } = props;
  const [applications, setApplications] = useState<
    Applications.Application[] | undefined
  >(undefined);
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  useEffect(() => {
    if (user && user.RoleID === Users.Role.STUDENT) {
      Students.studentApplications().then((res) => {
        setApplications(res);
      });
    }
    console.log("Çalıştı")
  }, [user]);

  return (
    <StudentApplicationContext.Provider
      value={{
        applications,
      }}
    >
      {children}
    </StudentApplicationContext.Provider>
  );
}
