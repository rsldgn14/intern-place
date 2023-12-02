import { css } from "@emotion/react";
import { Notices, Utils } from "@intern-place/types";

interface Props {
    notice: Notices.Notice | null;
    
}


export default function NoticeInformationArea(props: Props) {
  return (
    <div css={containerCss}>
      <div css={informationCss}>
        <span>{props.notice?.Title} </span>
        <span dangerouslySetInnerHTML={{__html:props.notice?.Description}}/>
      </div>
      <div css={datesCss}>
        <div css={timesCss}> 
            <span css={textCss}>Created Time : {Utils.renderDateTime(props.notice?.CreatedAt ?? "")}</span>
            <span  css={textCss}>Updated Time : {Utils.renderDateTime(props.notice?.UpdatedAt  ?? "")}</span>

        </div>
        <div css={timesCss}>
             <span  css={textCss}>Start Time : {Utils.renderDateTime(props.notice?.StartTime  ?? "")}</span>
            <span  css={textCss}>End Time    : {Utils.renderDateTime(props.notice?.EndTime  ?? "")}</span>
        </div>
        <div>
                    <button>Apply</button>

        </div>
      </div>
    </div>
  );
}


const containerCss = css`
display: flex;
flex-direction: column;
gap: 64px;
`

const informationCss = css`
display: flex;
flex-direction: column;
gap: 32px;
padding: 32px 160px 0 160px;
`


const datesCss = css`
display: flex;
flex-direction: column;
gap: 32px;
align-items: center;
padding: 16px;
`

const timesCss = css`
font-size: 14px;
display: flex;
width: 100%;
gap: 32px;

`

const textCss = css`
    width: 230px;

`