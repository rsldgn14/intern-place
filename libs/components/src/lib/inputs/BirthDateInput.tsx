import React, { useState } from 'react';
import moment from 'moment';
import InputMask from 'react-input-mask';
import { css } from '@emotion/react';

interface Props {
  date?: string;
  onDateChange: (date: string) => void;
}

const MyDateInput = (props: Props) => {
  const [date, setDate] = useState(props.date || '');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const enteredDate = event.target.value;

    setDate(enteredDate);
    const formattedDate = moment(enteredDate, 'DD/MM/YYYY').format(
      'YYYY-MM-DD HH:mm:ss.SSS'
    );
    props.onDateChange(formattedDate);
  };

  return (
    <InputMask
      css={inputCss}
      mask="99/99/9999"
      placeholder="GG/AA/YYYY"
      value={date}
      onChange={handleChange}
    />
  );
};

const inputCss = css`
  padding: 10px;
  font-size: 16px;
  margin: 20px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  max-width: 110px;
`;

export default MyDateInput;
