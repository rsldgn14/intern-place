import { css } from '@emotion/react';
import { Auth, Sector, Sectors, Users } from '@intern-place/types';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback, useContext, useEffect, useState } from 'react';
import useClickOutside from '../hooks/useClickOutside';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import { AuthContext } from '../contexts/AuthContext';
import StudentHeader from './StudentHeader';
import CompanyHeader from './CompanyHeader';

export default function Header() {
  const [sectors, setSectors] = useState<Sector[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] =
    useState<boolean>(false);

  const authContext = useContext(AuthContext);

  console.log(authContext.user);

  const router = useRouter();

  const onCloseLoginModal = useCallback(() => {
    setIsLoginModalOpen(false);
  }, []);

  const onCloseRegisterModal = useCallback(() => {
    setIsRegisterModalOpen(false);
  }, []);

  const openLoginModal = useCallback(() => {
    setIsLoginModalOpen(true);
  }, []);

  const openRegisterModal = useCallback(() => {
    setIsRegisterModalOpen(true);
  }, []);

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
    <>
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
            Tüm İlanlar
          </div>
          {authContext.user?.RoleID === Users.Role.STUDENT && <StudentHeader />}
          {authContext.user?.RoleID === Users.Role.COMPANY && <CompanyHeader />}
        </div>
        {!authContext.user?.RoleID ? (
          <div css={menuCss}>
            <div onClick={openLoginModal}> Giriş Yap </div>
            <div onClick={openRegisterModal}> Kayıt Ol </div>
          </div>
        ) : (
          <div css={menuCss}>
            <div onClick={() => router.push('/profile')}>
              {authContext.user.FirstName + ' ' + authContext.user.LastName}
            </div>
            <div
              onClick={() => {
                Auth.logout().then(() => {
                  router.reload();
                });
              }}
            >
              Çıkış Yap
            </div>
          </div>
        )}
      </div>
      <LoginModal show={isLoginModalOpen} onClose={onCloseLoginModal} />
      <RegisterModal
        show={isRegisterModalOpen}
        onClose={onCloseRegisterModal}
      />
    </>
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
