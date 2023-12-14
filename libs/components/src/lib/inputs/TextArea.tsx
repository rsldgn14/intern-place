import { css } from '@emotion/react';
import { useEffect } from 'react';

interface Props {
  label?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  id?: string;
  maxLength?: number;
}

export default function TextArea(props: Props) {
  //check max length
  useEffect(() => {
    if (
      props.maxLength &&
      props.value &&
      props.value.length > props.maxLength
    ) {
      props.onChange({
        target: {
          value: props.value.slice(0, props.maxLength),
        },
      } as React.ChangeEvent<HTMLTextAreaElement>);
    }
  }, [props, props.value]);

  return (
    <div className="form-group" css={inputContainerCss}>
      {props.label && (
        <label css={labelCss} htmlFor={props.id}>
          {props.label} {props.required && <span css={requiredCss}>*</span>}{' '}
        </label>
      )}

      <textarea
        css={textareaCss}
        className="form-control"
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        disabled={props.disabled}
        required={props.required}
        name={props.name}
        id={props.id}
        cols={50} // Sabit sütun sayısı
        rows={4} // Başlangıçta görünen satır sayısı
      />

      {props.maxLength && (
        <span css={maxLengthCss}>
          {props.value?.length}/{props.maxLength}
        </span>
      )}
    </div>
  );
}

const textareaCss = css`
  //modern textarea css
  display: block;
  width: 100%;
  resize: none;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: white;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 5px;
  border: 0.7px solid black;
  overflow-y: auto; // Dikey kaydırma çubuğu görüntüle
`;

// Geri kalan stiller aynı şekilde kullanılabilir.
const requiredCss = css`
  color: red;
`;

const inputContainerCss = css`
  display: flex;
  gap: 1rem;
  align-items: center;
  position: relative;
`;

const labelCss = css`
  display: flex;
  width: 150px;
  gap: 5px;
`;

const maxLengthCss = css`
  position: absolute;
  right: 7px;
`;
