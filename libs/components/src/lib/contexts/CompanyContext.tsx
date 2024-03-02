import { Company } from '@intern-place/types';
import { createContext, useState } from 'react';

export interface CompanyContextProps {
  company: Company;
  setCompany: (company: Company) => void;
}

interface CompanyProviderProps {
  children: React.ReactNode;
}

export const CompanyContext = createContext<CompanyContextProps>({
  company: {} as Company,
  //function not implemented
  setCompany: () => {
    throw new Error('setStudent function not implemented');
  },
});

export function CompanyProvider(props: CompanyProviderProps) {
  const { children } = props;
  const [company, setCompany] = useState({} as Company);

  return (
    <CompanyContext.Provider value={{ company, setCompany }}>
      {children}
    </CompanyContext.Provider>
  );
}
