import { css } from '@emotion/react'
import {NoticeCard} from '@intern-place/components'
import {MockData} from '@intern-place/types'

export default function CardComponentTest() {
return  <div css={noticeCardsCss}> 
        {MockData.mockNotice.map((notice) => 
        <NoticeCard 
        key={notice.ID} 
        ID={notice.ID}  
        Title={notice.Title} 
        Description={notice.Description} 
        Image={notice.Image} 
        Sector={notice.Sector}
        Company={notice.Company}
        CompanyImage={notice.CompanyImage}
        CreatedTime={notice.CreatedTime}
        EndTime={notice.EndTime}
        isEnding={notice.isEnding}
        />) }
</div>
   
 }

 const noticeCardsCss = css`
 display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 20px;
 `