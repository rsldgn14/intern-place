import { Students } from '@intern-place/types';
import { createContext, useState } from 'react';

export interface StudentContextProps {
  student: Students.Student;
  setStudent: (student: Students.Student) => void;
}

interface StudentProviderProps {
  children: React.ReactNode;
}

export const StudentContext = createContext<StudentContextProps>({
  student: {} as Students.Student,
  //function not implemented
  setStudent: () => {
    throw new Error('setStudent function not implemented');
  },
});

export function StudentProvider(props: StudentProviderProps) {
  const { children } = props;
  const [student, setStudent] = useState({} as Students.Student);

  return (
    <StudentContext.Provider value={{ student, setStudent }}>
      {children}
    </StudentContext.Provider>
  );
}
