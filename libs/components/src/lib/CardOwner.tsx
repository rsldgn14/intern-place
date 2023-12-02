import { css } from "@emotion/react";
import { Company, Notices } from "@intern-place/types";

interface Props {
    notice:Notices.Notice;
    index:number;
}


export default function CardOwner(props:Props) { 


    return <div css={cardOwnerContainerCss}>
        <div css={leftCss}> 
        <img css={cardOwnerImgCss} src={`https://picsum.photos/200/${props.index + 100}`} alt="user-info"/>
        <div css={cardOwnerInfoCss}> 
        <span css={cardOwnerTitle}>{props.notice.Company.Name}</span>
        <span>{props.notice.CreatedTime}</span>
        </div>
        </div>

    </div>


}


const cardOwnerContainerCss = css`
    display: flex;
    justify-content: space-between;
    padding: 10px;
    width: 100%;
    
`

const cardOwnerImgCss = css`
    height: 30px;
    width: 30px;
    border-radius: 50%;
    object-fit: cover;
`
const cardOwnerInfoCss = css`
    display: flex;
    flex-direction: column;
    gap: 5px;

`

const cardOwnerTitle = css`
    font-weight: bold;
    font-size: 14px;

`


const leftCss = css`
    display: flex;
    gap: 10px;
    font-size: 14px;


`