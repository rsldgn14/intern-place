import { css } from '@emotion/react';
import { useCallback, useState } from 'react';

export default function BirthDateInput() {
  const [value, setValue] = useState<string>('');

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value[2] !== '/') {
      const valueArray = value.split('');
      valueArray[2] = '/';
      const updatedValue = valueArray.join('');
      setValue(updatedValue);
    }

    setValue(value);
  }, []);

  return <input type="date" value={value} css={inputCss} onChange={onChange} />;
}

const inputCss = css`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  outline: none;
  transition: 0.3s;
  &:focus {
    border: 1px solid #000;
  }
`;
