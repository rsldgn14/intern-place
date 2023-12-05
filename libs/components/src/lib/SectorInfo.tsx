import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

interface Props {
  title: string;
  color: string;
  directLink: string;
}

export default function SectorInfo(props: Props) {
  const router = useRouter();

  const onClick = useCallback(
    (path: string) => {
      router.push(path);
    },
    [router]
  );

  return (
    <div
      onClick={() => onClick(props.directLink)}
      css={sectorInfoCss(props.color)}
    >
      {' '}
      {props.title}{' '}
    </div>
  );
}

const sectorInfoCss = (color: string) => css`
  width: fit-content;
  padding: 5px 10px;
  border-radius: 10px;
  background-color: ${color};
  font-size: 14px;
  cursor: pointer;
`;
