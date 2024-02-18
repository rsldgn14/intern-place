import { css } from '@emotion/react';

export default function AvatarImage() {
  return (
    <div css={containerCss}>
      <img css={plusCss} src="/plus.svg" alt="plus" height={30} width={30} />
      <img
        src="https://www.w3schools.com/howto/img_avatar.png"
        alt="Avatar"
        css={imageCss}
      />
    </div>
  );
}

const containerCss = css`
  display: flex;
  justify-content: center;
  position: relative;
  align-items: center;
  gap: 20px;
`;

const imageCss = css`
  border-radius: 50%;
  width: 100px;
  height: 100px;
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
`;

const plusCss = css`
  position: absolute;
  transform: translate(0%, 0%);
`;
