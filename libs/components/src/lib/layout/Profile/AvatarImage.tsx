import { css } from '@emotion/react';
import ImageInputModal from '../../inputs/ImageInputModal';
import { useCallback, useState } from 'react';
import { Images, Users } from '@intern-place/types';
import useImageLoader from '../../hooks/useImageLoader';

interface Props {
  user?: Users.User;
}

export default function AvatarImage(props: Props) {
  const [open, setOpen] = useState<boolean>(false);

  const onUpload = useCallback((imageBase64: string) => {
    Images.create({
      EntityID: Images.EntityType.Avatar,
      Content: imageBase64,
      OwnerID: props.user?.ID ?? 0,
    });
  }, []);

  const image = useImageLoader(
    `localhost:3000/api/public/images/content/${Images.EntityType.Avatar}/${
      props.user?.ID ?? 0
    }`,
    'https://www.w3schools.com/howto/img_avatar.png'
  );

  return (
    <div css={containerCss}>
      <img css={plusCss} src="/plus.svg" alt="plus" height={30} width={30} />
      <img
        src={`http://localhost:3000/api/public/images/content/${
          Images.EntityType.Avatar
        }/${props.user?.ID ?? 0}`}
        alt="Avatar"
        css={imageCss}
        onClick={() => setOpen(true)}
      />
      <ImageInputModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onSave={onUpload}
      />
    </div>
  );
}

const containerCss = css`
  display: flex;
  justify-content: center;
  position: relative;
  align-items: center;
  gap: 20px;
`;

const imageCss = css`
  border-radius: 50%;
  width: 100px;
  height: 100px;
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
`;

const plusCss = css`
  position: absolute;
  transform: translate(0%, 0%);
`;
