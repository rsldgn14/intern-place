import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import Image from 'next/image';

interface Props {
  label?: string;
  type: string;
  value?: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  id?: string;
  maxLength?: number;
}

export default function Input(props: Props) {
  const [showPassWord, setShowPassWord] = useState<boolean>(false);

  //check max length
  useEffect(() => {
    if (
      props.maxLength &&
      typeof props.value === 'string' &&
      props.value &&
      props.value?.length > props.maxLength
    ) {
      props.onChange({
        target: {
          value: props.value?.slice(0, props.maxLength),
        },
      } as React.ChangeEvent<HTMLInputElement>);
    }
  }, [props, props.value]);

  return (
    <div className="form-group" css={inputContainerCss}>
      {props.label && (
        <label css={labelCss} htmlFor={props.id}>
          {props.label} {props.required && <span css={requiredCss}>*</span>}{' '}
        </label>
      )}

      <input
        css={inputCss}
        type={props.type === 'password' && showPassWord ? 'text' : props.type}
        className="form-control"
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        disabled={props.disabled}
        required={props.required}
        name={props.name}
        id={props.id}
      />
      {props.type === 'password' && (
        <Image
          src={showPassWord ? '/open-eye.svg' : '/closed-eye.svg'}
          height={20}
          width={20}
          alt="eye"
          css={showPasswordCss}
          onClick={() => setShowPassWord(!showPassWord)}
        />
      )}
      {props.maxLength && typeof props.value === 'string' && (
        <span css={maxLengthCss}>
          {props.value?.length}/{props.maxLength}
        </span>
      )}
    </div>
  );
}

const inputCss = css`
  //modern input css
  display: block;
  width: 100%;
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
`;

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

const showPasswordCss = css`
  position: absolute;
  right: 7px;
  cursor: pointer;
`;

const maxLengthCss = css`
  position: absolute;
  right: 7px;
`;
