import { css } from '@emotion/react';
import { Applications, Notices } from '@intern-place/types';
import Image from 'next/image';

interface Props {
  noticeStatus: Notices.Status;
}

export default function CompanyNoticeStatus(props: Props) {
  switch (props.noticeStatus) {
    case Notices.Status.Draft:
      return (
        <div css={barCss}>
          <Image src="/waiting.svg" height={20} width={20} alt="waiting" />{' '}
          Beklemede
        </div>
      );
    case Notices.Status.Aprroved:
      return (
        <div css={barCss}>
          <Image src="/check.svg" height={20} width={20} alt="waiting" /> Kabul
          Edildi
        </div>
      );
    case Notices.Status.Rejected:
      return (
        <div css={barCss}>
          <Image src="/cancel.svg" height={20} width={20} alt="waiting" />{' '}
          Reddedildi
        </div>
      );
    default:
      return (
        <div css={barCss}>
          <Image src="/waiting.svg" height={20} width={20} alt="waiting" />{' '}
          Statü Bulunamadı
        </div>
      );
  }
}

const barCss = css`
  display: flex;
  gap: 5px;
  align-items: center;
`;
