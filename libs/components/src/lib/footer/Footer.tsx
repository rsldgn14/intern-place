import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import React, { useState } from 'react';
import { css } from '@emotion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInstagram,
  faTwitter,
  faGithub,
  faFacebook,
} from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';
import Button from '../Button';
import useClickOutside from '../hooks/useClickOutside';

config.autoAddCss = false;

const Footer = () => {
  const [showMap, setShowMap] = useState(false);

  const handleAddressClick = () => {
    setShowMap(!showMap);
  };

  const googleMapsEmbedCode = `
    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2145.724498995477!2d27.855835470084685!3d37.856218618760344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b92b0a90c5dc75%3A0xebc883adddc6800f!2sAdnan%20Menderes%20%C3%9Cniversitesi%20M%C3%BChendislik%20Fak%C3%BCltesi!5e0!3m2!1str!2str!4v1701991383113!5m2!1str!2str" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
  `;

  const clickOutside = useClickOutside(() => {
    setShowMap(false);
  });

  return (
    <>
      <footer css={footerStyle}>
        {/* <div css={contactInfoStyle}>
          <p>Bize Ulaşın</p>
          <div>
            <div css={contactFormStyle}>
              <label>
                E-posta:
                <input type="email" />
              </label>
              <label>
                Mesaj:
                <textarea
                  style={{ resize: 'none' }}
                  rows={4}
                  maxLength={2000}
                ></textarea>
              </label>
              <Button variant="secondary" title="Gönder" />
            </div>
          </div>
        </div> */}
        <div css={additionalLinksStyle}>
          <Link href="#">İletişim</Link>
          <Link href="#">Hakkımızda</Link>
          <span
            ref={clickOutside}
            css={addressCss}
            onClick={handleAddressClick}
          >
            Adres
          </span>
          <Link href="#">Yardım</Link>
          <div css={mapContainerStyle}>
            {showMap && (
              <div dangerouslySetInnerHTML={{ __html: googleMapsEmbedCode }} />
            )}
          </div>
        </div>
        <div css={socialIconsStyle}>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faInstagram} css={contactInfoStyle} />
          </a>
          <a
            href="https://www.twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faTwitter} css={contactInfoStyle} />
          </a>
          <a
            href="https://www.github.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faGithub} css={contactInfoStyle} />
          </a>
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faFacebook} css={contactInfoStyle} />
          </a>
        </div>
      </footer>
      <div css={copyrightStyle}>
        <p>© 2023 Copyright : InterNexa.com</p>
      </div>
    </>
  );
};

export default Footer;

const addressCss = css`
  cursor: pointer;
  color: white;
  font-size: 20px;
  &:hover {
    text-decoration: underline;
  }
`;

const footerStyle = css`
  padding: 40px 80px;
  width: 100%;
  height: 200px;
  background-color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const socialIconsStyle = css`
  display: flex;
  gap: 10px;
  flex-direction: row;
  margin-bottom: 160px;
`;

const contactInfoStyle = css`
  font-size: 20px;
  color: white;
  display: flex;
  flex-direction: column;
`;

const contactFormStyle = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 400px;
  label {
    display: flex;
    flex-direction: row;
    gap: 10px;
  }
  input {
    border-radius: 5px;
  }
  textarea {
    border-radius: 5px;
    margin-left: 12px;
  }
  button {
    margin-left: 110px;
    border-radius: 5px;
    height: 40px;
    width: 100px;
  }
`;

const additionalLinksStyle = css`
  display: flex;
  gap: 20px;
  align-items: center;
  a {
    text-decoration: none;
    color: white;
    font-size: 20px;
    &:hover {
      text-decoration: underline;
    }
  }
`;
const mapContainerStyle = css`
  position: absolute;
  left: 600px;
  top: 250px;
`;
const copyrightStyle = css`
  width: 100%;
  height: 40px;
  justify-content: top;
  text-align: center;
  font-size: 15px;
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  p {
    margin: 0;
  }
`;
