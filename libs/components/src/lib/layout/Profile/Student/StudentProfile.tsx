import BirthDateInput from '../../../inputs/BirthDateInput';
import dynamic from 'next/dynamic';
import Input from '../../../inputs/Input';
import { useContext } from 'react';
import { StudentContext } from '../../../contexts/StudentContext';
import dayjs from 'dayjs';
import { css } from '@emotion/react';

const ReactQuill = dynamic(import('react-quill'), { ssr: false });

export default function StudentProfile() {
  const ctx = useContext(StudentContext);

  const student = ctx.student;

  return (
    <div>
      <div css={dateCss}>
        <span>Doğum Tarihi</span>
        <BirthDateInput
          date={dayjs(student?.BirthDate).format('DD/MM/YYYY')}
          onDateChange={(date) => console.log(date)}
        />
      </div>

      <div css={universityCss}>
        <Input onChange={() => {}} label="Üniversite" type="text" />
        <Input labelFit onChange={() => {}} label="Sınıf" type="number" />
      </div>
      <div css={descriptionCss}>Açıklama</div>
      <ReactQuill onChange={(value) => console.log(value)} />
    </div>
  );
}

const universityCss = css`
  display: flex;
  gap: 20px;
  margin: 20px 0;
`;

const descriptionCss = css`
  font-size: 20px;
  font-weight: 700;
  margin: 20px 0;
`;

const dateCss = css`
  font-size: 16px;
  font-weight: 500;
  display: flex;
  gap: 20px;
  align-items: center;
`;
