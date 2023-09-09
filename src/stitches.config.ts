import { createStitches } from '@stitches/react';

export const { styled, css, globalCss, keyframes, getCssText, theme, createTheme, config } =
  createStitches({
    theme: {
      colors: {
        red1: 'red',
        gray500: 'lightgray',
      },
    },
    media: {
      bp1: '(min-width: 480px)',
    },
    utils: {
      my: (value: string) => ({ marginTop: value, marginBottom: value }),
    },
  });
