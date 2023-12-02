import { css } from '@emotion/react';

const buttonStyles = css`
  display: inline-block;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 20px;
  cursor: pointer;
`;

const primaryStyles = css`
  background-color: #d3bed3;
  color: black;
`;

const secondaryStyles = css`
  background-color: #ffffff;
  color: #d3bed3;
  border: 1px solid #d3bed3;
`;

interface Props {
  title?: string;
  size?: 'large' | 'small' | 'medium';
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}

export default function Button(props: Props) {
  const { title, size = 'medium', variant = 'primary', onClick } = props;

  return (
    <button
      css={[
        buttonStyles,
        variant === 'primary' && primaryStyles,
        variant === 'secondary' && secondaryStyles,
        size === 'large' &&
          css`
            font-size: 20px;
          `,
        size === 'medium' &&
          css`
            font-size: 18px;
          `,
        size === 'small' &&
          css`
            font-size: 14px;
          `,
      ]}
      onClick={onClick}
    >
      {title}
    </button>
  );
}
