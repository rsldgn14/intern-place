import { css } from '@emotion/react';

interface Props {
  items: Array<{title:string,value:string | number}>;
}

export default function InfoBox(props: Props) {
  return (
    <div css={itemContainerCss}>
      {props.items.map((item) => (
        <div> {item.title} : {item.value} </div>
      ))}
    </div>
  );
}

const itemContainerCss = css`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 24px;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.3s ease-in-out;
`;
