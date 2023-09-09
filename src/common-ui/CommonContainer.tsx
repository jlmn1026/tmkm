import { styled } from '@stitches/react';
import { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
};

const CommonContainer = ({ children }: Props) => {
  return (
    <RootContainer>
      <Content>{children}</Content>
    </RootContainer>
  );
};

export default CommonContainer;

const Content = styled('div', {
  marginTop: '12px',
  padding: '4px',
  minWidth: '1024px',
  maxWidth: '1200px',
});

const RootContainer = styled('main', {
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
});
