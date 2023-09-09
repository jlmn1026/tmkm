import { ReactNode } from 'react';
import { styled } from '@/stitches.config.ts';
import { MenuOutlined } from '@ant-design/icons';
import HeadlessButton from '../HeadlessButton';

type Props = {
  children: ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    <>
      <Header>
        <HeaderContent>
          <HeadlessButton
            onClick={() => {
              alert(1);
            }}
          >
            <MenuOutlined style={{ color: '#fff' }} />
          </HeadlessButton>
        </HeaderContent>
      </Header>
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
