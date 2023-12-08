import { css } from '@emotion/react';

const buttonStyles = css`
  display: inline-block;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 15px;
  cursor: pointer;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.4);
  transition: box-shadow 0.3s ease-in-out;
`;

const primaryStyles = (danger?: boolean) => css`
  background-color: ${danger ? '#FF6666' : '#d3bed3'};
  color: black;
`;

const secondaryStyles = (danger?: boolean) => css`
  background-color: #ffffff;
  color: ${danger ? '#FF6666' : 'black'}';
  border: 1px solid #d3bed3;
`;

interface Props {
  title?: string;
  size?: 'large' | 'small' | 'medium';
  variant?: 'primary' | 'secondary';
  danger?: boolean;
  onClick?: () => void;
}

export default function Button(props: Props) {
  const { title, size = 'medium', variant = 'primary', onClick } = props;

  return (
    <button
      css={[
        buttonStyles,
        variant === 'primary' && primaryStyles(props.danger),
        variant === 'secondary' && secondaryStyles(props.danger),
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
