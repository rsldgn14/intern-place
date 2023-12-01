import { css } from "@emotion/react"
import SectorInfo from "./SectorInfo";
import CardOwner from "./CardOwner";
import NoticeReminder from "./NoticeReminder";

interface Props {
    ID:number;
    Title:string;
    Description:string;
    Image:string;
    Company:string;
    Sector:{title:string,color:string};
    CompanyImage:string;
    CreatedTime:string;
    EndTime:string;
    isEnding?:boolean

}

export default function NoticeCard(props:Props) { 
    return <div css={noticeCardContainer}>
            <img css={imgCss} src={props.Image} alt="" />
            <div css={noticeCardContentCss}> 
            <div css={middleCss}> 
            <SectorInfo title={props.Sector.title} color={props.Sector.color}/>
            {props.isEnding && <NoticeReminder/>}
            </div>
            
            <span css={sectorTitleCss}>{props.Title}</span>
            <span css={descriptionCss}>{props.Description}</span>
            </div>
            <CardOwner name={props.Company} imgSrc={props.CompanyImage} createdDate={props.CreatedTime} endTime={props.EndTime}/>

        </div>



}

const noticeCardContainer = css`
    border: 1px solid black;
    width: 250px;
    height:420px;
    border-radius: 10px;
    background : linear-gradient(rgba(254,141,198,0.6),rgba(254,209,199,0.6));

`

const imgCss = css`
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 10px 10px 0 0;
`

const noticeCardContentCss = css`
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin:10px 0;
    
`

const sectorTitleCss = css`
    font-size: 18px;
    font-weight: bold;
`

const descriptionCss = css`
    font-size: 14px;
    font-weight: 400;
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    height: 60px;
`

const middleCss = css`
    display: flex;
    justify-content: space-between;

`