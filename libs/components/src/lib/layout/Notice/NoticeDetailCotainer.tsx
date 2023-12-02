import { css } from "@emotion/react";
import NoticeCompanyArea from "./NoticeCompanyArea";
import { Notices } from "@intern-place/types";
import NoticeInformationArea from "./NoticeInformationArea";

interface Props{
  notice:Notices.Notice | null;
}

export default function NoticeDetailContainer (props:Props) {
  return (
    
    <div css={containerCss}> 
        <div css={detailCss}>
          <NoticeCompanyArea company={props.notice?.Company}/>
          <NoticeInformationArea notice={props.notice} />
        </div>
    </div>
  );
}


const containerCss = css`
      display: flex;
      justify-content: center;
      background-color:#D3BED3;
`

const detailCss = css`
    min-height: 80vh;
    width: 70%;
    margin-top: 64px;
    background-color: white;
    border-radius: 10px 10px 0 0;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.6); 
    transition: box-shadow 0.3s ease-in-out; 

`