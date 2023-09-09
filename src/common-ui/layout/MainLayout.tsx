import { ReactNode, useState } from 'react';
import { keyframes, styled } from '@/stitches.config.ts';
import { CloseOutlined, MenuOutlined } from '@ant-design/icons';
import HeadlessButton from '../HeadlessButton';

type Props = {
  children: ReactNode;
};

const MainLayout = ({ children }: Props) => {
  const [openMenu, setOpenMenu] = useState<'start' | 'show' | 'hide'>('start');
  return (
    <>
      {openMenu === 'show' && (
        <MenuBackground
          onClick={() => {
            setOpenMenu('hide');
          }}
        />
      )}
      <Header>
        <HeaderContent>
          <HeadlessButton
            onClick={() => {
              setOpenMenu('show');
            }}
          >
            <MenuOutlined style={{ color: '#fff' }} />
          </HeadlessButton>
        </HeaderContent>
      </Header>
      <MenuSlider open={openMenu}>
        <MenuHeader>
          <HeadlessButton
            onClick={() => {
              setOpenMenu('hide');
            }}
          >
            <CloseOutlined style={{ color: '#fff' }} />
          </HeadlessButton>
        </MenuHeader>
      </MenuSlider>
      {children}
    </>
  );
};

export default MainLayout;

const Header = styled('header', {
  background: '#223344',
  height: '40px',
});

const HeaderContent = styled('div', {
  display: 'flex',
  height: '100%',
  alignItems: 'center',
  marginLeft: '12px',
});

const showMenu = keyframes({
  from: { left: '-250px' },
  to: { left: '0px', visibility: 'visible' },
});

const hideMenu = keyframes({
  from: { left: '0px' },
  to: { left: '-250px', visibility: 'hidden' },
});

const MenuSlider = styled('div', {
  variants: {
    open: {
      show: {
        animation: `${showMenu} 250ms`,
      },
      hide: {
        animation: `${hideMenu} 250ms`,
        left: '-250px',
      },
      start: {
        left: '-250px',
      },
    },
  },

  position: 'absolute',
  top: '0px',
  background: '#223344',
  height: '100vh',
  width: '250px',
});

const MenuHeader = styled('div', {
  display: 'flex',
  justifyContent: 'end',
  padding: '12px',
});

const MenuBackground = styled('div', {
  position: 'absolute',
  top: '0px',
  left: '0px',
  width: '100vw',
  height: '100vh',
  opacity: 0.7,
});
