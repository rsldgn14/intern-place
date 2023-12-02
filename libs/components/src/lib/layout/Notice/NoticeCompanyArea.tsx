import { css } from "@emotion/react"
import { Company } from '@intern-place/types';

interface Props {
    company?:Company
}

export default function NoticeCompanyArea (props:Props) {

    console.log(props.company)
    return(
        <div css={companyContainerCss}>
            <div><img css={companyPhotoCss}  src="https://picsum.photos/id/237/200/300" alt="foto" /></div>
            <div css={infoCcss}>
                <div css={titleCss}>
                    {props.company?.Name}
                </div>
                <div css={sectorContainerCss} >
                    {props.company?.Sector?.map((sector) => {
                        return <span key={sector.ID}><img src="/sector.svg" height={15} width={15} alt="arrow"/> <span> {sector.Name} </span> </span>
                    }
                    )}
                </div>
            </div>
        </div>


    )


}

const companyContainerCss = css`
    display: flex;
    padding:49px 0 21px 35px;
    border-bottom: 1px solid black;
    gap: 32px;
   
    
`

const infoCcss = css`
    display: flex;
    flex-direction: column;
    gap: 16px;
`


const titleCss = css`
    font-size: 28px;
    font-weight: 700;
`

const sectorContainerCss = css`
display: flex;
flex-direction: column;
gap: 8px;
`
const companyPhotoCss = css`
    border-radius: 5px;
    object-fit: contain;

`