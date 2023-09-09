import { ReactNode, useState } from 'react';
import { keyframes, styled } from '@/stitches.config.ts';
import { CloseOutlined, MenuOutlined } from '@ant-design/icons';
import HeadlessButton from '../HeadlessButton';
import { Link } from 'react-router-dom';
import { menus } from './menu';

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
            <MenuOutlined style={{ fontSize: '18px', color: '#fff' }} />
          </HeadlessButton>
          <HeaderTitle>Anki App</HeaderTitle>
        </HeaderContent>
      </Header>
      <MenuSlider open={openMenu}>
        <MenuHeader>
          <HeadlessButton
            onClick={() => {
              setOpenMenu('hide');
            }}
          >
            <CloseOutlined style={{ fontSize: '18px', color: '#fff' }} />
          </HeadlessButton>
        </MenuHeader>
        {menus.map((menu) => {
          return (
            <Link to={menu.link} key={menu.link}>
              <MenuItem>{menu.name}</MenuItem>
            </Link>
          );
        })}
      </MenuSlider>
      <PageRoot>{children}</PageRoot>
    </>
  );
};

export default MainLayout;

const Header = styled('header', {
  background: '#223344',
  height: '40px',
  boxShadow: '0px 2px 2px rgba(255, 255, 255, 0.1);',
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
        boxShadow: '2px 0px 2px rgba(255, 255, 255, 0.1);',
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
  marginBottom: '8px',
});

const MenuItem = styled('div', {
  height: '40px',
  padding: '4px 0px 4px 12px',
  '&:hover': {
    opacity: 0.75,
  },
});

const MenuBackground = styled('div', {
  position: 'absolute',
  top: '0px',
  left: '0px',
  width: '100vw',
  height: '100vh',
  opacity: 0.7,
});

const HeaderTitle = styled('div', {
  marginLeft: '12px',
});

const PageRoot = styled('div', {
  minWidth: '1024px',
});
