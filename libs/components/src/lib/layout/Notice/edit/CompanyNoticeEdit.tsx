import { Notices, Sector } from '@intern-place/types';
import { ChangeEvent, useEffect, useState } from 'react';
import Input from '../../../inputs/Input';
import TextArea from '../../../inputs/TextArea';
import DatePickerComponent from '../../../inputs/DatePicker';
import SearchDropdown from '../../../inputs/SearchDropdown';
import Button from '../../../Button';
import dayjs from 'dayjs';
import { css } from '@emotion/react';
import { useRouter } from 'next/router';

interface Props {
  sectors?: Sector[];
  notice?: Notices.Notice;
}

export default function CompanyNoticeEdit(props: Props) {
  const [notice, setNotice] = useState<Partial<Notices.Notice> | undefined>({
    Title: props.notice?.Title,
    Description: props.notice?.Description,
    InternCount: props.notice?.InternCount,
    SectorID: props.notice?.SectorID,
    StartTime: props.notice?.StartTime,
    EndTime: props.notice?.EndTime,
  });

  const router = useRouter();

  return (
    <div css={containerCss}>
      <span css={titleCss}>İlan oluştur</span>
      <Input
        label="İlan Başlığı"
        type={'text'}
        maxLength={40}
        value={notice?.Title}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setNotice({ ...notice, Title: e.target.value });
        }}
      />
      <TextArea
        maxLength={2000}
        label="İlan Açıklaması"
        value={notice?.Description}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
          setNotice({ ...notice, Description: e.target.value });
        }}
      />
      <SearchDropdown
        title="Sektör Seç"
        label="Sektör"
        value={props.notice?.Sector?.Name}
        placeholder="Sektör ara"
        options={props.sectors?.map((sec) => {
          return { label: sec.Name, value: sec.ID };
        })}
        iconSrc="/sector.svg"
        onChange={(selected) =>
          setNotice({ ...notice, SectorID: selected.value as number })
        }
      />
      <div css={dateCSs}>
        <DatePickerComponent
          label="Başlangıç Zamanı"
          selectedDate={dayjs(notice?.StartTime).toDate()}
          onDateChange={(date: Date | null) => {
            setNotice({ ...notice, StartTime: date?.toISOString() });
          }}
        />
        <DatePickerComponent
          label="Bitiş Zamanı"
          selectedDate={dayjs(notice?.EndTime).toDate()}
          onDateChange={(date: Date | null) => {
            setNotice({ ...notice, EndTime: date?.toISOString() });
          }}
        />
      </div>
      <Input
        label="Kontenjan Sayısı"
        type={'number'}
        value={notice?.InternCount ?? 0}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setNotice({ ...notice, InternCount: parseInt(e.target.value) })
        }
      />
      <div>
        <Button
          title="Gönder"
          onClick={() => {
            Notices.update(
              props.notice?.ID ?? 0,
              notice as Notices.Notice
            ).then((res: any) => {
              if (!res?.error) {
                router.push('/company/notices');
              }
              console.log(res?.error);
            });
          }}
        />
      </div>
    </div>
  );
}

const containerCss = css`
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 50%;
  padding: 20px;
`;

const dateCSs = css`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const titleCss = css`
  font-size: 24px;
  font-weight: 700;
`;
