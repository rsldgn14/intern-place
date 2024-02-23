import { css } from '@emotion/react';
import { useState } from 'react';
import Modal from '../Modal';
import Button from '../Button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (imageBase64: string) => void;
}

export default function ImageInputModal(props: ModalProps) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageFile(file);
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageBase64 = reader.result as string;
        props.onSave(imageBase64.split(',')[1]);
        props.onClose();
      };

      reader.readAsDataURL(imageFile);
    }
  };

  return (
    <Modal show={props.isOpen} onClose={props.onClose}>
      <div css={containerCss}>
        <input
          css={inputCss}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />

        {imagePreview && (
          <div>
            <img
              src={imagePreview}
              alt="Preview"
              css={{ maxWidth: '200px', height: 'auto', marginBottom: '20px' }}
            />
          </div>
        )}

        <Button variant="secondary" title="Yükle" onClick={handleSave} />
      </div>
    </Modal>
  );
}

const inputCss = css`
  border-radius: 15px;
`;
const containerCss = css`
  display: flex;
  justify-content: center;
  gap: 25px;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  background: linear-gradient(
    rgba(254, 141, 198, 0.6),
    rgba(254, 209, 199, 0.6)
  );
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  transition: box-shadow 0.3s ease-in-out;

  input[type='file']::file-selector-button {
    margin-right: 20px;
    border: none;
    background: #084cdf;
    padding: 10px 20px;
    border-radius: 10px;
    color: #fff;
    cursor: pointer;
    transition: background 0.2s ease-in-out;
  }

  input[type='file']::file-selector-button:hover {
    background: #0d45a5;
    max-width: 200px;
    max-height: 200px;
  }
`;
