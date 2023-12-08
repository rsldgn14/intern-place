import React from 'react';
import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const Container = styled.div`
  height: 50vh;
  max-height: 50vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  overflow: hidden;
`;

const fallingAnimation = (positionX: string, positionY: string) => keyframes`
  0% {
    transform: translateY(410px) translateX(${positionX}px);
  }
  }
  100% {
    transform: translateY(${positionY}px) translateX(${positionX}px);
  }
`;

const FallingImage = styled.img`
  width: 50px;
  height: 50px;
  transform: translateX(
    ${(props: { positionX: string; positionY: string }) =>
      props.positionX || '0'}px
  );
  animation: ${(props: { positionX: string; positionY: string }) =>
      fallingAnimation(props.positionX || '0', props.positionY || '0')}
    3s linear infinite reverse;
`;

const capeCss = css`
  display: flex;
  gap: 25px;
  width: 100%;
  height: 100%;
`;


const NotFoundPage: React.FC = () => {
  const capsPosition = [
    { x: Math.floor(Math.random() * 1300), y: Math.floor(Math.random() * 1300) },
    { x: Math.floor(Math.random() * 1400), y: Math.floor(Math.random() * 1300) },
    { x: Math.floor(Math.random() * 500), y: Math.floor(Math.random() * 1300) },
    { x: Math.floor(Math.random() * 600), y: Math.floor(Math.random() * 1300) },
    { x: Math.floor(Math.random() * 700), y: Math.floor(Math.random() * 1300) },
    { x: Math.floor(Math.random() * 800), y: Math.floor(Math.random() * 1300) },
    { x: Math.floor(Math.random() * 900), y: Math.floor(Math.random() * 1300) },
    { x: Math.floor(Math.random() * 200), y: Math.floor(Math.random() * 1300) },
    { x: Math.floor(Math.random() * 300), y: Math.floor(Math.random() * 1300) },
  ];

  return (
    <Container>
      <h1
        css={css`
          color: var(--title-color);
        `}
      >
        404 Not Found
      </h1>
      <div css={capeCss}>
        {capsPosition.map((pos, key) => (
          <FallingImage
            positionX={`${pos.x}`}
            positionY={`   ${pos.y}`}
            key={key}
            src="/cape.svg"
            alt="Falling Image"
          />
        ))}
      </div>

      <p
        css={css`
          color: var(--subtitle-color);
        `}
      >
        Oops! The page you are looking for might be in another castle.
      </p>
    </Container>
  );
};

export default NotFoundPage;
