import { SerializedStyles, css } from '@emotion/react';
import useClickOutside from './hooks/useClickOutside';

interface Props {
  width?: string;
  height?: string;
  children?: React.ReactNode;
  style?: SerializedStyles;
  show: boolean;
  onClose: () => void;
}

export default function Modal(props: Props) {
  const externalCss = props.style;

  const ref = useClickOutside(props.onClose);

  if (!props.show) {
    return null;
  }

  return (
    <div css={modalCss}>
      <div
        ref={ref}
        css={[modalContentCss(props.width, props.height), externalCss]}
      >
        {props.children}
      </div>
    </div>
  );
}

const modalCss = css`
  position: fixed;
  z-index: 1;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background: rgba(0, 0, 0, 0.7);
`;

const modalContentCss = (width?: string, height?: string) => css`
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: ${width ?? '50%'};
  height: ${height ?? '50%'};
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.6);
  transition: box-shadow 0.3s ease-in-out;
`;
