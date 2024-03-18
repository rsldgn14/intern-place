import { Storages, companies } from '@intern-place/types';
import Input from '../../inputs/Input';
import TextArea from '../../inputs/TextArea';
import { css } from '@emotion/react';
import { useCallback, useContext, useState } from 'react';
import Button from '../../Button';
import { useRouter } from 'next/router';
import { AuthContext } from '../../contexts/AuthContext';
import { USER_STORAGE_KEY } from 'libs/services/src/lib/AuthService';

interface Props {
  company?: companies.Company;
}

export default function CompanyProfile(props: Props) {
  const [company, setCompany] = useState<
    Partial<companies.Company> | undefined
  >({
    ID: props.company?.ID,
    Name: props.company?.Name,
    Address: props.company?.Address,
    Description: props.company?.Description,
    Mail: props.company?.Mail,
    RoleID: props.company?.RoleID,
  });

  const router = useRouter();

  const companyCtx = useContext(AuthContext);

  console.log(companyCtx?.company);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const name = e.target.name;
      const value = e.target.value;

      setCompany((prev: Partial<companies.Company> | undefined) => ({
        ...prev,
        [name]: value,
      }));
    },
    []
  );

  const onSave = useCallback(() => {
    companies.update(company as companies.Company).then((res) => {
      if (!res?.error) {
        alert('Güncelleme başarılı');
        Storages.setItemToStorage(USER_STORAGE_KEY, JSON.stringify(company));
        companyCtx?.setCompany({
          ...companyCtx.company,
          Name: company?.Name || '',
          Address: company?.Address || '',
          Description: company?.Description || '',
          Mail: company?.Mail || '',
          RoleID: company?.RoleID || 0,
        });
        router.reload();
      } else {
        alert('Güncelleme başarısız');
      }
    });
  }, [router, company, companyCtx]);

  return (
    <div css={bodyCss}>
      <div css={containerCss}>
        <Input
          type="text"
          name="Name"
          value={company?.Name}
          onChange={onChange}
          label="Firma Adı"
        />
        <Input
          type="text"
          name="Mail"
          value={company?.Mail}
          onChange={onChange}
          label="Mail"
        />
        <TextArea
          name="Description"
          value={company?.Description}
          onChange={onChange}
          label="Firma Açıklaması"
        />
        <Input
          type="text"
          name="Address"
          value={company?.Address}
          onChange={onChange}
          label="Adres"
        />
      </div>
      <div css={buttonCss}>
        <Button title="Kaydet" onClick={onSave} />
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
