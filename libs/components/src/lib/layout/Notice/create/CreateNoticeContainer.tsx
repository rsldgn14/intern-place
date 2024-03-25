import { Images, Notices, Sector } from '@intern-place/types';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import Input from '../../../inputs/Input';
import TextArea from '../../../inputs/TextArea';
import DatePickerComponent from '../../../inputs/DatePicker';
import SearchDropdown from '../../../inputs/SearchDropdown';
import Button from '../../../Button';
import dayjs from 'dayjs';
import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import { error } from 'console';
import ImageInputModal from '../../../inputs/ImageInputModal';

interface Props {
  sectors: Sector[];
}

export default function CreateNoticeContainer(props: Props) {
  const [notice, setNotice] = useState<Partial<Notices.Notice> | undefined>({
    Title: '',
    Description: '',
    InternCount: 0,
    SectorID: 0,
    StartTime: undefined,
    EndTime: undefined,
  });
  const [imageModal, setImageModal] = useState<boolean>(false);
  const [image, setImage] = useState<Partial<Images.Image>>({});
  const [preview, setPreview] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    console.log(notice);
  }, [notice]);

  const onUploadImage = useCallback((imageBase64: string) => {
    setImage({
      EntityID: Images.EntityType.Notice,
      Content: imageBase64,
    });
  }, []);

  const onSend = useCallback(() => {
    Notices.create(notice as Notices.Notice).then((res: any) => {
      if (res.error) {
        console.log(res.error);
      } else {
        Images.create({
          EntityID: image.EntityID,
          Content: image.Content,
          OwnerID: res.ID,
        }).then((res) => {
          if (res.error) {
            throw new Error('Image not uploaded');
          }
        });
        console.log(res);
        router.push('/company/notices');
      }
    });
  }, [image.Content, image.EntityID, notice, router]);

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
      Fotoğraf:
      <div css={imageUploadCss}>
        {preview && <img src={preview} height={300} width={500} alt="image" />}
        <Button onClick={() => setImageModal(true)} title="Fotoğraf yükle" />
      </div>
      <ImageInputModal
        isOpen={imageModal}
        onClose={() => setImageModal(false)}
        onSave={onUploadImage}
        getImagePreview={(preview) => setPreview(preview)}
      />
      <SearchDropdown
        title="Sektör Seç"
        label="Sektör"
        placeholder="Sektör ara"
        options={props.sectors.map((sec) => {
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
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setNotice({ ...notice, InternCount: parseInt(e.target.value) })
        }
      />
      <div>
        <Button title="Gönder" onClick={onSend} />
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

const imageUploadCss = css`
  display: flex;
  flex-direction: column;
  gap: 25px;
  align-items: center;,

`;
