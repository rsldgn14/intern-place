import { MockData, Notices } from "@intern-place/types"
import { GetServerSideProps } from "next"
import { parse } from "path"

interface Props {
    notice: any


}


export default function Index(props:Props) {

return (<div> 
    <div>Notice {props.notice?.ID}</div> 
    <div>{props.notice?.Title}</div>
    <div>{props.notice?.Description}</div>
    
</div>)



 }



 export const getServerSideProps: GetServerSideProps = async (context) => {
    const id = context.params?.id

    const notice = MockData.mockNotice.find((notice) => notice.ID  === parseInt(id as string))

    console.log(notice)
  
    return {
      props: {
        notice:notice || null,
      },
    }
  }