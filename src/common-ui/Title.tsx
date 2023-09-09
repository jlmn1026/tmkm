import { styled } from '@stitches/react';
import { ReactNode } from 'react';

type Props = {
  children?: ReactNode;
};

export const SubTitle = ({ children }: Props) => {
  return <TitleText>{children}</TitleText>;
};

const TitleText = styled('h2', {
  fontSize: '26px',
  fontWeight: '400',
});
