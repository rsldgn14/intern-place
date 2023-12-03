import { css } from '@emotion/react';
import { Sector, Sectors } from '@intern-place/types';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import useClickOutside from '../hooks/useClickOutside';

export default function Header() {
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const router = useRouter();

  const onClickSectorMenu = useCallback(() => {
    setIsDropdownOpen((prev) => !prev);
  }, []);

  const onClickOutside = useCallback(() => {
    setIsDropdownOpen(false);
  }, []);

  const ref = useClickOutside(onClickOutside);

  useEffect(() => {
    Sectors.publicGetAllSectors().then((res) => {
      setSectors(res);
    });
  }, []);

  return (
    <div css={headercss}>
      <Image
        css={imageCss}
        onClick={() => router.push('/')}
        src="/logo.png"
        alt="logo"
        width={120}
        height={40}
      />
      <div css={menuCss}>
        <div css={selectedCss} onClick={() => router.push('/')}>
          {' '}
          Anasayfa
        </div>
        <div ref={ref} css={[dropdownParent]}>
          <span
            css={[selectedCss, dropdownArrowCss]}
            onClick={onClickSectorMenu}
          >
            <Image
              src={!isDropdownOpen ? '/down-arrow.svg' : '/up-arrow.svg'}
              height={20}
              width={15}
              alt="vector"
            />
            Sektörler
          </span>
          {isDropdownOpen && (
            <div css={dropdownCss}>
              {sectors.map((sector) => {
                return (
                  <div
                    key={sector.ID}
                    css={sectorCss}
                    onClick={() => {
                      router.push(`/sectors/${sector.ID}`);
                      setIsDropdownOpen(false);
                    }}
                  >
                    {sector.Name}
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div css={selectedCss} onClick={() => router.push('/notice')}>
          {' '}
          Tüm İlanlar{' '}
        </div>
      </div>
      <div css={menuCss}>
        <div> Giriş Yap </div>
        <div> Kayıt Ol </div>
      </div>
    </div>
  );
}

const headercss = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 24px;
`;

const imageCss = css`
  cursor: pointer;
`;

const menuCss = css`
  display: flex;
  gap: 24px;
  div {
    cursor: pointer;
  }
`;

const selectedCss = css`
  &:hover {
    border-bottom: 1.5px solid black;
  }
`;

const dropdownParent = css`
  position: relative;
`;

const dropdownCss = css`
  position: absolute;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  width: 600px;
  padding: 24px;
  gap: 10px;
  transition: all 0.3s ease-in-out;
  transform: translateX(-45%);
  top: 50px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.6);
  transition: box-shadow 0.3s ease-in-out;
  cursor: default !important;
`;

const dropdownArrowCss = css`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const sectorCss = css`
  cursor: pointer;
  &:hover {
    border-bottom: 1px solid black;
  }
  height: 30px;
  width: fit-content;
`;
