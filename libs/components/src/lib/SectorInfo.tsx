import { css } from "@emotion/react";

interface Props {
    title:string;
    color:string;

}



export default function SectorInfo(props:Props) {
    return <div css={sectorInfoCss(props.color)}> {props.title} </div>
}


const sectorInfoCss = (color:string) => css`
    border: 1px solid black;
    width: fit-content;
    padding: 5px 10px;
    border-radius: 10px;
    background-color: ${color};
    font-size: 14px;
`

