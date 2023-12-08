import { css } from '@emotion/react';
import { Applications } from '@intern-place/types';
import Image from 'next/image';

interface Props {
  applicationStatus: Applications.ApplicationStatus;
}

export default function StatusBar(props: Props) {
  switch (props.applicationStatus) {
    case Applications.ApplicationStatus.WAITING:
      return (
        <div css={barCss}>
          <Image src="/waiting.svg" height={20} width={20} alt="waiting" />{' '}
          Beklemede
        </div>
      );
    case Applications.ApplicationStatus.APPROVED:
      return (
        <div css={barCss}>
          <Image src="/check.svg" height={20} width={20} alt="waiting" />{' '}
          Kabul Edildi
        </div>
      );
    case Applications.ApplicationStatus.REJECTED:
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
