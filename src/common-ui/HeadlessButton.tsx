import { styled } from '@/stitches.config';
import { ReactNode } from 'react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

const HeadlessButton = ({ children, ...props }: Props) => {
  return <RootButton {...props}>{children}</RootButton>;
};

export default HeadlessButton;

const RootButton = styled('button', {
  backgroundColor: 'transparent',
  border: 'none',
  outline: 'none',
  padding: 0,
  appearance: 'none',
  cursor: 'pointer',
});
