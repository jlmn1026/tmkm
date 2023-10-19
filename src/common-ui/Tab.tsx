import { styled } from '@stitches/react';

export const Tabs = styled('div', {
  display: 'flex',
  marginBottom: '12px',
});

export const Tab = styled('div', {
  width: '160px',
  textAlign: 'center',
  cursor: 'pointer',
  padding: '4px 0px',

  variants: {
    selected: {
      true: {
        borderBottom: '2px solid #fff',
      },
      false: {},
    },
  },
});
