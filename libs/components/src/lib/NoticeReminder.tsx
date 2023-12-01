import { css } from "@emotion/react"


export default function NoticeReminder() {

    return <div css={reminderCss}> <img src="/sand-clock.svg" alt="time" height={15} width={15}/> Son 10 gün </div>




}


const reminderCss = css`
width: fit-content;
padding: 5px 10px;
border-radius: 10px;
font-size: 14px;
display: flex;
justify-content: center;
align-items: center;
gap: 5px;
`