import { css } from '@emotion/react';
import  { useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (imageBase64: string) => void;
}

const modalStyle = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const modalContentStyle = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
`;

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSave: (imageBase64: string) => void;
  }
export default function ImageInputModal(props:Props){
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageFile(file);
        setImagePreview(reader.result as string);
        console.log(file)
      };
      reader.readAsDataURL(file);
     
    }
  };

  const handleSave = () => {
    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageBase64 = reader.result as string;
        props.onSave(imageBase64.split(",")[1]);
        props.onClose();
      };

      reader.readAsDataURL(imageFile);
    }
  };

  return (
    <div css={props.isOpen ? modalStyle : undefined}>
      {props.isOpen && (
        <div css={modalContentStyle}>
          <button onClick={props.onClose}>Close</button>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {imagePreview && (
            <div>
              <img src={imagePreview} alt="Preview" css={{ maxWidth: '100%', maxHeight: '200px' }} />
            </div>
          )}
          <button onClick={handleSave}>Save</button>
        </div>
      )}
    </div>
  );
};
