import { css } from "@emotion/react";

interface Props {
    name:string;
    imgSrc:string;
    createdDate:string;
    endTime:string;
}


export default function CardOwner(props:Props) { 


    return <div css={cardOwnerContainerCss}>
        <div css={leftCss}> 
        <img css={cardOwnerImgCss} src={props.imgSrc} alt="user-info"/>
        <div css={cardOwnerInfoCss}> 
        <span css={cardOwnerTitle}>{props.name}</span>
        <span>{props.createdDate}</span>
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