import { css } from '@emotion/react';
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DatePickerProps {
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
  label?: string;
}

const DatePickerComponent: React.FC<DatePickerProps> = ({
  selectedDate,
  onDateChange,
  label,
}) => {
  return (
    <div css={containerCss}>
      <span css={labelCss}>{label}</span>
      <DatePicker
        placeholderText="Tarih Seçiniz"
        css={datePickerCss}
        showTimeInput
        selected={selectedDate}
        onChange={(date: Date | null) => onDateChange(date)}
        dateFormat="yyyy-MM-dd"
        timeInputLabel="Tarih Seçiniz"
        onKeyDown={(e) => {
          e.preventDefault();
        }}
      />
    </div>
  );
};

export default DatePickerComponent;

const datePickerCss = css`
  border: 1px solid #ced4da;
  padding: 10px 0;
  font-size: 1rem;
  text-align: center;
  width: 150px;
  border-radius: 5px;
`;

const containerCss = css`
  display: flex;
  gap: 25px;
  align-items: center;
`;

const labelCss = css`
  font-weight: bold;
  width: fit-content;
`;
